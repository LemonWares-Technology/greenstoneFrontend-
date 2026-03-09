import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactComponent from '../components/Contact';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-24 pb-16 px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px] flex flex-col items-center text-center">
        <span className="text-[10px] tracking-[0.3em] text-brand-primary uppercase font-bold flex items-center justify-center gap-3 mb-6 bg-brand-primary/10 px-5 py-2.5 rounded-full border border-brand-primary/20">
          [ GET IN TOUCH ]
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
          Contact <span className="font-bold">Us</span>
        </h1>
        <p className="mt-8 text-white/60 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
          We are deeply committed to providing unparalleled service. Reach out to discuss your property needs, schedule a consultation, or request more information about our developments.
        </p>
      </div>

      {/* Contact Details Grid */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1600px] pb-16">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {/* Office Box */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
               <div className="w-16 h-16 bg-white/5 text-white rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-black transition-colors">
                  <MapPin strokeWidth={1.5} size={28} />
               </div>
               <h3 className="text-xl font-bold mb-4">Head Office</h3>
               <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[250px]">
                 6, Boyle Street (4th Floor),<br/>
                 Onikan, Lagos<br/>
                 Nigeria
               </p>
            </div>

            {/* Direct Lines & Email */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
               <div className="w-16 h-16 bg-white/5 text-white rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-black transition-colors">
                  <Phone strokeWidth={1.5} size={28} />
               </div>
               <h3 className="text-xl font-bold mb-4">Direct Contact</h3>
               <p className="text-white/60 text-sm font-medium leading-relaxed mb-4">
                 (+234) 0803 304 0403<br/>
                 (+234) 0803 467 2470<br/>
                 (+234) 0816 027 8752
               </p>
               <a href="mailto:info@greenstoneltd.com" className="text-brand-primary hover:text-white transition-colors font-bold text-sm tracking-wider flex items-center gap-2">
                 <Mail size={14} /> info@greenstoneltd.com
               </a>
            </div>
         </div>
      </div>

      {/* The form section from Home */}
      <div className="w-full">
         <ContactComponent />
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
