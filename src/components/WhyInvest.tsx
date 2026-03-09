import React from 'react';
import { TrendingUp, ShieldCheck, Building, Landmark, BadgeDollarSign, ArrowUpRight, Home, HardHat, FileCheck, Truck } from 'lucide-react';

const investReasons = [
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

const processSteps = [
  { icon: TrendingUp, title: 'Consultation', desc: 'Define needs and preferences.', row: 1 },
  { icon: Home, title: 'Choosing a model', desc: 'Select house size and layout.', row: 1 },
  { icon: HardHat, title: 'Construction', desc: '6-8 months under full supervision.', row: 1 },
  { icon: FileCheck, title: 'Contract', desc: 'Finalise design and legal agreements.', row: 2 },
  { icon: Truck, title: 'Delivery', desc: 'Final inspection and key handover.', row: 2 },
];

const WhyInvest = () => {
  const topRow = processSteps.filter(s => s.row === 1);
  const bottomRow = processSteps.filter(s => s.row === 2);

  return (
    <section id="why-invest" className="relative w-full bg-[#f0f0f0] text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-[1400px]">

        {/* ============================================ */}
        {/* WHY INVEST — Investor-Focused Content        */}
        {/* ============================================ */}
        <div className="mb-28">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
            <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-bold">For Investors</span>
          </div>

          {/* Headline + Paragraph */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
              Why <span className="font-bold text-brand-primary">Invest</span><br/>
              with Greenstone?
            </h2>
            <p className="text-sm text-[#070707]/50 max-w-md leading-relaxed font-medium lg:text-right">
              Lagos is one of Africa's fastest-growing real estate markets.
              Greenstone positions you at the centre of that growth with secure,
              high-return developments built to international standards.
            </p>
          </div>

          {/* Investor Reason Cards — horizontal row with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {investReasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-[#070707]/5 hover:border-brand-primary/40 transition-all duration-500 group cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md border-2 border-brand-primary/30">
                    <Icon size={20} className="text-white" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-sm font-bold text-[#070707] tracking-tight group-hover:text-brand-primary transition-colors">
                    {reason.title}
                  </h4>
                  <p className="text-xs text-[#070707]/40 font-medium leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================ */}
        {/* FROM VISION TO REALITY — Process Section     */}
        {/* ============================================ */}

        {/* Centered Title */}
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-light tracking-tight leading-[1.05] mb-4">
            From <span className="italic font-normal">Vision</span> to<br/>
            <span className="font-bold">Reality</span>
          </h2>
        </div>

        {/* Process Cards — Staggered Rows */}
        <div className="flex flex-col gap-6 mb-16">

          {/* Top Row — 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:ml-8">
            {topRow.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                  {isEven && (
                    <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-brand-primary/30">
                      <Icon size={22} className="text-white" strokeWidth={1.8} />
                    </div>
                  )}
                  <div className="bg-white rounded-2xl p-5 flex-1 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-base font-bold text-[#070707] mb-1 tracking-tight group-hover:text-brand-primary transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#070707]/40 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {!isEven && (
                    <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-brand-primary/30">
                      <Icon size={22} className="text-white" strokeWidth={1.8} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Row — 2 cards, offset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:mr-8">
            <div className="hidden lg:block"></div>
            {bottomRow.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                  {isEven && (
                    <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-brand-primary/30">
                      <Icon size={22} className="text-white" strokeWidth={1.8} />
                    </div>
                  )}
                  <div className="bg-white rounded-2xl p-5 flex-1 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-base font-bold text-[#070707] mb-1 tracking-tight group-hover:text-brand-primary transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#070707]/40 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {!isEven && (
                    <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-brand-primary/30">
                      <Icon size={22} className="text-white" strokeWidth={1.8} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="border-t border-[#070707]/10 pt-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
            <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-bold">Property Appreciations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: '25%', label: 'Average annual property appreciation in Lagos over the last decade.' },
              { stat: '200+', label: 'Bespoke homes delivered on time and within budget across Lagos.' },
              { stat: '3x', label: 'Average land value growth in Greenstone development corridors.' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 group cursor-pointer">
                <span className="text-3xl md:text-4xl font-bold text-brand-primary shrink-0 group-hover:scale-110 transition-transform origin-left">
                  {item.stat}
                </span>
                <div className="border-l border-[#070707]/10 pl-4">
                  <p className="text-sm text-[#070707]/50 font-medium leading-relaxed">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyInvest;
