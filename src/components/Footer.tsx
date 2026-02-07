 import { Dumbbell, Phone, Mail, MapPin, Instagram, Youtube, Facebook } from "lucide-react";
 
 const Footer = () => {
   const currentYear = new Date().getFullYear();
 
   const quickLinks = [
     { label: "About", href: "#about" },
     { label: "Services", href: "#services" },
     { label: "Pricing", href: "#pricing" },
     { label: "Contact", href: "#contact" },
   ];
 
   const socialLinks = [
     { icon: Instagram, href: "#", label: "Instagram" },
     { icon: Youtube, href: "#", label: "YouTube" },
     { icon: Facebook, href: "#", label: "Facebook" },
   ];
 
   return (
     <footer className="bg-secondary/30 border-t border-border">
       <div className="section-container py-12 md:py-16">
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {/* Brand */}
           <div className="lg:col-span-2">
             <a href="#" className="flex items-center gap-2 mb-4">
               <Dumbbell className="w-8 h-8 text-primary" />
               <span className="text-xl font-bold text-foreground">SUSHANTH</span>
             </a>
             <p className="text-muted-foreground mb-4 max-w-md">
               Personal trainer dedicated to helping you build muscle, lose fat, and transform your life 
               through discipline and consistency.
             </p>
             <p className="text-primary font-semibold italic">
               "Discipline. Consistency. Results."
             </p>
           </div>
 
           {/* Quick Links */}
           <div>
             <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
             <ul className="space-y-2">
               {quickLinks.map((link) => (
                 <li key={link.label}>
                   <a
                     href={link.href}
                     className="text-muted-foreground hover:text-primary transition-colors"
                   >
                     {link.label}
                   </a>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Contact Info */}
           <div>
             <h4 className="font-bold text-foreground mb-4">Contact</h4>
             <ul className="space-y-3">
               <li>
                 <a
                   href="tel:+917093601132"
                   className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                 >
                   <Phone className="w-4 h-4" />
                   +91 7093601132
                 </a>
               </li>
               <li>
                 <a
                   href="mailto:padamata.sresushanth3@gmail.com"
                   className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                 >
                   <Mail className="w-4 h-4 flex-shrink-0" />
                   <span className="break-all">padamata.sresushanth3@gmail.com</span>
                 </a>
               </li>
               <li className="flex items-center gap-2 text-muted-foreground">
                 <MapPin className="w-4 h-4 flex-shrink-0" />
                 Near JNTU, Hyderabad
               </li>
             </ul>
 
             {/* Social Links */}
             <div className="flex items-center gap-4 mt-6">
               {socialLinks.map((social) => (
                 <a
                   key={social.label}
                   href={social.href}
                   aria-label={social.label}
                   className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                 >
                   <social.icon className="w-5 h-5" />
                 </a>
               ))}
             </div>
           </div>
         </div>
 
         {/* Bottom Bar */}
         <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
           <p className="text-muted-foreground text-sm">
             © {currentYear} Sushanth. All rights reserved.
           </p>
           <p className="text-muted-foreground text-sm">
             Personal Trainer | Hyderabad, India
           </p>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;