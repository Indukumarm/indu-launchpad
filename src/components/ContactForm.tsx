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

const RESUME_URL = "https://example.com/Indukumar-Mallampali-Resume.pdf";
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
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return !freeEmailDomains.includes(domain);
      },
      { message: "Please use your work email address" }
    ),
  message: z
    .string()
    .trim()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" })
    .refine(
      (msg) => {
        const urlPattern = /^https?:\/\//;
        return !urlPattern.test(msg.trim());
      },
      { message: "Message cannot be only a URL" }
    ),
  role: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
  honeypot: z.string().max(0),
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
      message: "",
      role: "",
      consent: false,
      honeypot: "",
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    (window as any).dataLayer?.push({ event: "contact_submit" });

    toast({
      title: "Message received!",
      description: "Thanks—your message is in. I'll get back within 2 business days.",
    });

    form.reset();
    setIsSubmitting(false);
  };

  const handleResumeClick = () => {
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
                      <FormLabel>Work Email *</FormLabel>
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a... (optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                          <SelectItem value="eng-leader">
                            Engineering Leader
                          </SelectItem>
                          <SelectItem value="it-pro">IT Professional</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
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
                  name="honeypot"
                  render={({ field }) => (
                    <FormItem className="hidden">
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
                  asChild
                  onClick={handleResumeClick}
                >
                  <a href={RESUME_URL} download>
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
