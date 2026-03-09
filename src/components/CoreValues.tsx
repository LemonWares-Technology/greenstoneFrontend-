import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Shield, Handshake, Award, Users, Lightbulb, Crown } from 'lucide-react';

const values = [
  {
    id: 1,
    num: '01',
    icon: Shield,
    title: 'INTEGRITY',
    subtitle: 'Ethical Behaviour',
    description: 'We embrace the highest standard of ethical behaviour and transparency in every aspect of our business to yield a company that is trusted by its clients and stakeholders.',
  },
  {
    id: 2,
    num: '02',
    icon: Handshake,
    title: 'PARTNERSHIP',
    subtitle: 'Building Together',
    description: 'Our success and delivery of quality programs and services are largely dependent on partnerships that we create with all of our internal and external stakeholders.',
  },
  {
    id: 3,
    num: '03',
    icon: Award,
    title: 'EXCELLENCE',
    subtitle: 'Flawless Execution',
    description: 'Our commitment to professional excellence ensures that our clients receive the highest quality services. We aspire to provide flawless execution and delivery of our products.',
  },
  {
    id: 4,
    num: '04',
    icon: Users,
    title: 'TEAMWORK',
    subtitle: 'Optimum Solutions',
    description: 'Our culture of teamwork allows us to combine the quality and expertise of our professional staff to deliver optimum solutions to our clients.',
  },
  {
    id: 5,
    num: '05',
    icon: Lightbulb,
    title: 'INNOVATION',
    subtitle: 'Creativity & Ingenuity',
    description: 'We thrive on creativity and ingenuity. In today\'s fast-paced technological climate, innovative ideas and processes are essential to our continued success and growth.',
  },
  {
    id: 6,
    num: '06',
    icon: Crown,
    title: 'LEADERSHIP',
    subtitle: 'In Every Employee',
    description: 'The spirit of leadership is instilled in every employee. We lead the market with visionary developments that redefine luxury living.',
  },
];

const CoreValues = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, values.length - cardsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="core-values" className="relative w-full min-h-screen bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
      
      {/* Subtle green grid lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-px h-full bg-brand-primary/[0.06] absolute left-1/4"></div>
        <div className="w-px h-full bg-brand-primary/[0.06] absolute left-1/2"></div>
        <div className="w-px h-full bg-brand-primary/[0.06] absolute left-3/4"></div>
        {/* Horizontal green accent line */}
        <div className="h-px w-full bg-brand-primary/[0.08] absolute top-1/3"></div>
      </div>

      {/* Green corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-brand-primary/10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-brand-primary/10 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-[1600px]">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-16 md:mb-24">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_10px_var(--color-brand-primary)]"></div>
            <span className="text-[10px] tracking-[0.3em] text-brand-primary uppercase font-bold">
              The Greenstone Standard
            </span>
          </div>
          <p className="text-[10px] tracking-wider text-[#070707]/40 uppercase max-w-[220px] text-right leading-relaxed hidden md:block">
            Why clients choose us — our values define every brick we lay.
          </p>
        </div>

        {/* Huge Background Text */}
        <div className="relative mb-8 md:mb-16">
          <h2 className="text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[10rem] font-bold tracking-tighter leading-[0.85] uppercase select-none whitespace-nowrap">
            <span className="text-brand-primary/[0.12]">CORE</span>
            <span className="text-[#070707]/[0.04]"> VALUES</span>
          </h2>
          {/* Green underline accent */}
          <div className="absolute bottom-0 left-0 w-24 md:w-40 h-1 bg-brand-primary rounded-full shadow-[0_0_15px_var(--color-brand-primary)]"></div>
        </div>

        {/* Cards Slider */}
        <div className="relative overflow-hidden -mt-4 md:-mt-16 lg:-mt-24" ref={sliderRef}>
          <div 
            className="flex transition-transform duration-700 ease-out gap-6"
            style={{ transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)` }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Link 
                  key={index}
                  to={`/core-values/${value.id}`}
                  className="flex-shrink-0 group cursor-pointer block"
                  style={{ width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 24 / cardsPerView}px)` }}
                >
                  <div className="relative bg-[#070707] rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[380px] md:min-h-[420px] border border-[#070707]/10 hover:border-brand-primary transition-all duration-500 overflow-hidden">
                    
                    {/* Green glow on hover */}
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    
                    {/* Green accent line at top */}
                    <div className="absolute top-0 left-8 right-8 h-[2px] bg-brand-primary/20 group-hover:bg-brand-primary transition-colors duration-500"></div>

                    {/* Top: Icon + Number */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors duration-300 border border-brand-primary/20">
                          <Icon size={24} className="text-brand-primary" />
                        </div>
                        <span className="text-[10px] font-mono text-white/20 mt-2">
                          /{value.num}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase leading-tight mb-2">
                        {value.title}
                      </h3>
                      <p className="text-xs text-brand-primary font-semibold tracking-widest uppercase mb-6">
                        {value.subtitle}
                      </p>
                    </div>

                    {/* Bottom: Description + Arrow */}
                    <div className="relative z-10">
                      <p className="text-sm text-white/50 leading-relaxed mb-8 font-medium">
                        {value.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="h-px flex-1 bg-white/5 mr-4 group-hover:bg-brand-primary/30 transition-colors duration-500"></div>
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300">
                          <ArrowUpRight size={16} className="text-brand-primary group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom: Slide indicator + Navigation */}
        <div className="flex items-center justify-between mt-12">
          {/* Slide Progress */}
          <div className="flex items-center gap-4">
            <span className="text-brand-primary font-bold text-2xl font-mono">0{currentSlide + 1}</span>
            <div className="w-24 md:w-40 h-[2px] bg-[#070707]/10 relative rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-brand-primary rounded-full transition-all duration-500 shadow-[0_0_8px_var(--color-brand-primary)]"
                style={{ width: `${((currentSlide + 1) / (maxSlide + 1)) * 100}%` }}
              ></div>
            </div>
            <span className="text-[#070707]/30 font-bold text-2xl font-mono">0{maxSlide + 1}</span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 group ${
                currentSlide === 0 
                  ? 'border-[#070707]/10 opacity-30 cursor-not-allowed' 
                  : 'border-brand-primary/30 hover:bg-brand-primary hover:border-brand-primary cursor-pointer'
              }`}
            >
              <ArrowRight size={16} className={`rotate-180 transition-colors ${currentSlide === 0 ? 'text-[#070707]/30' : 'text-brand-primary group-hover:text-white'}`} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlide === maxSlide}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 group ${
                currentSlide === maxSlide 
                  ? 'border-[#070707]/10 opacity-30 cursor-not-allowed' 
                  : 'border-brand-primary/30 hover:bg-brand-primary hover:border-brand-primary cursor-pointer'
              }`}
            >
              <ArrowRight size={16} className={`transition-colors ${currentSlide === maxSlide ? 'text-[#070707]/30' : 'text-brand-primary group-hover:text-white'}`} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoreValues;
