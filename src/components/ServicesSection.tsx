 import { Globe, MapPin, CheckCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const ServicesSection = () => {
   const services = [
     {
       icon: Globe,
       title: "Online Personal Training",
       price: "₹500",
       priceNote: "per session",
       location: "Available Anywhere",
       features: [
         "Customized workout plans",
         "Personalized diet plans",
         "Weekly progress tracking",
         "Video call guidance",
         "WhatsApp support",
         "Form correction via video",
       ],
       popular: false,
     },
     {
       icon: MapPin,
       title: "Offline Personal Training",
       price: "₹700",
       priceNote: "per session",
       location: "Near JNTU, Hyderabad",
       features: [
         "One-on-one gym training",
         "Customized workout plans",
         "Personalized diet plans",
         "Real-time form correction",
         "Motivation & accountability",
         "In-person progress tracking",
       ],
       popular: true,
     },
   ];
 
   return (
     <section id="services" className="section-padding">
       <div className="section-container">
         {/* Section Header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <span className="text-primary font-semibold uppercase tracking-wider text-sm">Services</span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
             Choose Your <span className="text-primary">Training Style</span>
           </h2>
           <p className="text-muted-foreground text-lg">
             Whether you prefer the flexibility of online coaching or the intensity of in-person training, 
             I've got you covered.
           </p>
         </div>
 
         {/* Services Grid */}
         <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
           {services.map((service) => (
             <div
               key={service.title}
               className={`card-elevated p-8 relative transition-transform hover:-translate-y-2 ${
                 service.popular ? "ring-2 ring-primary" : ""
               }`}
             >
               {/* Popular Badge */}
               {service.popular && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                   Most Popular
                 </div>
               )}
 
               {/* Icon & Title */}
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                   <service.icon className="w-7 h-7 text-primary" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                   <p className="text-sm text-muted-foreground">{service.location}</p>
                 </div>
               </div>
 
               {/* Price */}
               <div className="mb-6">
                 <span className="text-4xl font-black text-primary">{service.price}</span>
                 <span className="text-muted-foreground ml-2">{service.priceNote}</span>
               </div>
 
               {/* Features */}
               <ul className="space-y-3 mb-8">
                 {service.features.map((feature) => (
                   <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                     <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                     <span>{feature}</span>
                   </li>
                 ))}
               </ul>
 
               {/* CTA */}
               <Button
                 variant={service.popular ? "hero" : "outline"}
                 size="lg"
                 className="w-full"
                 asChild
               >
                 <a href="#contact">Get Started</a>
               </Button>
             </div>
           ))}
         </div>
 
         {/* Note */}
         <p className="text-center text-muted-foreground mt-8 text-sm">
           * Final pricing depends on your goals and training frequency. Contact me for a customized quote.
         </p>
       </div>
     </section>
   );
 };
 
 export default ServicesSection;