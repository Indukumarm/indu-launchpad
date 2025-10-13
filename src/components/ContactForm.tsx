import { useState } from "react";
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
import { CalendarDays, Download, Mail } from "lucide-react";

const RESUME_URL = "/Indukumar Mallampali_Resume.pdf";
const EMAIL = "mailto:hello@indumallampali.com";
const CALENDLY_URL = "https://calendly.com/indu/intro";

const freeEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

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
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

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

  const onSubmit = async (data: ContactFormValues) => {
    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < 20000) {
      toast({
        variant: "destructive",
        title: "Too many requests",
        description: "Please wait 20 seconds before submitting again.",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    try {
      const response = await fetch("https://formspree.io/f/xyzabcd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _replyto: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      (window as any).dataLayer?.push({ event: "contact_submit" });

      toast({
        title: "Message sent!",
        description: "Thanks! I'll reply soon.",
      });

      form.reset();
      
      // Disable button for 2 seconds after success
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Something went wrong. Please try again or email me directly.",
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
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
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
