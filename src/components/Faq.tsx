import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What types of properties does Greenstone Developments offer?',
    answer: 'We offer a range of luxury residential properties including detached homes, semi-detached duplexes, penthouses, and smart apartments. Every unit is designed with premium finishes, modern layouts, and sustainable building practices.',
  },
  {
    question: 'Where are your developments located?',
    answer: 'Our projects are strategically positioned in Lagos\'s fastest-growing corridors — including Lekki, Ibeju-Lekki, and Epe. These locations benefit from rapid infrastructure development, proximity to the Lekki Free Trade Zone, and strong capital appreciation potential.',
  },
  {
    question: 'Can I buy off-plan? What are the benefits?',
    answer: 'Yes! Buying off-plan allows you to secure a property at a lower price before construction is completed. Benefits include flexible payment plans, potential capital appreciation during the build phase, and the ability to customise finishes to your preference.',
  },
  {
    question: 'What payment plans do you offer?',
    answer: 'We offer structured instalment plans with 0% interest, spread across 6 to 18 months depending on the project phase. Corporate and institutional investment packages are also available. Our team will work with you to find a plan that fits your budget.',
  },
  {
    question: 'How do you ensure the security of my investment?',
    answer: 'Every Greenstone property comes with verified land titles, government-approved building permits, and full legal documentation. We provide complete transparency at every stage — from land acquisition to key handover — so your investment is protected.',
  },
  {
    question: 'What is the typical construction timeline?',
    answer: 'Our standard construction timeline is 6 to 12 months depending on the project scope. We maintain rigorous quality supervision throughout and provide regular progress updates to all buyers and investors.',
  },
  {
    question: 'Do you offer property management services after purchase?',
    answer: 'Yes. Greenstone offers optional post-purchase property management including tenant sourcing, maintenance coordination, and rental income management — ideal for investors who want a hands-off experience.',
  },
  {
    question: 'How do I get started?',
    answer: 'Simply reach out via our contact form, email us at info@greenstonedev.com, or call (+234) 800 GREEN 01. Our team will schedule a consultation to understand your goals and walk you through available options.',
  },
];

const FaqItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div 
      className={`border-b border-[#070707]/10 transition-colors duration-300 ${isOpen ? 'border-brand-primary/30' : ''}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-7 text-left group cursor-pointer"
      >
        <h3 className={`text-base md:text-lg font-bold tracking-tight pr-8 transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-[#070707] group-hover:text-brand-primary'}`}>
          {faq.question}
        </h3>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-brand-primary text-white rotate-0' : 'bg-[#070707]/5 text-[#070707]/40 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-[300px] pb-6' : 'max-h-0'}`}>
        <p className="text-sm text-[#070707]/50 leading-relaxed font-medium max-w-2xl pl-0 md:pl-1">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative w-full bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
      
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-px h-full bg-slate-300 absolute left-1/4"></div>
        <div className="w-px h-full bg-slate-300 absolute left-1/2"></div>
        <div className="w-px h-full bg-slate-300 absolute left-3/4"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-[1600px]">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left — Sticky header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-bold">Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-6">
              Frequently<br/><span className="font-bold text-brand-primary">Asked</span>
            </h2>
            <p className="text-sm text-[#070707]/40 leading-relaxed font-medium max-w-sm">
              Everything you need to know about buying, investing, and building with Greenstone. Can't find your answer? Reach out to our team.
            </p>

            {/* Contact CTA */}
            <a href="#contact" className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-brand-primary border border-brand-primary/30 px-6 py-3 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300">
              Contact Us
            </a>
          </div>

          {/* Right — FAQ Accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-[#070707]/10">
              {faqs.map((faq, idx) => (
                <FaqItem
                  key={idx}
                  faq={faq}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Faq;
