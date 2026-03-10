import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Target, Eye } from 'lucide-react';
import visionImg from '../assets/about_vision_property.png';
import heroThumb from '../assets/photorealistic-wooden-house-with-timber-structure.webp';

const AboutVision = () => {
  return (
    <section id="about" className="relative w-full bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-px h-full bg-slate-300 absolute left-1/4"></div>
        <div className="w-px h-full bg-slate-300 absolute left-1/2"></div>
        <div className="w-px h-full bg-slate-300 absolute left-3/4"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-[1600px]">

        {/* Top Row: Thumbnail + Headline + Vision Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 md:mb-28">
          
          {/* Small thumbnail */}
          <div className="lg:col-span-2">
            <div className="w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden shadow-lg border border-slate-100">
              <img 
                src={heroThumb} 
                alt="Greenstone Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Headline — Greenstone's identity */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl lg:text-[3.8rem] font-light tracking-tight leading-[1.05]">
              Building <span className="italic font-normal text-brand-primary">legacies</span>,<br/>
              not just <span className="font-bold">homes</span>
            </h2>
          </div>

          {/* Vision statement */}
          <div className="lg:col-span-5 flex flex-col gap-6 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-bold">Our Vision</span>
            </div>
            <p className="text-sm md:text-[15px] text-[#070707]/60 leading-relaxed font-medium max-w-md">
              Greenstone Developments Ltd are on a mission to enhance the associations we partner with, 
              while operating in an ethical and socially conscious manner. We turn ideas into reality.
            </p>
            <div className="mt-2">
              <Link to="/about" className="inline-flex items-center gap-2 text-xs font-bold text-[#070707] hover:text-brand-primary uppercase tracking-[0.2em] transition-colors group">
                Read Full Story <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row: About text + Stats | Large Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          
          {/* Left column: Story + Stats */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <p className="text-sm text-[#070707]/50 leading-relaxed font-medium max-w-sm">
              Incorporated in 2002, we were formed to develop well-designed, 
              competitively priced real estate in Nigeria. For over two decades, we've 
              been improving the lot of individuals and corporate clients through 
              investment finance and management services.
            </p>

            {/* Stat cards */}
            <div className="flex gap-4 flex-wrap sm:flex-nowrap">

              {/* Mission card */}
              <div className="flex flex-col bg-[#f5f5f5] rounded-2xl p-5 min-w-[140px] flex-1 border border-[#070707]/5 hover:border-brand-primary/30 transition-colors group">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={14} className="text-brand-primary" />
                  <span className="text-[8px] tracking-widest uppercase text-brand-primary font-bold">Mission</span>
                </div>
                <h4 className="text-sm font-bold text-[#070707] leading-tight mb-2 group-hover:text-brand-primary transition-colors">Integrity &<br/>Performance</h4>
                <p className="text-[10px] text-[#070707]/40 font-medium leading-snug">
                  Building long-term relationships based on value and client satisfaction.
                </p>
              </div>

              {/* Values card */}
              <div className="flex flex-col bg-white rounded-2xl p-5 min-w-[160px] flex-1 border border-[#070707]/5 hover:border-brand-primary/30 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Eye size={14} className="text-brand-primary" />
                      <span className="text-[8px] tracking-widest uppercase text-brand-primary font-bold">Who We Are</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#070707] leading-tight group-hover:text-brand-primary transition-colors">Visionaries &<br/>master builders</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#070707] flex items-center justify-center group-hover:bg-brand-primary transition-colors shrink-0 ml-3 self-start">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
                <p className="text-[10px] text-[#070707]/40 font-medium leading-snug">
                  A team of architects, engineers, and dreamers 
                  turning bold visions into addresses people are proud to call home.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Large property image */}
          <div className="lg:col-span-6 relative">
            <div className="w-full h-[300px] md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#070707]/5 group relative">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none rounded-3xl"></div>
              <img 
                src={visionImg} 
                alt="Greenstone Vision Architecture"
                loading="lazy"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              {/* Floating green badge on image */}
              <div className="absolute bottom-6 left-6 bg-brand-primary/90 backdrop-blur-sm text-white px-5 py-3 rounded-2xl z-20 shadow-xl">
                <span className="text-[9px] tracking-widest uppercase font-bold block mb-0.5">EST. 2002</span>
                <span className="text-lg font-bold leading-none">Greenstone Developments</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutVision;
