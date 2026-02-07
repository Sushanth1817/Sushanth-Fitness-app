 import { Award, Target, Flame, Heart } from "lucide-react";
 
 const AboutSection = () => {
   const qualities = [
     { icon: Target, label: "Goal-Focused" },
     { icon: Flame, label: "Passionate" },
     { icon: Award, label: "Disciplined" },
     { icon: Heart, label: "Dedicated" },
   ];
 
   return (
     <section id="about" className="section-padding bg-card">
       <div className="section-container">
         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
           {/* Image/Visual Side */}
           <div className="relative">
             <div className="aspect-square rounded-2xl bg-secondary overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center p-8">
                   <div className="w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6">
                     <span className="text-6xl font-black text-primary">S</span>
                   </div>
                   <h3 className="text-2xl font-bold text-foreground mb-2">Sushanth</h3>
                   <p className="text-muted-foreground">Personal Trainer</p>
                 </div>
               </div>
             </div>
             
             {/* Floating Badge */}
             <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg">
               <span className="font-bold">20 Years Old</span>
             </div>
           </div>
 
           {/* Content Side */}
           <div>
             <span className="text-primary font-semibold uppercase tracking-wider text-sm">About Me</span>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
               Dedicated to Your <span className="text-primary">Transformation</span>
             </h2>
             
             <div className="space-y-4 text-muted-foreground text-lg">
               <p>
                 I'm Sushanth, a 20-year-old personal trainer with <strong className="text-foreground">1.5 years of consistent lifting experience</strong>. 
                 My journey in fitness has taught me that real results come from discipline, consistency, and smart training.
               </p>
               <p>
                 I believe in <strong className="text-foreground">sustainable transformation</strong>—not quick fixes or extreme measures. 
                 Whether you want to build muscle, lose fat, or simply feel stronger, I'll create a personalized plan that fits your lifestyle and goals.
               </p>
               <p>
                 Based near <strong className="text-foreground">JNTU, Hyderabad</strong>, I offer both online coaching (anywhere in India) and 
                 in-person training sessions for those who prefer hands-on guidance.
               </p>
             </div>
 
             {/* Qualities */}
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
               {qualities.map(({ icon: Icon, label }) => (
                 <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 border border-border">
                   <Icon className="w-6 h-6 text-primary" />
                   <span className="text-sm font-medium text-foreground">{label}</span>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default AboutSection;