import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import aboutImage from '../assets/beautiful-red-brick-house-with-decorative-lights.webp'; // Using one of our high quality generated images

const Investment = () => {
  return (
    <section id="investment" className="relative w-full min-h-screen bg-[#070707] text-white py-24 font-sans overflow-hidden">
      
      {/* Background Dark grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 flex justify-center">
        <div className="w-px h-full bg-white/10 absolute left-1/4"></div>
        <div className="w-px h-full bg-white/10 absolute left-1/2"></div>
        <div className="w-px h-full bg-white/10 absolute left-3/4"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col relative z-10 w-full max-w-[1600px] gap-12">
        
        {/* Top Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Large Image */}
          <div className="w-full h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl relative border border-white/5 group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <img 
              src={aboutImage}
              alt="Greenstone Investment Property" 
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2000ms] ease-out object-center"
            />
          </div>

          {/* Right Content Area */}
          <div className="flex flex-col pt-8 lg:pr-12 h-full">
            
            {/* Introductory Text with Orb */}
            {/* Introductory Text with Orb */}
            <h3 className="text-xl md:text-2xl lg:text-3xl font-[300] leading-tight mb-20 text-white/90 max-w-xl">
              We turn ideas into reality with a tradition of building long-term relationships based on integrity, performance, value and client's
              <span className="inline-flex relative items-center justify-center w-6 h-6 mx-3 -translate-y-1">
                <span className="absolute inset-0 bg-brand-primary blur-[10px] opacity-80 rounded-full"></span>
                <span className="relative w-3 h-3 bg-brand-primary rounded-full shadow-[0_0_15px_var(--color-brand-primary)]"></span>
              </span>
              satisfaction.
            </h3>

            {/* Section Label */}
            <div className="flex items-center gap-4 mb-6 relative z-20">
              <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-bold flex items-center gap-3">
                <span className="text-white/20">[</span>
                OUR STANDARD
                <span className="text-white/20">]</span>
              </span>
            </div>

            {/* Huge Title and Circular Video Btn */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-16 relative w-full">
              
              <h2 className="text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-tighter leading-[0.85] flex flex-col uppercase relative z-20">
                <span className="text-brand-primary">EXCEPTIONAL</span>
                <span className="text-white">SERVICE</span>
              </h2>
              
              {/* Circular Video Play Button - Positioned absolute on huge screens to overlap nicely */}
              <div className="relative xl:absolute xl:-right-12 xl:top-1/2 xl:-translate-y-1/2 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 shrink-0 group cursor-pointer z-30">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-xl group-hover:bg-brand-primary/20 transition-colors duration-500"></div>
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-[#1a1a1a] rounded-full flex flex-col items-center justify-center border border-white/10 hover:border-brand-primary transition-colors duration-300 z-10 shadow-2xl">
                   <ArrowUpRight size={18} className="text-white mb-2 group-hover:text-brand-primary transition-colors duration-300" />
                   <span className="text-[9px] tracking-widest uppercase text-white/70 text-center leading-tight">View<br/>Craftsmanship</span>
                </div>
              </div>
            </div>

            {/* Paragraph and mini image row */}
            <div className="flex flex-col sm:flex-row items-end gap-8 justify-between w-full mt-auto">
              <p className="text-xs md:text-sm text-white/50 leading-relaxed max-w-[300px] font-medium tracking-wide">
                Our comprehensive service portfolio and integrated team approach to development ensure that our projects fully address all design and lifestyle parameters.
              </p>
              <div className="w-[180px] h-[120px] rounded-2xl overflow-hidden shrink-0 border border-white/5 opacity-80 hover:opacity-100 transition-opacity">
                <img 
                  src={aboutImage}
                  alt="Modern Interior Preview" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-12 border-t border-white/5">
          
          {/* Progress Bars */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col justify-end pb-4 lg:pr-8 lg:border-r border-white/10">
            <h4 className="text-xl md:text-2xl font-light mb-8">Greenstone Guarantee:</h4>
            
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex justify-between text-[9px] tracking-widest text-white/50 uppercase mb-3 font-semibold">
                  <span>Premium Material Selection</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-0.5 bg-white/10 relative">
                  <div className="absolute left-0 top-0 h-full bg-brand-primary w-[100%] shadow-[0_0_10px_var(--color-brand-primary)]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] tracking-widest text-white/50 uppercase mb-3 font-semibold">
                  <span>Sustainable Practices</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-0.5 bg-white/10 relative">
                  <div className="absolute left-0 top-0 h-full bg-brand-primary w-[100%] shadow-[0_0_10px_var(--color-brand-primary)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Card 1 */}
          <div className="col-span-1 bg-[#111] rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-white/5 hover:border-brand-primary/50 transition-colors group">
            <p className="text-[10px] tracking-wider text-white/50 font-medium leading-relaxed">Years Industry Experience</p>
            <div className="flex items-end justify-between mt-12">
              <h3 className="text-5xl md:text-6xl font-light text-white group-hover:text-brand-primary transition-colors">20+</h3>
              <span className="text-[10px] text-white/30 font-mono">[ 01 ]</span>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="col-span-1 bg-[#111] rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-white/5 hover:border-brand-primary/50 transition-colors group">
            <p className="text-[10px] tracking-wider text-white/50 font-medium line-clamp-2">Client Satisfaction</p>
            <div className="flex items-end justify-between mt-12">
              <h3 className="text-5xl md:text-6xl font-light text-white group-hover:text-brand-primary transition-colors">100%</h3>
              <span className="text-[10px] text-white/30 font-mono">[ 02 ]</span>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="col-span-1 bg-[#111] rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-white/5 hover:border-brand-primary/50 transition-colors group cursor-pointer relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <p className="text-[10px] tracking-wider text-white/50 font-medium max-w-[120px]">Luxury Units Developed</p>
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors shadow-lg">
                 <ArrowUpRight size={14} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex items-end justify-between mt-12 relative z-10">
              <h3 className="text-5xl md:text-6xl font-light text-white group-hover:text-brand-primary transition-colors">500+</h3>
              <span className="text-[10px] text-white/30 font-mono">[ 03 ]</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Investment;
