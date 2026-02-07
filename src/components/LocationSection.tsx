 import { MapPin, Navigation } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const LocationSection = () => {
   return (
     <section id="location" className="section-padding">
       <div className="section-container">
         {/* Section Header */}
         <div className="text-center max-w-2xl mx-auto mb-12">
           <span className="text-primary font-semibold uppercase tracking-wider text-sm">Location</span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
             Train With Me <span className="text-primary">In-Person</span>
           </h2>
           <p className="text-muted-foreground text-lg">
             Offline training sessions available near JNTU, Hyderabad. 
             Let's work out together at a convenient gym location.
           </p>
         </div>
 
         {/* Map Container */}
         <div className="max-w-5xl mx-auto">
           <div className="card-elevated overflow-hidden">
             {/* Google Maps Embed */}
             <div className="aspect-video w-full">
               <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.0896716566897!2d78.3857861!3d17.4975739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f9b8b3b6e3%3A0x4b4b3b3b3b3b3b3b!2sJNTU%20Hyderabad!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Training Location - Near JNTU, Hyderabad"
               />
             </div>
 
             {/* Location Info Bar */}
             <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary/50">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                   <MapPin className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <h4 className="font-bold text-foreground">Training Area</h4>
                   <p className="text-muted-foreground">Near JNTU, Hyderabad, Telangana</p>
                 </div>
               </div>
               <Button variant="outline" size="lg" asChild>
                 <a
                   href="https://www.google.com/maps/search/JNTU+Hyderabad"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   <Navigation className="w-4 h-4" />
                   Get Directions
                 </a>
               </Button>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default LocationSection;