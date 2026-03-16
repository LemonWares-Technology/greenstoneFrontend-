import { useState } from 'react';
import { ArrowRight, ArrowLeft, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael A.',
    role: 'Homeowner, Lekki',
    date: 'Jan 2025',
    text: "The architecture is so refined that it feels as if the houses have always been part of the landscape. Greenstone didn't just build a home — they built a sanctuary.",
    rating: 5,
  },
  {
    name: 'Anna K.',
    role: 'Investor, Diaspora',
    date: 'Nov 2024',
    text: 'This place gave me more than just a property. For the first time in years, I felt confident about a real estate investment. The transparency was incredible.',
    rating: 5,
  },
  {
    name: 'Sofia L.',
    role: 'Homeowner, Victoria Island',
    date: 'Aug 2024',
    text: "I left with a sense of security that stayed with me long after signing. The team's professionalism and attention to detail is unmatched in Lagos.",
    rating: 5,
  },
  {
    name: 'David O.',
    role: 'Buyer, Maitama',
    date: 'Jun 2024',
    text: 'From the first consultation to key handover, every step was seamless. My family and I are now proud owners of a Greenstone home. Worth every naira.',
    rating: 5,
  },
  {
    name: 'Chioma E.',
    role: 'Repeat Investor',
    date: 'Mar 2024',
    text: "As an investor, I've seen many developers overpromise. Greenstone delivered exactly what was shown — on time and with superior quality. Already investing in my second unit.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const next = () => setActive((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  const current = testimonials[active];

  return (
    <section id="testimonials" className="relative w-full bg-[#070707] text-white py-24 md:py-32 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* ===== Header ===== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white">
              What Our Clients <span className="font-bold text-brand-primary">Say</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-white/70 font-medium max-w-md">
              Honest reflections from homeowners and investors who trust Greenstone with their most important decisions.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <span className="text-4xl font-black text-brand-primary leading-none block">120+</span>
              <span className="text-sm tracking-widest uppercase text-white/60 font-bold">Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 cursor-pointer text-white/60 hover:text-white"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 cursor-pointer text-white/60 hover:text-white"
                aria-label="Next testimonial"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ===== Featured quote — full width, centered ===== */}
        <div className="mb-16 md:mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <Quote size={36} className="text-brand-primary/20 mx-auto mb-8" />

            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-relaxed tracking-tight mb-10">
              "{current.text}"
            </p>

            {/* Author */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-sm font-bold text-white">
                {current.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{current.name}</h4>
                <p className="text-xs text-white/60 font-medium mt-0.5">{current.role}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={11} className="text-brand-primary fill-brand-primary" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Selector dots + thumbnails ===== */}
        <div className="border-t border-white/5 pt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left rounded-xl p-4 md:p-5 transition-all duration-300 cursor-pointer border ${
                  i === active
                    ? 'bg-white/5 border-brand-primary/30'
                    : 'bg-transparent border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      i === active
                        ? 'bg-brand-primary text-white'
                        : 'bg-white/5 text-white/30'
                    }`}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4
                      className={`text-xs font-bold truncate transition-colors ${
                        i === active ? 'text-brand-primary' : 'text-white/60'
                      }`}
                    >
                      {t.name}
                    </h4>
                    <span className="text-xs text-white/50 font-medium">{t.date}</span>
                  </div>
                </div>
                <p className="text-xs text-white/50 font-medium line-clamp-2 leading-relaxed">
                  {t.text}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
