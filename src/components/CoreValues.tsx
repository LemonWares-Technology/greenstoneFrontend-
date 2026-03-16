import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Handshake, Award, Users, Lightbulb, Crown } from 'lucide-react';

const values = [
  {
    id: 1,
    num: '01',
    icon: Shield,
    title: 'Integrity',
    subtitle: 'Ethical Behaviour',
    description:
      'We embrace the highest standard of ethical behaviour and transparency in every aspect of our business to yield a company that is trusted by its clients and stakeholders.',
  },
  {
    id: 2,
    num: '02',
    icon: Handshake,
    title: 'Partnership',
    subtitle: 'Building Together',
    description:
      'Our success and delivery of quality programs and services are largely dependent on partnerships that we create with all of our internal and external stakeholders.',
  },
  {
    id: 3,
    num: '03',
    icon: Award,
    title: 'Excellence',
    subtitle: 'Flawless Execution',
    description:
      'Our commitment to professional excellence ensures that our clients receive the highest quality services. We aspire to provide flawless execution and delivery of our products.',
  },
  {
    id: 4,
    num: '04',
    icon: Users,
    title: 'Teamwork',
    subtitle: 'Optimum Solutions',
    description:
      'Our culture of teamwork allows us to combine the quality and expertise of our professional staff to deliver optimum solutions to our clients.',
  },
  {
    id: 5,
    num: '05',
    icon: Lightbulb,
    title: 'Innovation',
    subtitle: 'Creativity & Ingenuity',
    description:
      "We thrive on creativity and ingenuity. In today's fast-paced technological climate, innovative ideas and processes are essential to our continued success and growth.",
  },
  {
    id: 6,
    num: '06',
    icon: Crown,
    title: 'Leadership',
    subtitle: 'In Every Employee',
    description:
      'The spirit of leadership is instilled in every employee. We lead the market with visionary developments that redefine luxury living.',
  },
];

const CoreValues = () => {
  return (
    <section
      id="core-values"
      className="relative w-full bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* ===== Header ===== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
                Core Values
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              The Greenstone <span className="font-bold text-brand-primary">Standard</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#070707]/70 font-medium max-w-md">
              Six principles that define every decision we make and every brick we lay.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-3 self-start md:self-auto bg-[#070707] text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-brand-primary group"
          >
            Learn More
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ===== Values grid — 3x2 ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Link
                key={value.id}
                to={`/core-values/${value.id}`}
                className="group relative rounded-2xl p-7 md:p-8 flex flex-col bg-[#fafafa] border border-[#070707]/5 hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-500 min-h-[280px]"
              >
                {/* Ghost number */}
                <span
                  className="absolute top-5 right-6 text-[4.5rem] font-black leading-none text-[#070707]/3 select-none pointer-events-none"
                  aria-hidden
                >
                  {value.num}
                </span>

                {/* Top: icon + label */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/8 flex items-center justify-center group-hover:bg-brand-primary/15 transition-colors duration-300">
                    <Icon
                      size={18}
                      className="text-brand-primary"
                    />
                  </div>
                  <span className="text-xs tracking-[0.3em] uppercase font-bold text-brand-primary">
                    {value.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#070707] mb-3 group-hover:text-brand-primary transition-colors duration-300 relative z-10">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-base text-[#070707]/70 leading-relaxed font-medium relative z-10 flex-1">
                  {value.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 flex items-center justify-between relative z-10">
                  <span className="text-sm tracking-widest uppercase text-[#070707]/60 font-bold">
                    Value {value.num}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#070707]/4 flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-300">
                    <ArrowRight
                      size={13}
                      className="text-[#070707]/50 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CoreValues;
