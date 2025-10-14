import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Download, Mail, Loader2 } from "lucide-react";

const RESUME_URL = "/Indukumar Mallampali_Resume.pdf";
const EMAIL = "mailto:hello@indumallampali.com";
const CALENDLY_URL = "https://calendly.com/indu/intro";

const freeEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

// Web3Forms configuration
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "REPLACE_ME";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(60, { message: "Name must be less than 60 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z
    .string()
    .trim()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(100, { message: "Subject must be less than 100 characters" }),
  message: z
    .string()
    .trim()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
  company_website: z.string().max(0),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
      company_website: "",
    },
  });

  // Initialize cooldown from localStorage on mount
  useEffect(() => {
    if (import.meta.env.DEV) return;
    const cooldownMs = 5000;
    const last = localStorage.getItem("contact_last_submit");
    if (!last) return;
    const elapsed = Date.now() - parseInt(last, 10);
    if (elapsed < cooldownMs) {
      const remaining = Math.ceil((cooldownMs - elapsed) / 1000);
      setCooldownSeconds(remaining);
      const interval = setInterval(() => {
        setCooldownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    // Smart cooldown: only after successful submit, 5s, disabled in dev
    if (!import.meta.env.DEV) {
      const lastSubmit = localStorage.getItem("contact_last_submit");
      if (lastSubmit) {
        const elapsed = Date.now() - parseInt(lastSubmit, 10);
        const cooldownMs = 5000; // 5 seconds
        if (elapsed < cooldownMs) {
          const remainingSeconds = Math.ceil((cooldownMs - elapsed) / 1000);
          setCooldownSeconds(remainingSeconds);
          
          // Start countdown timer
          const interval = setInterval(() => {
            setCooldownSeconds((prev) => {
              if (prev <= 1) {
                clearInterval(interval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          return;
        }
      }
    }

    setIsSubmitting(true);

    try {
      // Create FormData for Web3Forms
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject);
      formData.append("message", data.message);
      formData.append("company_website", data.company_website); // Honeypot

      // Create timeout promise (12 seconds)
      const timeoutPromise = new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout. Please try again or email me directly.")), 12000)
      );

      // Race between fetch and timeout
      const response = await Promise.race([
        fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }),
        timeoutPromise
      ]);

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Handle Web3Forms error responses
        let errorMessage = json?.message || "An unexpected error occurred. Please try again.";
        throw new Error(errorMessage);
      }

      (window as any).dataLayer?.push({ event: "contact_submit" });

      // Set cooldown only after successful submit
      if (!import.meta.env.DEV) {
        localStorage.setItem("contact_last_submit", Date.now().toString());
        setCooldownSeconds(5);
        const interval = setInterval(() => {
          setCooldownSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      toast({
        title: "Message sent!",
        description: "Thanks! Your message was sent.",
      });

      form.reset();
      
      setIsSubmitting(false);
    } catch (error) {
      // Log detailed error for debugging
      console.error("❌ Contact Form Submission Error:", {
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      });
      
      let title = "Submission failed";
      let description = "An error occurred. Please try again.";

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          title = "Network issue";
          description = "Request timed out, please try again.";
        } else if (/network|failed to fetch/i.test(error.message)) {
          title = "Network issue";
          description = "Network issue, please try again.";
        } else {
          description = error.message;
        }
      } else {
        title = "Network issue";
        description = "Network issue, please try again.";
      }

      toast({
        variant: "destructive",
        title,
        description,
      });
      setIsSubmitting(false);
    }
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!RESUME_URL || RESUME_URL.includes("example.com")) {
      e.preventDefault();
      toast({
        title: "Resume link not set yet",
        description: "The resume PDF is not available at this time.",
        variant: "destructive",
      });
      return;
    }
    (window as any).dataLayer?.push({ event: "resume_download" });
  };

  const handleCallClick = () => {
    (window as any).dataLayer?.push({ event: "book_call_click" });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Get In Touch</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Interested in working together? Let's talk.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-8 rounded-2xl border border-border bg-card"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's this about?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about the opportunity or question..."
                          className="min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          I agree to be contacted about this inquiry *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Honeypot */}
                <FormField
                  control={form.control}
                  name="company_website"
                  render={({ field }) => (
                    <FormItem className="hidden" aria-hidden="true">
                      <FormControl>
                        <Input {...field} tabIndex={-1} autoComplete="off" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || cooldownSeconds > 0}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : cooldownSeconds > 0 ? (
                    `Please wait ${cooldownSeconds}s...`
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleResumeClick}
                  asChild={!!RESUME_URL && !RESUME_URL.includes("example.com")}
                >
                  <a 
                    href={RESUME_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Download résumé PDF"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Résumé
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                  onClick={handleCallClick}
                >
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Book a Call
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={EMAIL}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Directly
                  </a>
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card text-sm text-muted-foreground">
              <p className="leading-relaxed">
                I typically respond within 2 business days. For urgent matters,
                email is fastest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
