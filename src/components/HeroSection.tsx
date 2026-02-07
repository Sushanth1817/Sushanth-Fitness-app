 import { Button } from "@/components/ui/button";
 import { ArrowRight, Phone } from "lucide-react";
 import heroBg from "@/assets/hero-bg.jpg";
 
 const HeroSection = () => {
   return (
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
       {/* Background Image */}
       <div
         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${heroBg})` }}
       />
       
       {/* Overlay */}
       <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
       
       {/* Content */}
       <div className="relative z-10 section-container text-center py-32">
         <div className="max-w-4xl mx-auto">
           {/* Badge */}
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
             <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <span className="text-sm font-medium text-primary">Now Accepting New Clients</span>
           </div>
 
           {/* Main Headline */}
           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-up delay-100">
             Build Muscle. Build Discipline.{" "}
             <span className="text-primary">Transform Yourself.</span>
           </h1>
 
           {/* Subheadline */}
           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
             Personal Trainer | Online & Offline Coaching | Customized Diet & Workout Plans
           </p>
 
           {/* CTA Buttons */}
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
             <Button variant="hero" size="xl" asChild>
               <a href="#contact">
                 <Phone className="w-5 h-5" />
                 Contact Me
               </a>
             </Button>
             <Button variant="heroOutline" size="xl" asChild>
               <a href="https://wa.me/917093601132?text=Hi%20Sushanth,%20I'm%20interested%20in%20a%20free%20consultation" target="_blank" rel="noopener noreferrer">
                 Book Free Consultation
                 <ArrowRight className="w-5 h-5" />
               </a>
             </Button>
           </div>
 
           {/* Stats */}
           <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-fade-up delay-400">
             <div className="text-center">
               <div className="text-3xl md:text-4xl font-bold text-primary">1.5+</div>
               <div className="text-sm text-muted-foreground">Years Experience</div>
             </div>
             <div className="text-center">
               <div className="text-3xl md:text-4xl font-bold text-primary">1</div>
               <div className="text-sm text-muted-foreground">Client Transformed</div>
             </div>
             <div className="text-center">
               <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
               <div className="text-sm text-muted-foreground">Dedication</div>
             </div>
           </div>
         </div>
       </div>
 
       {/* Scroll Indicator */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
         <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
           <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
         </div>
       </div>
     </section>
   );
 };
 
 export default HeroSection;