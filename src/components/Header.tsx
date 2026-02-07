 import { useState } from "react";
 import { Menu, X, Dumbbell } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
 
   const navLinks = [
     { href: "#about", label: "About" },
     { href: "#services", label: "Services" },
     { href: "#pricing", label: "Pricing" },
     { href: "#contact", label: "Contact" },
   ];
 
   return (
     <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
       <div className="section-container">
         <div className="flex items-center justify-between h-16 md:h-20">
           {/* Logo */}
           <a href="#" className="flex items-center gap-2 group">
             <Dumbbell className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
             <span className="text-xl font-bold text-foreground">SUSHANTH</span>
           </a>
 
           {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center gap-8">
             {navLinks.map((link) => (
               <a
                 key={link.href}
                 href={link.href}
                 className="text-muted-foreground hover:text-foreground transition-colors font-medium"
               >
                 {link.label}
               </a>
             ))}
             <Button variant="hero" size="lg" asChild>
               <a href="#contact">Get Started</a>
             </Button>
           </nav>
 
           {/* Mobile Menu Button */}
           <button
             className="md:hidden p-2 text-foreground"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             aria-label="Toggle menu"
           >
             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
         </div>
 
         {/* Mobile Navigation */}
         {isMenuOpen && (
           <nav className="md:hidden py-4 border-t border-border animate-fade-up">
             {navLinks.map((link) => (
               <a
                 key={link.href}
                 href={link.href}
                 className="block py-3 text-muted-foreground hover:text-foreground transition-colors font-medium"
                 onClick={() => setIsMenuOpen(false)}
               >
                 {link.label}
               </a>
             ))}
             <Button variant="hero" size="lg" className="w-full mt-4" asChild>
               <a href="#contact">Get Started</a>
             </Button>
           </nav>
         )}
       </div>
     </header>
   );
 };
 
 export default Header;