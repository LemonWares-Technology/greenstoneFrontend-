import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import { Building2, KeyRound, ShieldCheck, Landmark, Leaf, ArrowRight } from 'lucide-react';
import { serviceService } from '../services/services';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Service } from '../types';
import heroBg from '../assets/hero-services.jpg';
import proj1 from '../assets/service-modern-apartments.jpg';
import proj2 from '../assets/service-apartment-block.jpg';
import proj3 from '../assets/service-lagos-home.jpg';
import thumb1 from '../assets/service-white-contemporary.jpg';

const IconMap: Record<string, React.ElementType> = {
  Building2, ShieldCheck, KeyRound, Landmark, Leaf,
};

const fallbackServices = [
  {
    id: 'f1', icon: 'Building2', title: 'Property Acquisition & Development',
    description: 'We identify prime locations and develop well-designed, competitively priced real estate. Our extensive portfolio encompasses residential, commercial, and mixed-use properties tailored to elevate lifestyles and business operations alike.',
    highlights: ['Residential & commercial estates', 'Mixed-use developments', 'Land banking & acquisition'],
    image: proj1,
  },
  {
    id: 'f2', icon: 'ShieldCheck', title: 'Property Management',
    description: 'Serving as residential and industrial management specialists, we deliver a comprehensive service that provides uncompromised integrity, unparalleled professionalism, and absolute peace of mind.',
    highlights: ['Facility maintenance & upkeep', 'Tenant relationship management', 'Financial reporting & compliance'],
    image: proj2,
  },
  {
    id: 'f3', icon: 'KeyRound', title: 'Real Estate Brokerage',
    description: 'Expert guidance in navigating the complex real estate market. We leverage our deep industry knowledge to ensure our clients formulate and execute the most profitable and secure property transactions.',
    highlights: ['Market analysis & valuation', 'Transaction advisory', 'Portfolio diversification'],
    image: proj3,
  },
  {
    id: 'f4', icon: 'Landmark', title: 'Real Estate Loan Syndication',
    description: 'We improve the lot of individuals and corporate clients by expertly structuring, negotiating, and securing tailored investment finance solutions to bring ambitious real estate visions to life.',
    highlights: ['Structured financing', 'Joint ventures & partnerships', 'Investment fund management'],
    image: thumb1,
  },
  {
    id: 'f5', icon: 'Leaf', title: 'Environmental Management',
    description: 'Operating in an ethical and socially conscious manner, we ensure all our developments harmonize with their surroundings, promoting sustainable practices and long-term environmental viability.',
    highlights: ['Sustainable building practices', 'Environmental impact assessments', 'Green design integration'],
    image: proj1,
  },
];

const fallbackImages = [proj1, proj2, proj3, thumb1, proj1];

const Services = () => {
  const [services, setServices] = useState<(Service & { image?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceService.getAll()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const withImages = res.data.map((s, i) => ({
            ...s,
            image: s.image || fallbackImages[i % fallbackImages.length],
          }));
          setServices(withImages);
        } else {
          setServices(fallbackServices as any);
        }
      })
      .catch(() => setServices(fallbackServices as any))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">

      {/* Hero — Navbar overlays background image */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Greenstone Services" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40"></div>
        </div>
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="relative z-10 pb-16 md:pb-20 pt-8 md:pt-12 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]" />
                <span className="text-xs tracking-[0.25em] text-brand-primary uppercase font-bold">Our Services</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 leading-[1.08]">
                Integrated Solutions for<br />
                <span className="font-bold text-brand-primary">Real Estate Excellence</span>
              </h1>
              <p className="text-base md:text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
                From acquisition through development and long-term management, Greenstone provides
                end-to-end expertise that ensures every project fully addresses design, lifestyle,
                and investment parameters.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 border-t border-white/10 pt-12">
              {[
                { num: '20+', label: 'Years of Experience' },
                { num: '200+', label: 'Homes Delivered' },
                { num: String(services.length || 5), label: 'Core Services' },
                { num: '100%', label: 'Legal Coverage' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">{stat.num}</div>
                  <div className="text-sm text-white/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services — alternating rows */}
      <section className="pb-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" label="Loading services..." />
          </div>
        ) : (
          services.map((service, idx) => {
            const isReversed = idx % 2 === 1;
            const Icon = IconMap[service.icon] || Building2;

            return (
              <div
                key={service.id}
                className={`border-t border-white/5 ${idx === services.length - 1 ? 'border-b' : ''}`}
              >
                <div className="container mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center py-16 md:py-24`}
                    style={isReversed ? { direction: 'rtl' } : undefined}
                  >
                    {/* Image */}
                    <div className="relative group" style={isReversed ? { direction: 'ltr' } : undefined}>
                      <div className="aspect-4/3 rounded-3xl overflow-hidden bg-white/5">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-brand-primary/20 rounded-2xl -z-10" />
                    </div>

                    {/* Content */}
                    <div style={isReversed ? { direction: 'ltr' } : undefined}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                          <Icon size={24} className="text-brand-primary" />
                        </div>
                        <span className="text-sm font-bold text-white/30 font-mono tracking-wider">
                          0{idx + 1}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
                        {service.title}
                      </h2>

                      <p className="text-base md:text-lg text-white/60 font-medium leading-relaxed mb-8">
                        {service.description}
                      </p>

                      {service.highlights && service.highlights.length > 0 && (
                        <ul className="space-y-3 mb-8">
                          {service.highlights.map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <ArrowRight size={14} className="text-brand-primary shrink-0" />
                              <span className="text-sm md:text-base text-white/70 font-medium">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-white transition-colors group/link"
                      >
                        Get Started
                        <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Process strip */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.25em] text-brand-primary uppercase font-bold mb-4 block">How We Work</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
              Our <span className="font-bold">Process</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'We listen to your goals and assess feasibility with expert insight.' },
              { step: '02', title: 'Planning', desc: 'Detailed project scoping, budgeting, and timeline establishment.' },
              { step: '03', title: 'Execution', desc: 'Hands-on development with rigorous quality control at every stage.' },
              { step: '04', title: 'Delivery', desc: 'On-time handover with full documentation and aftercare support.' },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-white/3 border border-white/5 rounded-3xl p-8 hover:border-brand-primary/30 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="text-5xl font-bold text-brand-primary/15 mb-6 group-hover:text-brand-primary/30 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-white/50 font-medium leading-relaxed">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-brand-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Contact */}
      <div className="px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px]">
        <Faq />
        <Contact />
      </div>

      <Footer />
    </div>
  );
};

export default Services;
