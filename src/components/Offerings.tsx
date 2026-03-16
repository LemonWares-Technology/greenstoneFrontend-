import { Link } from 'react-router-dom';
import { ArrowRight, Building2, KeyRound, BarChart3, Landmark } from 'lucide-react';
import landscapeImg from '../assets/offering-grey-mansion.jpg';

const services = [
  {
    num: '01',
    icon: Building2,
    title: 'Property Acquisition & Development',
    desc: 'We develop well-designed, competitively priced real estate — residential, commercial, and mixed-use — across Nigeria\'s most sought-after locations.',
    locations: 'Lekki · Victoria Island · Ikoyi · Maitama',
  },
  {
    num: '02',
    icon: KeyRound,
    title: 'Property Management',
    desc: 'Residential and industrial management specialists delivering integrity, professionalism, and complete peace of mind to property owners.',
    locations: 'Lagos · Abuja · Nationwide',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Real Estate Brokerage',
    desc: 'Expert guidance through every stage of the transaction — helping clients identify, evaluate, and secure the most profitable property deals.',
    locations: 'All Major Markets',
  },
  {
    num: '04',
    icon: Landmark,
    title: 'Real Estate Loan Syndication',
    desc: 'Structuring and securing tailored investment finance solutions for individuals and corporate clients looking to grow their property portfolios.',
    locations: 'Institutional & Private',
  },
];

const Offerings = () => {
  return (
    <section id="offerings" className="relative w-full bg-[#fafafa] text-[#070707] font-sans overflow-hidden">

      {/* ===== Header with background image accent ===== */}
      <div className="relative overflow-hidden">
        {/* Subtle background image — atmospheric, not dominant */}
        <div className="absolute inset-0 z-0">
          <img
            src={landscapeImg}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#070707]/85" />
          <div className="absolute inset-0 bg-linear-to-b from-[#070707]/60 to-[#070707]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-32 md:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">

            {/* Left: headline */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-brand-primary" aria-hidden />
                <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
                  What We Offer
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white">
                Comprehensive Service <span className="font-bold text-brand-primary">Portfolio</span>
              </h2>
              <p className="mt-3 text-base md:text-lg text-white/70 font-medium max-w-md">
                From acquisition through financing, development, and management — the full lifecycle under one roof.
              </p>
            </div>

            {/* Right: CTA */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
              <Link
                to="/services"
                className="inline-flex items-center gap-3 self-start lg:self-auto bg-brand-primary text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] group"
              >
                Explore All Services
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Service cards — overlap into header ===== */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 -mt-16 md:-mt-20 pb-20 md:pb-28 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <div
              key={service.num}
              className={`group relative rounded-2xl p-7 md:p-9 flex flex-col transition-all duration-500 border overflow-hidden ${
                i === 0
                  ? 'bg-[#070707] text-white border-white/8 hover:border-brand-primary/40'
                  : 'bg-white text-[#070707] border-[#070707]/5 hover:border-brand-primary/30 shadow-lg shadow-[#070707]/5'
              }`}
            >
              {/* Ghost number */}
              <span
                className={`absolute top-4 right-5 text-[5rem] md:text-[6rem] font-black leading-none select-none pointer-events-none ${
                  i === 0 ? 'text-white/3' : 'text-[#070707]/3'
                }`}
                aria-hidden
              >
                {service.num}
              </span>

              {/* Icon + eyebrow */}
              <div className="flex items-center gap-3 mb-5 relative z-10">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    i === 0
                      ? 'bg-brand-primary/15 group-hover:bg-brand-primary/25'
                      : 'bg-[#070707]/4 group-hover:bg-brand-primary/10'
                  }`}
                >
                  <service.icon
                    size={18}
                    className={`transition-colors duration-300 ${
                      i === 0
                        ? 'text-brand-primary'
                        : 'text-[#070707]/60 group-hover:text-brand-primary'
                    }`}
                  />
                </div>
                <span
                  className={`text-xs tracking-[0.3em] uppercase font-bold ${
                    i === 0 ? 'text-brand-primary' : 'text-brand-primary'
                  }`}
                >
                  Service {service.num}
                </span>
              </div>

              {/* Title */}
              <h3
                className={`text-xl md:text-2xl font-bold tracking-tight mb-3 relative z-10 group-hover:text-brand-primary transition-colors duration-300 ${
                  i === 0 ? 'text-white' : 'text-[#070707]'
                }`}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className={`text-base leading-relaxed font-medium mb-6 relative z-10 max-w-md ${
                  i === 0 ? 'text-white/70' : 'text-[#070707]/70'
                }`}
              >
                {service.desc}
              </p>

              {/* Bottom: location tags */}
              <div className="mt-auto flex items-center gap-2 relative z-10">
                <span
                  className={`w-4 h-px ${i === 0 ? 'bg-brand-primary/40' : 'bg-[#070707]/15'}`}
                  aria-hidden
                />
                <span
                  className={`text-sm tracking-widest uppercase font-medium ${
                    i === 0 ? 'text-white/60' : 'text-[#070707]/60'
                  }`}
                >
                  {service.locations}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Offerings;
