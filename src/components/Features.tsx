import { Lightbulb, Gem, Hammer, Zap } from 'lucide-react';
import aboutImage from '../assets/feature-sunset-villa.jpg';

const objectives = [
  {
    num: '01',
    icon: Lightbulb,
    title: 'Innovative Solutions',
    desc: 'We adapt to our clients\' evolving needs — designing flexible spaces and pioneering construction methods that respond to Nigeria\'s dynamic real estate landscape.',
    accent: 'Innovation',
  },
  {
    num: '02',
    icon: Gem,
    title: 'Uncompromising Quality',
    desc: 'Every material is vetted, every joint inspected. We anticipate what our clients need and deliver products and finishes that exceed their expectations.',
    accent: 'Excellence',
  },
  {
    num: '03',
    icon: Hammer,
    title: 'Master Craftsmen',
    desc: 'Our artisans are continuously trained on global construction trends — their expertise is the invisible signature inside every Greenstone property.',
    accent: 'Craftsmanship',
  },
  {
    num: '04',
    icon: Zap,
    title: 'Prompt Delivery',
    desc: 'Clear milestones, transparent timelines, and relentless follow-through. We deliver on schedule because your time is as valuable as your investment.',
    accent: 'Efficiency',
  },
];

const Features = () => {
  return (
    <section id="features" className="relative w-full bg-white text-[#070707] font-sans overflow-hidden">

      {/* ===== Header band ===== */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-14 md:pb-20 border-b border-[#070707]/8">

          {/* Left: eyebrow + headline */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
                Corporate Objectives
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              The Greenstone <span className="font-bold text-brand-primary">Advantage</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#070707]/70 font-medium max-w-md">
              Smart, secure, and sustainable — every objective is a promise we make before the first foundation is poured.
            </p>
          </div>

          <div className="lg:col-span-5"></div>
        </div>
      </div>

      {/* ===== Objectives grid + image ===== */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left: image card — tall, rounded, with overlay stats */}
          <div className="lg:col-span-5 xl:col-span-4 relative lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#070707]/10 border border-[#070707]/5 aspect-3/4 group">
              <img
                src={aboutImage}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#070707]/80 via-[#070707]/10 to-transparent" />

              {/* Bottom overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-xs tracking-widest uppercase font-bold text-brand-primary block mb-1">
                      Designed to feel like
                    </span>
                    <span className="text-4xl md:text-5xl font-extrabold text-white leading-none tracking-tight">
                      Home
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <span className="text-3xl font-black text-brand-primary leading-none block">20+</span>
                      <span className="text-sm tracking-widest uppercase text-white/70 font-bold">Years</span>
                    </div>
                    <div className="w-px h-10 bg-white/15" aria-hidden />
                    <div className="text-center">
                      <span className="text-3xl font-black text-brand-primary leading-none block">50+</span>
                      <span className="text-sm tracking-widest uppercase text-white/70 font-bold">Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: objectives list */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col">
              {objectives.map((obj, i) => (
                <div
                  key={obj.num}
                  className={`group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start gap-4 md:gap-8 py-8 md:py-10 ${
                    i < objectives.length - 1 ? 'border-b border-[#070707]/6' : ''
                  }`}
                >
                  {/* Number + icon */}
                  <div className="flex items-center gap-4">
                    <span className="text-3xl md:text-4xl font-black text-[#070707]/6 tabular-nums leading-none select-none group-hover:text-brand-primary/20 transition-colors duration-500">
                      {obj.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#070707]/4 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors duration-300">
                      <obj.icon size={18} className="text-[#070707]/60 group-hover:text-brand-primary transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#070707] group-hover:text-brand-primary transition-colors duration-300">
                      {obj.title}
                    </h3>
                    <p className="text-base text-[#070707]/70 leading-relaxed font-medium max-w-lg">
                      {obj.desc}
                    </p>
                  </div>

                  {/* Accent tag — visible on hover / always on mobile */}
                  <div className="md:self-center">
                    <span className="inline-block text-xs tracking-[0.25em] uppercase font-bold text-brand-primary bg-brand-primary/8 px-3 py-1.5 rounded-full md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                      {obj.accent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Features;
