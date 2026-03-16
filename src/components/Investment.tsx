import { Link } from 'react-router-dom';
import { ArrowRight, Award, Leaf, Clock, ThumbsUp, Building } from 'lucide-react';
import propertyImg from '../assets/invest-pool-villa.jpg';
import interiorImg from '../assets/project-classic-residence.jpg';

const stats = [
  { value: '20+', label: 'Years of Industry Experience', icon: Clock },
  { value: '100%', label: 'Client Satisfaction Rate', icon: ThumbsUp },
  { value: '500+', label: 'Premium Units Delivered', icon: Building },
];

const guarantees = [
  { label: 'Premium Material Selection', pct: 100 },
  { label: 'Sustainable Building Practices', pct: 100 },
  { label: 'On-Time Project Delivery', pct: 95 },
];

const Investment = () => {
  return (
    <section id="investment" className="relative w-full bg-[#070707] text-white font-sans overflow-hidden">

      {/* ===== TOP: Statement + Image ===== */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-16 md:pb-24">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-12 md:mb-16">
          <span className="w-8 h-px bg-brand-primary" aria-hidden />
          <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
            Our Standard
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: headline + paragraph + CTA */}
          <div className="lg:col-span-6 xl:col-span-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white mb-4">
              Exceptional <span className="font-bold text-brand-primary">Service</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 font-medium max-w-md mb-4">
              Service excellence isn't a goal — it's our standard on every project.
            </p>

            <p className="text-base text-white/80 leading-relaxed font-medium max-w-md mb-8">
              Our comprehensive service portfolio and integrated team approach ensure that
              every project fully addresses design, lifestyle, and investment parameters —
              from the initial planning stages through to handover.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-3 bg-brand-primary text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] group"
            >
              View Our Craft
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: overlapping image composition */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-4/3 group">
                <img
                  src={propertyImg}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#070707]/50 via-transparent to-transparent" />
              </div>

              {/* Floating interior preview — overlaps bottom-left */}
              <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 w-[45%] max-w-[220px] rounded-xl overflow-hidden shadow-xl border-2 border-[#070707] z-10 group">
                <div className="aspect-4/3">
                  <img
                    src={interiorImg}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                </div>
              </div>

              {/* Quality badge — top right */}
              <div className="absolute -top-4 -right-3 md:-top-5 md:-right-5 z-10 bg-brand-primary text-[#070707] px-4 py-3 rounded-xl shadow-lg">
                <Award size={20} className="mb-1" />
                <span className="text-xs tracking-widest uppercase font-extrabold block leading-none">
                  Quality
                </span>
                <span className="text-xs tracking-widest uppercase font-extrabold block leading-none">
                  Assured
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MIDDLE: Stats strip ===== */}
      <div className="border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-5 py-8 md:py-10 sm:px-8 first:sm:pl-0 last:sm:pr-0 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/15 transition-colors duration-300">
                  <stat.icon size={20} className="text-brand-primary" />
                </div>
                <div>
                  <span className="text-4xl md:text-5xl font-black text-white leading-none block tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/70 font-medium tracking-wide mt-1 block">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BOTTOM: Guarantee bars ===== */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: label */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={14} className="text-brand-primary" />
              <span className="text-xs tracking-[0.3em] uppercase font-bold text-brand-primary">
                The Greenstone Guarantee
              </span>
            </div>
            <p className="text-base text-white/70 leading-relaxed font-medium max-w-sm">
              Every project is held to these benchmarks — no exceptions, no compromises.
            </p>
          </div>

          {/* Right: progress bars */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {guarantees.map((g) => (
              <div key={g.label} className="group">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                    {g.label}
                  </span>
                  <span className="text-sm font-black text-brand-primary tabular-nums">
                    {g.pct}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${g.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Investment;
