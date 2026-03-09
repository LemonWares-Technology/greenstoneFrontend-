import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import aboutImage from '../assets/photorealistic-wooden-house-with-timber-structure.jpg';

const Features = () => {
  const perks = [
    {
      num: '01',
      title: 'INNOVATIVE SOLUTIONS',
      desc: 'Providing innovative solutions to our clients\' changing needs, adapting seamlessly to the dynamic real estate landscape.'
    },
    {
      num: '02',
      title: 'HIGHEST QUALITY',
      desc: 'Anticipating client requirements and providing the best quality products and services to meet their desired needs.'
    },
    {
      num: '03',
      title: 'EXPERT ARTISANS',
      desc: 'Continually improving the talents of our artisans and updating them on changing industry trends to better serve our clients.'
    },
    {
      num: '04',
      title: 'PROMPT DELIVERY',
      desc: 'Always ensuring prompt, efficient, and effective service delivery to our clients at all times.'
    }
  ];

  return (
    <section id="features" className="relative w-full min-h-screen bg-white text-slate-900 py-24 font-sans overflow-hidden">
      
      {/* Subtle Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 flex justify-center">
        <div className="w-px h-full bg-slate-400 absolute left-1/4"></div>
        <div className="w-px h-full bg-slate-400 absolute left-1/2"></div>
        <div className="w-px h-full bg-slate-400 absolute left-3/4"></div>
        <div className="w-full h-px bg-slate-400 absolute top-[40%]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col relative z-10 w-full max-w-[1600px]">
        
        {/* Top Feature Tag */}
        <div className="flex justify-center w-full mb-12">
          <p className="text-xs tracking-widest text-slate-400 uppercase font-medium flex items-center gap-4">
            <span className="w-px h-4 bg-slate-300"></span>
            CORPORATE OBJECTIVES
            <span className="w-px h-4 bg-slate-300"></span>
          </p>
        </div>

        {/* Huge Headline */}
        <div className="flex flex-col items-center justify-center text-center mb-24 relative">
          
          {/* Decorative Brackets */}
          <span className="absolute left-0 lg:left-32 top-0 text-7xl font-light text-slate-300 hidden md:block">[</span>
          <span className="absolute right-0 lg:right-32 top-0 text-7xl font-light text-slate-300 hidden md:block">]</span>

          <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter leading-[0.9] flex flex-col uppercase">
            <span className="mb-2">THE ADVANTAGE</span>
            <span className="flex flex-col xl:flex-row items-center gap-2 xl:gap-4">
              OF LIVING
              {/* Glowing Orb / Brand Accent */}
              <span className="relative flex items-center justify-center w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 mx-2 my-2 lg:my-0">
                <span className="absolute inset-0 bg-brand-primary blur-[12px] md:blur-[20px] opacity-60 rounded-full"></span>
                <span className="relative w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-brand-primary rounded-full shadow-[0_0_15px_var(--color-brand-primary)]"></span>
              </span>
              <span className="flex flex-col text-center xl:text-left justify-center mt-2 xl:mt-0">
                <span className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight normal-case leading-none">of partnering</span>
                <span className="text-lg md:text-xl lg:text-2xl font-light text-slate-500 tracking-tight normal-case leading-none mt-1 lg:mt-0">with Greenstone</span>
              </span>
            </span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full relative min-h-[600px] mt-12 md:mt-0">
          
          {/* Left Side: Small text and Titles */}
          <div className="flex flex-col justify-between h-full w-full md:w-1/4 mb-16 md:mb-0 order-2 md:order-1 relative z-30 bg-white/50 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none p-4 md:p-0 rounded-2xl">
            <p className="text-xs uppercase tracking-widest text-slate-400 leading-relaxed max-w-[150px] mb-12 hidden md:block">
              // SMART, SECURE, AND SUSTAINABLE — DESIGNED TO FEEL LIKE HOME.
            </p>
            
            <div className="flex flex-col gap-12 lg:gap-16">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex gap-4 items-center group cursor-pointer">
                  <span className="text-xs text-slate-400 font-mono transition-colors group-hover:text-brand-primary">[{perk.num}]</span>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight uppercase group-hover:text-brand-primary transition-colors duration-300">
                    {perk.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Circular Image */}
          <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden shadow-2xl z-20 border-8 border-white group order-1 md:order-2 mb-12 md:mb-0">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <img 
              src={aboutImage} 
              alt="Nature and Harmony Architecture" 
              className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </div>

          {/* Right Side: Descriptions and Icons */}
          <div className="flex flex-col gap-12 lg:gap-16 justify-end h-full w-full md:w-1/4 pb-8 order-3 relative z-30 bg-white/50 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none p-4 md:p-0 rounded-2xl">
             {perks.map((perk, idx) => (
                <div key={idx} className="flex items-center justify-between gap-6 group cursor-pointer">
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] group-hover:text-slate-800 transition-colors duration-300">
                    {perk.desc}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:-translate-y-1 transition-all duration-300 shadow-md">
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </div>
                </div>
              ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;
