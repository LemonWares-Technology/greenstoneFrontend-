import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Heart, ArrowRight } from 'lucide-react';
import heroThumb from '../assets/intro-colonial-villa.jpg';
import aboutImg from '../assets/about-grand-mansion.jpg';

const AboutVision = () => {
  return (
    <section id="about" className="relative w-full bg-[#fafafa] text-[#070707] font-sans overflow-hidden">

      {/* ===== TOP HALF: Our History — cinematic image + overlaid text ===== */}
      <div className="relative">
        {/* Background image — muted, atmospheric */}
        <div className="absolute inset-0 z-0">
          <img
            src={aboutImg}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#070707]/75" />
          <div className="absolute inset-0 bg-linear-to-b from-[#070707]/40 via-transparent to-[#070707]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-24 md:pb-36">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
            <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
              Our Story
            </span>
            <span className="w-px h-3 bg-white/15 mx-1" aria-hidden />
            <span className="text-xs tracking-widest uppercase font-medium text-white/60">
              Est. 2002
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end">
            {/* Left: headline */}
            <div className="lg:col-span-6 xl:col-span-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white mb-4">
                Two Decades of <span className="font-bold text-brand-primary">Trust</span>
              </h2>
              <p className="text-base md:text-lg text-white/70 font-medium max-w-md mb-6">
                Building long-term relationships through integrity, performance, and partnership since 2002.
              </p>
              <div className="w-20 h-14 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={heroThumb}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: History blurb + CTA */}
            <div className="lg:col-span-6 xl:col-span-7">
              <p className="text-base text-white/80 leading-relaxed font-medium max-w-xl mb-6">
                Greenstone Developments Limited was incorporated in 2002 to develop well designed,
                competitively priced real estate in Nigeria. Today we're a pre-eminent property company
                with a balanced portfolio of residential, commercial and mixed-use developments — from
                Lekki to Abuja — and a growing reputation in property management built on integrity
                and professionalism.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-white font-bold text-sm tracking-wide group"
              >
                <span className="border-b border-white/30 group-hover:border-brand-primary pb-0.5 transition-colors">
                  Read the full story
                </span>
                <div className="w-7 h-7 rounded-full bg-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-300">
                  <ArrowUpRight size={13} className="text-brand-primary group-hover:text-white transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM HALF: Vision & Mission — light bg, structured cards ===== */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 -mt-12 md:-mt-16 pb-20 md:pb-28">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl shadow-[#070707]/10 border border-[#070707]/5">

          {/* Vision Card */}
          <div className="bg-white p-8 md:p-10 lg:p-12 flex flex-col relative group">
            {/* Number accent */}
            <span className="absolute top-6 right-6 md:top-8 md:right-8 text-[5rem] md:text-[6rem] font-black leading-none text-[#070707]/3 select-none pointer-events-none" aria-hidden>
              01
            </span>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center" aria-hidden>
                <Compass size={16} className="text-brand-primary" />
              </div>
              <span className="text-xs tracking-[0.3em] uppercase font-bold text-brand-primary">
                Vision
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#070707] mb-4 leading-snug">
              Leading Africa's property
              <br className="hidden lg:block" /> development industry
            </h3>

            <p className="text-base text-[#070707]/70 leading-relaxed font-medium flex-1">
              To be a recognised leader in the Property Development/Management industry in Nigeria and then Africa;
              while maintaining our authentic level of services founded on basic core values of integrity and
              partnership as enshrined in our Corporate Objectives.
            </p>

            {/* Bottom accent */}
            <div className="mt-8 flex items-center gap-2">
              <span className="w-6 h-px bg-brand-primary" aria-hidden />
              <span className="text-xs tracking-widest uppercase text-[#070707]/50 font-bold">Integrity · Partnership</span>
            </div>
          </div>

          {/* Core Values Card — dark contrast */}
          <div className="bg-[#070707] text-white p-8 md:p-10 lg:p-12 flex flex-col relative group">
            <span className="absolute top-6 right-6 md:top-8 md:right-8 text-[5rem] md:text-[6rem] font-black leading-none text-white/3 select-none pointer-events-none" aria-hidden>
              02
            </span>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-brand-primary/15 flex items-center justify-center" aria-hidden>
                <Heart size={16} className="text-brand-primary" />
              </div>
              <span className="text-xs tracking-[0.3em] uppercase font-bold text-brand-primary">
                Core Values
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4 leading-snug">
              Turning ideas into
              <br className="hidden lg:block" /> reality since day one
            </h3>

            <p className="text-base text-white/70 leading-relaxed font-medium flex-1">
              We turn ideas into reality with a tradition of building long-term relationships based on integrity,
              partnership, performance, value and client's satisfaction through delivering exceptional and
              innovative client services.
            </p>

            {/* CTA to about */}
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-sm font-bold text-white/80 hover:text-brand-primary transition-colors group/link"
              >
                <span>Learn more about us</span>
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutVision;
