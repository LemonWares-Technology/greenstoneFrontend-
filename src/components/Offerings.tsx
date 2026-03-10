import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Trees, Wind, Compass, ArrowUpRight } from 'lucide-react';
import landscapeImg from '../assets/waterfront-house-beach-with-beautiful-setting-sun-horizon.webp';

const Offerings = () => {
  return (
    <section 
      id="offerings" 
      className="relative w-full min-h-screen lg:h-[1200px] bg-[#050505] overflow-hidden font-sans bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${landscapeImg})` }}
    >
      
      {/* Massive Background Image Overlays text readability at the edges */}
      <div className="absolute inset-0 z-0">
        {/* Strong fade at the very top to blend with the previous section's #070707 background */}
        <div className="absolute top-0 left-0 w-full h-[300px] bg-linear-to-b from-[#070707] via-[#070707]/80 to-transparent z-10"></div>
        
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/90"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 h-full pt-32 pb-24">
        
        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start mb-12 lg:mb-0">
           <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase font-bold flex items-center gap-3 mb-6 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="text-white/40">[</span>
              WHAT WE OFFER
              <span className="text-white/40">]</span>
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight drop-shadow-2xl mb-8">
              Comprehensive<br/>
              <span className="font-bold">Service Portfolio</span>
            </h2>
            <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-brand-primary text-white hover:text-black uppercase tracking-widest px-6 py-3 rounded-full backdrop-blur-md border border-white/10 hover:border-brand-primary transition-all duration-300 group">
               Explore Services <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
        </div>

        {/* Floating Glass Cards Container - We use relative sizing on large screens, standard grid on mobile */}
        
        <div className="w-full h-full relative mt-16 lg:mt-0 flex flex-col lg:block gap-6">

          {/* Card 1: Natural Light */}
          <div className="lg:absolute lg:top-[15%] lg:left-[5%] group cursor-pointer">
             <div className="glass-card flex flex-col p-6 md:p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl max-w-sm transition-all duration-500 hover:bg-white/20 hover:border-brand-primary/50 hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-primary">
                  <Sun size={18} className="text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">Property Acquisition & Development</h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-medium">
                  We develop well-designed, competitively priced real estate. Our portfolio comprises residential, commercial, and mixed-use properties across prime locations.
                </p>
             </div>
          </div>

          {/* Card 2: Open horizon */}
          <div className="lg:absolute lg:top-[10%] lg:right-[5%] group cursor-pointer">
             <div className="glass-card flex flex-col p-6 md:p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl max-w-sm transition-all duration-500 hover:bg-white/20 hover:border-brand-primary/50 hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-primary">
                  <Compass size={18} className="text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">Property Management</h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-medium">
                  Serving as residential and industrial management specialists, we deliver a service that provides integrity, professionalism, and peace of mind to our clients.
                </p>
             </div>
          </div>

          {/* Card 3: Natural environment */}
          <div className="lg:absolute lg:bottom-[25%] lg:left-[15%] group cursor-pointer">
             <div className="glass-card flex flex-col p-6 md:p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl max-w-sm transition-all duration-500 hover:bg-white/20 hover:border-brand-primary/50 hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-primary">
                  <Trees size={18} className="text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">Real Estate Brokerage</h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-medium">
                  Expert guidance in navigating the real estate market, ensuring our clients formulate and execute the most profitable transactions.
                </p>
             </div>
          </div>

          {/* Card 4: Absolute Privacy */}
          <div className="lg:absolute lg:bottom-[30%] lg:right-[15%] group cursor-pointer">
             <div className="glass-card flex flex-col p-6 md:p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl max-w-sm transition-all duration-500 hover:bg-white/20 hover:border-brand-primary/50 hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-primary">
                  <Wind size={18} className="text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">Real Estate Loan Syndication</h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-medium">
                  We improve the lot of individuals and corporate clients by structuring and securing tailored investment finance solutions.
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Offerings;
