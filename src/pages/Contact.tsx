import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactComponent from '../components/Contact';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import heroBg from '../assets/hero-contact.jpg';

const ContactPage = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      
      {/* Hero — Navbar overlays background image */}
      <div className="relative w-full min-h-[50vh] md:min-h-[55vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Greenstone Contact" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40"></div>
        </div>
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="relative z-10 flex-1 flex items-end pb-16 md:pb-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto max-w-[1600px]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]" />
                <span className="text-xs tracking-[0.25em] text-brand-primary uppercase font-bold">Get In Touch</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08]">
                Contact <span className="font-bold">Us</span>
              </h1>
              <p className="mt-8 text-white/60 max-w-2xl text-base md:text-lg font-medium leading-relaxed">
                We are deeply committed to providing unparalleled service. Reach out to discuss your property needs, schedule a consultation, or request more information about our developments.
              </p>
            </div>
          </div>
        </div>
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
               <p className="text-white/60 text-base font-medium leading-relaxed max-w-[250px]">
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
               <p className="text-white/60 text-base font-medium leading-relaxed mb-4">
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
