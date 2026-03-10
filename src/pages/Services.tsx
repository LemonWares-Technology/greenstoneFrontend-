import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import { Building2, KeyRound, ShieldCheck, Landmark, Leaf } from 'lucide-react';
import proj1 from '../assets/project_interior_1.png';
import proj2 from '../assets/project_interior_2.png';
import proj3 from '../assets/project_interior_3.png';
import thumb1 from '../assets/photorealistic-wooden-house-with-timber-structure.webp';

const servicesList = [
  {
    icon: Building2,
    title: 'Property Acquisition & Development',
    desc: 'We identify prime locations and develop well-designed, competitively priced real estate. Our extensive portfolio encompasses residential, commercial, and mixed-use properties tailored to elevate lifestyles and business operations alike.',
    image: proj1
  },
  {
    icon: ShieldCheck,
    title: 'Property Management',
    desc: 'Serving as residential and industrial management specialists, we deliver a comprehensive service that provides uncompromised integrity, unparalleled professionalism, and absolute peace of mind.',
    image: proj2
  },
  {
    icon: KeyRound,
    title: 'Real Estate Brokerage',
    desc: 'Expert guidance in navigating the complex real estate market. We leverage our deep industry knowledge to ensure our clients formulate and execute the most profitable and secure property transactions.',
    image: proj3
  },
  {
    icon: Landmark,
    title: 'Real Estate Loan Syndication',
    desc: 'We improve the lot of individuals and corporate clients by expertly structuring, negotiating, and securing tailored investment finance solutions to bring ambitious real estate visions to life.',
    image: thumb1
  },
  {
    icon: Leaf,
    title: 'Environmental Management',
    desc: 'Operating in an ethical and socially conscious manner, we ensure all our developments harmonize with their surroundings, promoting sustainable practices and long-term environmental viability.',
    image: proj1 // Reusing an existing valid image since servicesBg is gone
  }
];

const Services = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex-grow pt-24 pb-32 px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px] flex flex-col">
        
        <div className="flex flex-col md:items-center text-center mb-16 lg:mb-24">
          <span className="text-[10px] tracking-[0.3em] text-brand-primary uppercase font-bold flex items-center justify-center gap-3 mb-6 bg-brand-primary/10 px-5 py-2.5 rounded-full border border-brand-primary/20 mx-auto w-max">
            [ WHAT WE OFFER ]
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
            Core <span className="font-bold text-brand-primary">Competencies</span>
          </h1>
          <p className="mt-8 text-white/60 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
            Greenstone Developments Ltd aims to make a significant contribution to the future of the Real Estate Industry. We have an integrated team approach to development to ensure that our projects fully address all design and lifestyle parameters from the initial planning stages through to conclusion.
          </p>
        </div>

        {/* Services Staggered Layout (White Background Section) */}
        <div className="bg-white text-black py-32 px-6 md:px-12 lg:px-24 mx-[-1.5rem] md:mx-[-3rem] lg:mx-[-6rem]">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-start lg:min-h-[1200px]">
            {servicesList.map((service, idx) => (
              <div 
                key={idx} 
                className={`flex-1 flex flex-col w-full group ${
                  idx === 1 ? 'lg:mt-32' : 
                  idx === 2 ? 'lg:mt-64' : 
                  idx === 3 ? 'lg:mt-96' : 
                  idx === 4 ? 'lg:mt-[32rem]' : 
                  ''
                }`}
              >
                {/* Header/Text Section */}
                <div className="mb-6 lg:mb-8 pr-4">
                  
                  {/* Icon, Number, and Horizontal Line Container */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 rounded-full border border-black/10 flex items-center justify-center bg-black/5 group-hover:bg-brand-primary transition-all duration-300 relative z-10">
                       <service.icon size={20} className="text-black" />
                    </div>
                    <span className="text-2xl font-bold text-black/20 group-hover:text-brand-primary transition-colors duration-300">
                      0{idx + 1}
                    </span>
                    <div className="flex-grow h-px bg-black/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-brand-primary w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                    </div>
                  </div>

                  <h3 className="font-bold text-2xl md:text-3xl text-black tracking-tight mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-black/60 font-medium leading-relaxed text-sm md:text-base">
                    {service.desc}
                  </p>
                </div>

                {/* Image Section */}
                <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 relative shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:-translate-y-2">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Gen Sections */}
        <Faq />
        <Contact />

      </div>
      <Footer />
    </div>
  );
};

export default Services;
