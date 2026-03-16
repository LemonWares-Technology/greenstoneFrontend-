import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Building, Landmark, BadgeDollarSign } from 'lucide-react';
import propertyImg from '../assets/invest-pool-villa.jpg';

const reasons = [
  {
    icon: TrendingUp,
    title: 'High ROI',
    desc: 'Lagos real estate delivers 15–25% annual appreciation. Greenstone properties consistently outperform the market average.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Investment',
    desc: 'Full legal documentation, verified land titles, and government-approved permits protect every naira you invest.',
  },
  {
    icon: Building,
    title: 'Prime Corridors',
    desc: 'Strategically positioned in Lekki, Ibeju-Lekki, and Epe — where infrastructure growth drives explosive demand.',
  },
  {
    icon: Landmark,
    title: 'Proven Track Record',
    desc: 'Multiple developments delivered on time and within budget. Our portfolio speaks louder than promises.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Flexible Entry',
    desc: 'Structured payment plans, off-plan discounts, and corporate packages for individuals and institutional partners.',
  },
];

const stats = [
  { value: '25%', label: 'Annual property appreciation in Lagos' },
  { value: '200+', label: 'Homes delivered on time & budget' },
  { value: '3x', label: 'Land value growth in our corridors' },
];

const WhyInvest = () => {
  return (
    <section id="why-invest" className="relative w-full bg-[#f5f5f0] text-[#070707] font-sans overflow-hidden">

      {/* ===== Top: Header + Stats band ===== */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-brand-primary" aria-hidden />
          <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
            For Investors
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 md:mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              Why Invest with <span className="font-bold text-brand-primary">Greenstone</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#070707]/70 font-medium max-w-lg">
              Lagos is one of Africa's fastest-growing real estate markets. We position you at the centre of that growth with secure, high-return developments.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 self-start lg:self-auto bg-[#070707] text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-brand-primary group shrink-0"
          >
            Start Investing
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 rounded-2xl overflow-hidden mb-16 md:mb-20">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-5 p-6 md:p-8 ${
                i === 0 ? 'bg-[#070707] text-white' : 'bg-white'
              } ${i > 0 ? 'border-l border-[#070707]/5' : ''}`}
            >
              <span className={`text-4xl md:text-5xl font-black leading-none tracking-tight tabular-nums ${
                i === 0 ? 'text-brand-primary' : 'text-brand-primary'
              }`}>
                {s.value}
              </span>
              <span className={`text-sm font-medium leading-snug ${
                i === 0 ? 'text-white/70' : 'text-[#070707]/60'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Main: Image + Reason list ===== */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left: Property image — tall, sticky */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#070707]/5 aspect-3/4 group">
              <img
                src={propertyImg}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#070707]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="text-xs tracking-widest uppercase font-bold text-brand-primary block mb-1">
                  Investment-Grade
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-white leading-none tracking-tight">
                  Properties
                </span>
              </div>
            </div>
          </div>

          {/* Right: Reason rows */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {reasons.map((reason, i) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={i}
                    className={`group flex gap-5 md:gap-6 py-7 md:py-8 ${
                      i < reasons.length - 1 ? 'border-b border-[#070707]/6' : ''
                    }`}
                  >
                    {/* Number + icon */}
                    <div className="flex flex-col items-center gap-3 pt-1">
                      <span className="text-xs font-black text-[#070707]/10 tabular-nums select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#070707]/4 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors duration-300">
                        <Icon size={18} className="text-[#070707]/60 group-hover:text-brand-primary transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#070707] mb-2 group-hover:text-brand-primary transition-colors duration-300">
                        {reason.title}
                      </h3>
                      <p className="text-base text-[#070707]/70 leading-relaxed font-medium max-w-md">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default WhyInvest;
