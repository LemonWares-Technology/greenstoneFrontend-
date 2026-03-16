import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Users, ShieldCheck, Clock } from 'lucide-react';
import interiorImg from '../assets/intro-stone-facade.jpg';
import exteriorImg from '../assets/intro-colonial-villa.jpg';

const pillars = [
  {
    icon: Ruler,
    label: 'Design',
    title: 'Precision Architecture',
    desc: 'Every floor plan is engineered around how people actually live — light, flow, and function come first.',
  },
  {
    icon: Users,
    label: 'Team',
    title: 'Integrated Experts',
    desc: 'Architects, engineers, and project managers work as one unit from first sketch to final handover.',
  },
  {
    icon: ShieldCheck,
    label: 'Quality',
    title: 'Built to Last',
    desc: 'Rigorous material selection and on-site quality control ensure every structure exceeds industry standards.',
  },
  {
    icon: Clock,
    label: 'Delivery',
    title: 'On Time, Every Time',
    desc: 'Transparent timelines and milestone tracking so you always know where your investment stands.',
  },
];

const Intro = () => {
  return (
    <section className="relative w-full bg-[#070707] text-white font-sans overflow-hidden">

      {/* ===== PART 1: Big statement + dual images ===== */}
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-20 md:pb-28">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-brand-primary" aria-hidden />
          <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
            How We Build
          </span>
        </div>

        {/* Statement + images grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left: Typography statement */}
          <div className="lg:col-span-6 xl:col-span-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white mb-4">
              We Don't Just Build Houses, We Craft <span className="font-bold text-brand-primary">Homes</span>
            </h2>

            <p className="text-base text-white/80 leading-relaxed font-medium max-w-md mb-8">
              From land acquisition through design, construction, and handover — our integrated
              team approach ensures every project fully addresses design, lifestyle, and investment
              parameters. No detail is too small. No ambition is too large.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:border-brand-primary/50 hover:bg-brand-primary/10 text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 group"
            >
              Our Services
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Stacked offset images */}
          <div className="lg:col-span-6 xl:col-span-7 relative min-h-[300px] md:min-h-[420px]">
            {/* Back image — exterior */}
            <div className="absolute top-0 right-0 w-[70%] md:w-[65%] h-[280px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 z-0">
              <img
                src={exteriorImg}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#070707]/20" />
            </div>

            {/* Front image — interior, offset down-left */}
            <div className="absolute bottom-0 left-0 lg:left-4 w-[55%] md:w-[50%] h-[220px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
              <img
                src={interiorImg}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#070707]/10" />
            </div>

            {/* Floating badge bridging both images */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 bg-brand-primary text-[#070707] px-4 py-2.5 rounded-xl shadow-lg">
              <span className="text-xs tracking-widest uppercase font-extrabold block leading-none">Since</span>
              <span className="text-2xl font-black leading-none">2002</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PART 2: Four pillars — horizontal strip ===== */}
      <div className="border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.label}
                className={`group flex flex-col p-6 md:p-8 transition-colors duration-300 hover:bg-white/3 ${
                  i < pillars.length - 1 ? 'lg:border-r border-white/5' : ''
                } ${i < pillars.length - 2 ? 'sm:border-b lg:border-b-0 border-white/5' : ''} ${
                  i === pillars.length - 2 ? 'sm:border-b lg:border-b-0 border-white/5' : ''
                }`}
              >
                {/* Icon + label */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    <pillar.icon size={16} className="text-brand-primary" />
                  </div>
                  <span className="text-xs tracking-[0.3em] uppercase font-bold text-brand-primary">
                    {pillar.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-3 group-hover:text-brand-primary transition-colors">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-base text-white/70 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Intro;
