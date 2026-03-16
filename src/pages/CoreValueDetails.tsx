import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Shield, Handshake, Award, Users, Lightbulb, Crown } from 'lucide-react';
import aboutBg from '../assets/about-grand-mansion.jpg';

const valuesData = [
  {
    id: 1,
    num: '01',
    icon: Shield,
    title: 'INTEGRITY',
    subtitle: 'Ethical Behaviour',
    description: 'We embrace the highest standard of ethical behaviour and transparency in every aspect of our business to yield a company that is trusted by its clients and stakeholders.',
    extendedText: 'Integrity forms the bedrock of every decision we make at Greenstone Developments. We believe that true luxury is not just in the materials we use, but in the honesty and transparency we provide to our clients, partners, and stakeholders. From fair pricing models to transparent project timelines, our ethical frameworks ensure that every transaction is conducted with the utmost respect for all parties involved. This unwavering commitment to ethical behaviour has been the cornerstone of our pristine reputation since our inception in 2002.'
  },
  {
    id: 2,
    num: '02',
    icon: Handshake,
    title: 'PARTNERSHIP',
    subtitle: 'Building Together',
    description: 'Our success and delivery of quality programs and services are largely dependent on partnerships that we create with all of our internal and external stakeholders.',
    extendedText: 'At Greenstone, we recognize that monument-building is never a solitary endeavor. It takes a synchronized symphony of investors, architects, engineers, local communities, and government bodies to bring our luxurious visions to life. We actively cultivate symbiotic relationships, ensuring that our supply chains are robust, our local community impacts are positive, and our investors see reliable returns. We do not just build properties; we build enduring coalitions that drive mutual growth across the Nigerian real estate sector.'
  },
  {
    id: 3,
    num: '03',
    icon: Award,
    title: 'EXCELLENCE',
    subtitle: 'Flawless Execution',
    description: 'Our commitment to professional excellence ensures that our clients receive the highest quality services. We aspire to provide flawless execution and delivery of our products.',
    extendedText: 'Excellence is not an aspiration; it is our baseline standard. From the initial soil testing to the final handover of the keys, Greenstone enforces rigorous Quality Assurance and Quality Control protocols. We source premium materials, engage top-tier international and local engineering talent, and utilize advanced project management methodologies to eliminate errors. Our pursuit of flawless execution means our clients move into homes that are structurally perfect, aesthetically stunning, and built to last for generations.'
  },
  {
    id: 4,
    num: '04',
    icon: Users,
    title: 'TEAMWORK',
    subtitle: 'Optimum Solutions',
    description: 'Our culture of teamwork allows us to combine the quality and expertise of our professional staff to deliver optimum solutions to our clients.',
    extendedText: 'The complexity of modern luxury development demands cross-disciplinary collaboration. Our organizational structure breaks down silos, encouraging daily interaction between our structural engineers, interior designers, financial analysts, and legal consultants. This collaborative culture ensures that potential challenges are preemptively solved through diverse perspectives, leading to holistic, optimized solutions. At Greenstone, teamwork is the invisible mortar that holds our monumental structures together.'
  },
  {
    id: 5,
    num: '05',
    icon: Lightbulb,
    title: 'INNOVATION',
    subtitle: 'Creativity & Ingenuity',
    description: 'We thrive on creativity and ingenuity. In today\'s fast-paced technological climate, innovative ideas and processes are essential to our continued success and growth.',
    extendedText: 'We refuse to rely on the methodologies of the past. Greenstone is at the forefront of adopting modern construction technologies, smart-home integrations, and sustainable architectural designs. We encourage our teams to challenge conventions, seeking out ingenious ways to reduce construction timelines, minimize environmental impacts, and maximize living comfort. Innovation is the lens through which we view every new project, ensuring we remain the avant-garde of Nigerian real estate.'
  },
  {
    id: 6,
    num: '06',
    icon: Crown,
    title: 'LEADERSHIP',
    subtitle: 'In Every Employee',
    description: 'The spirit of leadership is instilled in every employee. We lead the market with visionary developments that redefine luxury living.',
    extendedText: 'Leadership at Greenstone is not confined to the executive boardroom; it is an expectation of every team member on site. We empower our staff to take ownership of their respective domains, fostering a culture of profound accountability and proactive problem-solving. Externally, this translates into our position as market leaders—pioneering developments in emerging luxury corridors, setting new standards for architectural grandeur, and defining what it means to live luxuriously in West Africa.'
  },
];

const CoreValueDetails = () => {
  const { id } = useParams();
  const [valueItem, setValueItem] = useState(null);

  useEffect(() => {
    const numericId = parseInt(id, 10);
    const foundValue = valuesData.find(v => v.id === numericId);
    setValueItem(foundValue);
    window.scrollTo(0, 0);
  }, [id]);

  if (!valueItem) {
    return (
      <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Core Value Not Found</h1>
        <Link to="/about" className="text-brand-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to About Us
        </Link>
      </div>
    );
  }

  const Icon = valueItem.icon;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      
      {/* Header Section — Navbar overlays */}
      <div className="relative w-full pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-10 blur-2xl">
          <img src={aboutBg} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-[#050505]/90 to-[#050505]"></div>
        <div className="relative z-10">
          <Navbar />
        </div>
        
        <div className="container mx-auto max-w-[1000px] relative z-10 flex flex-col md:flex-row items-center md:items-end gap-10 px-6 md:px-12 lg:px-24 pt-8">
          
          <div className="flex-1 text-center md:text-left">
            <Link to="/about" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8">
              <ArrowLeft size={14} /> Back to Core Values
            </Link>
            
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                <Icon size={32} className="text-brand-primary" />
              </div>
              <span className="text-lg font-mono text-brand-primary font-bold">
                /{valueItem.num}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-white uppercase">{valueItem.title}</h1>
            <p className="text-brand-primary font-semibold tracking-widest uppercase text-sm md:text-base">
              {valueItem.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Extended Content Section */}
      <div className="grow container mx-auto px-6 md:px-12 lg:px-24 max-w-[1000px] py-16">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

          <h2 className="text-xl md:text-2xl font-light mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-brand-primary"></span>
            The Greenstone <span className="font-bold text-brand-primary">Standard</span>
          </h2>
          
          <p className="text-xl text-white/90 font-medium leading-relaxed mb-8">
            {valueItem.description}
          </p>
          
          <div className="h-px w-full bg-white/10 mb-8"></div>

          <p className="text-base md:text-lg text-white/60 font-medium leading-relaxed md:leading-loose">
            {valueItem.extendedText}
          </p>
        </div>

        {/* Quick link to other values */}
        <div className="mt-16 text-center">
            <p className="text-white/60 text-base mb-6">Explore our other core principles</p>
            <div className="flex flex-wrap justify-center gap-3">
              {valuesData.filter(v => v.id !== valueItem.id).map(v => (
                <Link key={v.id} to={`/core-values/${v.id}`} className="flex items-center gap-2 bg-[#111] border border-white/5 hover:border-brand-primary/30 px-4 py-2 rounded-full transition-colors text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white">
                  {v.title}
                </Link>
              ))}
            </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default CoreValueDetails;
