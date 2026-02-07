 import { TrendingUp, Users, Target } from "lucide-react";
 
 const ExperienceSection = () => {
   const highlights = [
     {
       icon: TrendingUp,
       title: "1+ Client Transformed",
       description: "Successfully guided a client through their fitness journey with visible results.",
     },
     {
       icon: Target,
       title: "Muscle Gain Focus",
       description: "Specialized in helping clients build lean muscle mass through proven training methods.",
     },
     {
       icon: Users,
       title: "Fat Loss Expertise",
       description: "Effective strategies for sustainable fat loss while maintaining muscle.",
     },
   ];
 
   return (
     <section className="section-padding">
       <div className="section-container">
         {/* Section Header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="text-primary font-semibold uppercase tracking-wider text-sm">Experience & Results</span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
             Real Results, <span className="text-primary">Real Commitment</span>
           </h2>
           <p className="text-muted-foreground text-lg">
             I focus on delivering tangible results through consistency, proper technique, and personalized nutrition.
           </p>
         </div>
 
         {/* Highlights Grid */}
         <div className="grid md:grid-cols-3 gap-8">
           {highlights.map((item) => (
             <div
               key={item.title}
               className="card-elevated p-8 text-center group hover:-translate-y-2 transition-all"
             >
               <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                 <item.icon className="w-8 h-8 text-primary" />
               </div>
               <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
               <p className="text-muted-foreground">{item.description}</p>
             </div>
           ))}
         </div>
 
         {/* Testimonial/Quote */}
         <div className="mt-16 max-w-3xl mx-auto text-center">
           <blockquote className="text-2xl md:text-3xl font-medium text-foreground italic">
             "Discipline is the bridge between goals and accomplishment."
           </blockquote>
           <p className="text-primary font-semibold mt-4">— My Training Philosophy</p>
         </div>
       </div>
     </section>
   );
 };
 
 export default ExperienceSection;