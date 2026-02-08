import { useState } from "react";
import { Phone, Mail, MessageCircle, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Frontend validation helpers
  const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Google Form connected submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔴 Frontend validation (instant feedback)
    if (!isValidPhone(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSfm8TMPvkBq2KFAfUJdXsAbnSvj5nXj384VErUiHnh8GhQUfg/formResponse";

      const formDataToSend = new FormData();
      formDataToSend.append("entry.1341841005", formData.name);    // Name
      formDataToSend.append("entry.1359922952", formData.phone);   // Phone
      formDataToSend.append("entry.1400575365", formData.email);   // Email
      formDataToSend.append("entry.1308695493", formData.message); // Message

      await fetch(formUrl, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors",
      });

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon 💪",
      });

      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact me on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Call Me",
      value: "+91 7093601132",
      href: "tel:+917093601132",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat Now",
      href: "https://wa.me/917093601132?text=Hi%20Sushanth,%20I'm%20interested%20in%20personal%20training",
    },
    {
      icon: Mail,
      label: "Email",
      value: "padamata.sresushanth3@gmail.com",
      href: "mailto:padamata.sresushanth3@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Near JNTU, Hyderabad",
      href: "#location",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Ready to <span className="text-primary">Transform?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get in touch today and let's start your fitness journey together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground text-sm">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <Button variant="whatsapp" size="xl" className="w-full" asChild>
              <a
                href="https://wa.me/917093601132?text=Hi%20Sushanth,%20I'm%20interested%20in%20personal%20training"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Contact Form */}
          <div className="card-elevated p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <Textarea
                placeholder="Tell me about your fitness goals..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={4}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
