import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Star, Quote } from 'lucide-react';
import visionImg from '../assets/about_vision_property.png';

const testimonials = [
  {
    name: 'Michael A.',
    date: '12.01.2025',
    text: 'The architecture is so refined that it feels as if the houses have always been part of the landscape. Greenstone didn\'t just build a home — they built a sanctuary.',
    rating: 5,
  },
  {
    name: 'Anna K.',
    date: '03.11.2024',
    text: 'This place gave me more than just a property. For the first time in years, I felt confident about a real estate investment. The transparency was incredible.',
    rating: 5,
  },
  {
    name: 'Sofia L.',
    date: '24.08.2024',
    text: 'I left with a sense of security that stayed with me long after signing. The team\'s professionalism and attention to detail is unmatched in Lagos.',
    rating: 5,
  },
  {
    name: 'David O.',
    date: '15.06.2024',
    text: 'From the first consultation to key handover, every step was seamless. My family and I are now proud owners of a Greenstone home. Worth every naira.',
    rating: 5,
  },
  {
    name: 'Chioma E.',
    date: '02.03.2024',
    text: 'As an investor, I\'ve seen many developers overpromise. Greenstone delivered exactly what was shown — on time and with superior quality. Already investing in my second unit.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeSet, setActiveSet] = useState(0);
  const cardsPerView = 3;
  const maxSet = Math.max(0, Math.ceil(testimonials.length / cardsPerView) - 1);
  const visibleCards = testimonials.slice(activeSet * cardsPerView, activeSet * cardsPerView + cardsPerView);

  return (
    <section id="testimonials" className="relative w-full bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
      
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-px h-full bg-slate-300 absolute left-1/4"></div>
        <div className="w-px h-full bg-slate-300 absolute left-1/2"></div>
        <div className="w-px h-full bg-slate-300 absolute left-3/4"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-[1600px]">

        {/* Top Row: Avatars + Headline + Reviews label */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16 md:mb-24">
          
          <div className="flex flex-col gap-6 max-w-2xl">
            {/* Avatar group + count */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-brand-primary/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-brand-primary">
                    {['M', 'A', 'S', 'D'][i - 1]}
                  </div>
                ))}
              </div>
              <div>
                <span className="text-xl font-bold text-[#070707]">120+</span>
                <p className="text-[10px] text-[#070707]/40 font-medium tracking-wider uppercase">Reviews</p>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-[3.8rem] font-light tracking-tight leading-[1.05]">
              What <span className="italic font-normal text-brand-primary">stays</span><br/>
              after the <span className="font-bold">experience</span>
            </h2>
          </div>

          {/* Reviews label + description */}
          <div className="flex flex-col gap-4 max-w-sm pt-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-bold">Reviews</span>
            </div>
            <p className="text-sm text-[#070707]/50 leading-relaxed font-medium">
              Greenstone is difficult to describe in conventional terms. The most honest reflections 
              come from those who already lived the experience — in homes, without rush or expectations.
            </p>
          </div>
        </div>

        {/* Bottom Row: Image + Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Property Image */}
          <div className="lg:col-span-4 h-[300px] md:h-[380px] rounded-3xl overflow-hidden shadow-xl group">
            <img 
              src={visionImg} 
              alt="Greenstone Property"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
            />
          </div>

          {/* Right: Testimonial Cards */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleCards.map((testimonial, idx) => (
                <div 
                  key={activeSet * cardsPerView + idx}
                  className="bg-[#f5f5f5] rounded-2xl p-6 flex flex-col justify-between min-h-[240px] border border-[#070707]/5 hover:border-brand-primary/30 transition-all duration-500 group cursor-pointer"
                >
                  {/* Header: Name + Date */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#070707] group-hover:text-brand-primary transition-colors">{testimonial.name}</h4>
                      <p className="text-[10px] text-[#070707]/30 font-medium mt-0.5">{testimonial.date}</p>
                    </div>
                    <Quote size={16} className="text-brand-primary/30" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={12} className="text-brand-primary fill-brand-primary" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-xs text-[#070707]/50 leading-relaxed font-medium flex-1 mb-4">
                    {testimonial.text}
                  </p>

                  {/* More link */}
                  <a href="#" className="text-[10px] font-bold text-brand-primary tracking-wider uppercase flex items-center gap-1.5 hover:gap-3 transition-all">
                    More <ArrowRight size={10} />
                  </a>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-end gap-3 mt-2">
              <button 
                onClick={() => setActiveSet(Math.max(0, activeSet - 1))}
                disabled={activeSet === 0}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${activeSet === 0 ? 'border-[#070707]/10 opacity-30 cursor-not-allowed' : 'border-[#070707]/20 hover:bg-brand-primary hover:border-brand-primary hover:text-white cursor-pointer'}`}
              >
                <ArrowLeft size={14} />
              </button>
              <span className="text-xs text-[#070707]/30 font-bold">More →</span>
              <button 
                onClick={() => setActiveSet(Math.min(maxSet, activeSet + 1))}
                disabled={activeSet === maxSet}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${activeSet === maxSet ? 'border-[#070707]/10 opacity-30 cursor-not-allowed' : 'border-[#070707]/20 hover:bg-brand-primary hover:border-brand-primary hover:text-white cursor-pointer'}`}
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
