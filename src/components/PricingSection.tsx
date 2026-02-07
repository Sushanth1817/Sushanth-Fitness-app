 import { Check, ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const PricingSection = () => {
   const pricingPlans = [
     {
       name: "Online Training",
       description: "Train from anywhere",
       price: "₹500",
       period: "per session",
       includes: [
         "Personalized workout plan",
         "Custom diet plan included",
         "Progress tracking",
         "WhatsApp support",
       ],
     },
     {
       name: "Offline Training",
       description: "In-person sessions",
       price: "₹700",
       period: "per session",
       includes: [
         "One-on-one gym sessions",
         "Custom diet plan included",
         "Real-time form correction",
         "Full accountability",
       ],
       highlighted: true,
     },
   ];
 
   return (
     <section id="pricing" className="section-padding bg-card">
       <div className="section-container">
         {/* Section Header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="text-primary font-semibold uppercase tracking-wider text-sm">Pricing</span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
             Invest in Your <span className="text-primary">Health</span>
           </h2>
           <p className="text-muted-foreground text-lg">
             Affordable personal training with diet plans included. No hidden fees.
           </p>
         </div>
 
         {/* Pricing Cards */}
         <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
           {pricingPlans.map((plan) => (
             <div
               key={plan.name}
               className={`rounded-2xl p-8 transition-all hover:scale-105 ${
                 plan.highlighted
                   ? "bg-primary text-primary-foreground"
                   : "bg-secondary border border-border"
               }`}
             >
               <div className="mb-6">
                 <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                 <p className={plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}>
                   {plan.description}
                 </p>
               </div>
 
               <div className="mb-8">
                 <span className="text-5xl font-black">{plan.price}</span>
                 <span className={`ml-2 ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                   {plan.period}
                 </span>
               </div>
 
               <ul className="space-y-3 mb-8">
                 {plan.includes.map((item) => (
                   <li key={item} className="flex items-center gap-3">
                     <Check className={`w-5 h-5 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                     <span>{item}</span>
                   </li>
                 ))}
               </ul>
 
               <Button
                 variant={plan.highlighted ? "heroOutline" : "hero"}
                 size="lg"
                 className={`w-full ${plan.highlighted ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}`}
                 asChild
               >
                 <a href="#contact">
                   Get Started
                   <ArrowRight className="w-4 h-4" />
                 </a>
               </Button>
             </div>
           ))}
         </div>
 
         <p className="text-center text-muted-foreground mt-8 text-sm max-w-xl mx-auto">
           Final pricing depends on your goals and training frequency. Contact me for a personalized quote 
           and package deals for monthly commitments.
         </p>
       </div>
     </section>
   );
 };
 
 export default PricingSection;