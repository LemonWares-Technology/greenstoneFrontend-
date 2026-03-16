import { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Building2 } from 'lucide-react';
import heroBg1 from '../assets/hero-modern-villa-dusk.jpg';
import heroBg2 from '../assets/hero-luxury-villa-aerial.jpg';
import heroBg3 from '../assets/hero-modern-duplex-night.jpg';

const SLIDE_DURATION = 6000;

const slides = [
  { image: heroBg1, location: 'Lekki Phase 1', type: 'Residential' },
  { image: heroBg2, location: 'Maitama, Abuja', type: 'Mixed-Use' },
  { image: heroBg3, location: 'Victoria Island', type: 'Waterfront' },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    let elapsed = 0;
    const tick = 80;

    const interval = setInterval(() => {
      elapsed += tick;
      setProgress((elapsed / SLIDE_DURATION) * 100);

      if (elapsed >= SLIDE_DURATION) {
        setCurrent((prev) => (prev + 1) % slides.length);
        elapsed = 0;
        setProgress(0);
      }
    }, tick);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative h-screen min-h-[600px] max-h-[1200px] w-full font-sans text-white overflow-hidden">

      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0 z-0 bg-[#070707]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-[1.8s] ease-out ${
              i === current
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-[1.06]'
            }`}
          >
            <img
              src={slide.image}
              alt=""
              {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-[#070707]/55" />
        <div className="absolute inset-0 bg-linear-to-t from-[#070707] via-[#070707]/30 to-[#070707]/40" />
        <div className="absolute inset-0 bg-linear-to-r from-[#070707]/80 via-[#070707]/20 to-transparent" />
      </div>

      {/* === CONTENT LAYER === */}
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        {/* Main Content — pushed to bottom for grounded editorial feel */}
        <div className="flex-1 min-h-0 overflow-hidden flex items-end px-6 md:px-12 lg:px-16 pb-0">
          <div className="max-w-[1600px] mx-auto w-full pb-6 md:pb-10">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-16 items-end">
              {/* Left: Typography stack */}
              <div className="lg:col-span-7 xl:col-span-8">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brand-primary" aria-hidden />
                  <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
                    Est. 2002
                  </span>
                </div>

                {/* Headline: stacked, weight + opacity contrast */}
                <h1 className="text-[clamp(2.8rem,7.5vw,7.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em] mb-6 md:mb-8">
                  <span className="block">Building</span>
                  <span className="block font-extralight italic text-white/75">the future</span>
                  <span className="block">
                    <span className="text-brand-primary font-light not-italic">of </span>
                    Real Estate
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-white/85 font-medium leading-relaxed max-w-lg border-l-2 border-brand-primary/60 pl-4">
                  Building long-term relationships based on integrity, performance, and clients' satisfaction — shaping Nigeria's property landscape for over two decades.
                </p>
              </div>

              {/* Right: CTAs + current slide context */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:items-end">
                {/* Slide location tag */}
                <div className="flex items-center gap-2 text-white/60 lg:self-end">
                  <MapPin size={12} className="text-brand-primary" />
                  <span className="text-xs tracking-widest uppercase font-bold">
                    {slides[current].location}
                  </span>
                  <span className="text-white/50 mx-1">·</span>
                  <span className="text-xs tracking-widest uppercase font-medium text-brand-primary/70">
                    {slides[current].type}
                  </span>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-full">
                  <Link
                    to="/projects"
                    className="group flex items-center justify-between gap-4 bg-brand-primary text-white px-6 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                  >
                    <span>Explore Projects</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-brand-primary transition-colors duration-300">
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </div>
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors border border-white/15 hover:border-white/40 px-6 py-4 rounded-full backdrop-blur-sm"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* === BOTTOM BAR === grounding strip with stats + slide progress */}
        <div className="border-t border-white/20 bg-[#070707]/80 backdrop-blur-md shrink-0">
          <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Micro stats */}
            <div className="flex items-center gap-5 md:gap-8 text-sm font-bold text-white/90">
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-brand-primary" />
                <span>20+ Years</span>
              </div>
              <span className="w-px h-4 bg-white/20" aria-hidden />
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-primary" />
                <span>Lagos · Abuja</span>
              </div>
              <span className="w-px h-4 bg-white/20 hidden sm:block" aria-hidden />
              <span className="hidden sm:inline text-white/70 font-semibold">
                Greenstone Developments Ltd
              </span>
            </div>

            {/* Slide progress indicators */}
            <div className="flex items-center gap-5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="flex items-center gap-2.5 group cursor-pointer"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span className={`text-xs font-bold tabular-nums transition-colors duration-300 ${
                    i === current ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-brand-primary rounded-full transition-[width] duration-100 ease-linear"
                      style={{
                        width: i === current ? `${progress}%` : i < current ? '100%' : '0%',
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
