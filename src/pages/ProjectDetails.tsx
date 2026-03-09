import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, ArrowLeft, Home, Calendar, Percent, CheckCircle } from 'lucide-react';
import proj1 from '../assets/project_interior_1.png';
import proj2 from '../assets/project_interior_2.png';
import proj3 from '../assets/project_interior_3.png';
import DefaultHeroThumb from '../assets/photorealistic-wooden-house-with-timber-structure.jpg';

// Reusing our global project array as the "database"
const allProjects = [
  {
    id: 1,
    name: 'GREEN COURT RESIDENCE',
    location: 'Maitama, Abuja',
    description: '4 Units of Ultra-luxury Homes featuring suspended swimming pools and architectural excellence in Abuja\'s most prestigious district.',
    fullDesc: 'Green Court Residence represents the pinnacle of luxury living in the heart of Maitama, Abuja. This exclusive development consists of 4 meticulously designed multi-story units. Each unit boasts premium imported finishings, state-of-the-art smart home integrations, and suspended infinity pools that offer breathtaking views of the capital city. Designed for the discerning few, it merges contemporary elegance with uncompromising comfort.',
    status: '35% Completed',
    value: 'N 3.9 Billion',
    type: 'Residential',
    image: proj1,
  },
  {
    id: 2,
    name: 'F.O TERRACES',
    location: 'Omorinre Johnson street, Lekki Phase 1',
    description: 'A landmark Mixed Use Development masterfully designed to blend premium residential comfort with unparalleled commercial convenience.',
    fullDesc: 'F.O Terraces is an ambitious mixed-use development situated in the strategic corridor of Lekki Phase 1. It offers elegantly styled residential apartments sitting atop premium commercial and retail spaces. This integration aims to create a self-sustaining ecosystem for residents to live, work, and play seamlessly within Lagos\'s fastest-growing island district.',
    status: '5% Completed',
    value: 'N 990 Million',
    type: 'Mixed-Use',
    image: proj2,
  },
  {
    id: 3,
    name: 'PANACHE TERRACES',
    location: 'Sinari Daranijo Street, Victoria Island',
    description: '6 Units of stylish Terrace duplexes. Contemporary architectural masterpieces in the heart of Lagos\'s premier business district.',
    fullDesc: 'Located in the prime neighborhood of Victoria Island, Panache Terraces features 6 opulent residential units. With a distinct focus on modern architecture, each terrace boasts floor-to-ceiling windows, private elevators, and expansive rooftop lounges. It\'s a sanctuary of tranquility amidst the bustling energy of Lagos\'s commercial hub.',
    status: '15% Completed',
    value: 'N 2.04 Billion',
    type: 'Residential',
    image: proj3,
  },
  {
    id: 7, 
    name: 'GREENSTONE HAVEN',
    location: 'Guzape, Abuja',
    description: '10 Units of Premium Terrace Houses offering breathtaking views and uncompromised luxury.',
    fullDesc: 'Set against the scenic hills of Guzape, Greenstone Haven is a premium residential community comprising 10 exquisite terrace houses. The development offers an unparalleled blend of nature and modern luxury, featuring lush green landscapes, cutting-edge security systems, and bespoke interiors tailored to the highest standards.',
    status: '80% Completed',
    value: 'N 1.50 Billion',
    type: 'Residential',
    image: DefaultHeroThumb,
  },
  {
    id: 4,
    name: 'BOURDILLON LUXURY FLATS',
    location: '18 Bourdillon Road, Ikoyi',
    description: '24 Units of 3-bedroom luxury flats offering the absolute zenith of high-rise living in Ikoyi.',
    fullDesc: 'A towering testament to Greenstone\'s legacy, Bourdillon Luxury Flats introduces 24 ultra-premium 3-bedroom units to Ikoyi\'s prestigious skyline. Residents enjoy five-star amenities including a concierge service, an elite fitness center, climate-controlled wine cellars, and panoramic views of the Lagos lagoon.',
    status: '10% Completed',
    value: 'N 4.08 Billion',
    type: 'Residential',
    image: proj1,
  },
  {
    id: 5,
    name: 'ELEGUSHI SEMI-DETACHED',
    location: 'Elegushi Chieftancy Layout, Lekki',
    description: '21 Units of 4-Bedroom Semi Detached homes in a highly sought-after secure neighborhood.',
    fullDesc: 'Aiming to redefine family living in Lekki, this expansive development features 21 stunning 4-bedroom semi-detached homes. It combines spacious, family-friendly layouts with contemporary aesthetics. The secure, gated community offers private gardens, recreational facilities, and easy access to top-tier schools and shopping centers.',
    status: '50% Completed',
    value: 'N 3.15 Billion',
    type: 'Residential',
    image: proj2,
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // In a real app we'd fetch from an API. Here we just find from our array.
    const numericId = parseInt(id, 10);
    const foundProject = allProjects.find(p => p.id === numericId);
    setProject(foundProject);
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  if (!project) {
    return (
      <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/projects" className="text-brand-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  const isCompleted = project.status.toLowerCase().includes('completed') && parseInt(project.status) === 100;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      <Navbar />
      
      {/* Hero Image Header */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <img 
          src={project.image} 
          alt={project.name} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full z-10">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1600px] pb-12">
            <Link to="/projects" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6">
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
               <span className="text-[10px] tracking-widest text-black bg-brand-primary uppercase font-bold px-3 py-1.5 rounded-full">
                 {project.type}
               </span>
               <span className={`text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full border ${isCompleted ? 'border-green-500 text-green-400' : 'border-brand-primary/30 text-brand-primary/80'}`}>
                 {project.status}
               </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 drop-shadow-xl">{project.name}</h1>
            <div className="flex items-center gap-2 text-white/70 text-sm md:text-base font-medium">
               <MapPin size={18} className="text-brand-primary" /> {project.location}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-6 md:px-12 lg:px-24 max-w-[1600px] py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl md:text-3xl font-light mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-brand-primary"></span>
              Project <span className="font-bold text-brand-primary">Overview</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="w-full h-px bg-white/10 my-10"></div>
            <h3 className="text-xl font-bold mb-6">Detailed Description</h3>
            <p className="text-base text-white/60 leading-loose">
              {project.fullDesc}
            </p>
            
            {/* Image Gallery (Placeholder for future) */}
            <div className="mt-16">
               <h3 className="text-xl font-bold mb-6">Gallery</h3>
               <div className="grid grid-cols-2 gap-4">
                 <img src={project.image} className="w-full h-48 object-cover rounded-2xl border border-white/5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" alt="Gallery 1"/>
                 <img src={DefaultHeroThumb} className="w-full h-48 object-cover rounded-2xl border border-white/5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" alt="Gallery 2"/>
               </div>
            </div>
          </div>

          {/* Right Column: Key Facts Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sticky top-32">
              <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-brand-primary">Key Facts</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-white/50">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Location</span>
                    <span className="text-sm font-medium text-white">{project.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-white/50">
                    <Home size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Development Type</span>
                    <span className="text-sm font-medium text-white">{project.type}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-white/50">
                    {isCompleted ? <CheckCircle size={18} className="text-green-500" /> : <Percent size={18} />}
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Status</span>
                    <span className="text-sm font-medium text-white">{project.status}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-brand-primary/60 uppercase tracking-widest font-bold mb-1">Estimated Value</span>
                    <span className="text-lg font-bold text-brand-primary">{project.value}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <Link to="/contact" className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-4 rounded-full hover:bg-brand-primary transition-colors flex items-center justify-center">
                  Enquire About Development
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
