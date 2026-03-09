import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BedDouble, Layers, Maximize } from 'lucide-react';
import proj1 from '../assets/project_interior_1.png';
import proj2 from '../assets/project_interior_2.png';
import proj3 from '../assets/project_interior_3.png';

const projects = [
  {
    id: 1,
    name: 'GREENCOURT MAITAMA',
    image: proj1,
    rooms: 5,
    floors: 3,
    area: 'Luxury',
    price: '$3.9B Est.',
    pricePerSqm: 'Abuja',
    description: '5 Units of 4-Bed Luxury Duplexes with suspended swimming pool in the prestigious Maitama district, Abuja. Setting a new standard for opulent living in the capital.',
  },
  {
    id: 2,
    name: 'F.O TERRACES',
    image: proj2,
    rooms: 4,
    floors: 2,
    area: 'Mixed-use',
    price: '$990M Est.',
    pricePerSqm: 'Lekki 1',
    description: 'A landmark mixed-use development at Lekki Phase 1, Lagos State. Masterfully designed to blend premium residential comfort with unparalleled commercial convenience.',
  },
  {
    id: 3,
    name: 'PANACHE TERRACES',
    image: proj3,
    rooms: 4,
    floors: 2,
    area: 'Semi-Detached',
    price: '$2.04B Est.',
    pricePerSqm: 'Victoria Island',
    description: '6 units of exquisite 4-bedroom semi-detached duplexes at Sinari Daranijo, Victoria Island. Contemporary architectural masterpieces in the heart of Lagos\'s premier business district.',
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeProject = projects[activeIndex];
  const otherProjects = projects.filter((_, i) => i !== activeIndex);

  return (
    <section id="projects" className="relative w-full bg-[#0a0a0a] text-white py-24 md:py-32 font-sans overflow-hidden">
      
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-px h-full bg-white/10 absolute left-1/4"></div>
        <div className="w-px h-full bg-white/10 absolute left-1/2"></div>
        <div className="w-px h-full bg-white/10 absolute left-3/4"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-[1600px]">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-bold">Our Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1]">
              Our <span className="font-bold text-brand-primary">Signature</span><br/>
              Projects
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <p className="text-[10px] tracking-wider text-white/30 uppercase max-w-[200px] md:text-right leading-relaxed font-medium hidden md:block">
              Explore our portfolio of luxury developments across Lagos.
            </p>
            <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-[0.2em] hover:text-white transition-colors group">
               View All Projects <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Featured Project — Large Card */}
        <div 
          className="w-full rounded-3xl overflow-hidden mb-6 relative group cursor-pointer border border-white/5 hover:border-brand-primary/30 transition-all duration-700"
          onClick={() => {}}
          key={activeProject.id}
        >
          {/* Image */}
          <div className="w-full h-[350px] md:h-[500px] relative overflow-hidden">
            <img 
              src={activeProject.image} 
              alt={activeProject.name}
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent"></div>
            
            {/* Glowing orb accent */}
            <div className="absolute top-6 right-8 z-20">
              <span className="relative flex items-center justify-center w-8 h-8">
                <span className="absolute inset-0 bg-brand-primary blur-[12px] opacity-60 rounded-full"></span>
                <span className="relative w-3 h-3 bg-brand-primary rounded-full shadow-[0_0_15px_var(--color-brand-primary)]"></span>
              </span>
            </div>
          </div>

          {/* Content overlay */}
          <div className="p-8 md:p-10 -mt-24 relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{activeProject.name}</h3>

            {/* Specs row */}
            <div className="flex items-center gap-6 mb-5">
              <span className="flex items-center gap-2 text-xs text-white/50 font-medium">
                <BedDouble size={14} className="text-brand-primary" /> Room {activeProject.rooms}
              </span>
              <span className="flex items-center gap-2 text-xs text-white/50 font-medium">
                <Layers size={14} className="text-brand-primary" /> Floor {activeProject.floors}
              </span>
              <span className="flex items-center gap-2 text-xs text-white/50 font-medium">
                <Maximize size={14} className="text-brand-primary" /> {activeProject.area}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 mb-5"></div>

            <p className="text-sm text-white/40 leading-relaxed max-w-2xl mb-6 font-medium">
              {activeProject.description}
            </p>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-3xl md:text-4xl font-bold text-white">{activeProject.price}</span>
                <span className="text-xs text-white/30 ml-3 font-medium">{activeProject.pricePerSqm}</span>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-white border border-white/20 px-6 py-3 rounded-full hover:bg-brand-primary hover:border-brand-primary hover:text-black transition-all duration-300 group/btn">
                Explore This Home
                <ArrowUpRight size={14} className="group-hover/btn:rotate-45 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Other Projects — Two Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-all duration-500 cursor-pointer group"
              onClick={() => setActiveIndex(projects.findIndex(p => p.id === project.id))}
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image */}
                <div className="w-full sm:w-[45%] h-[200px] sm:h-auto overflow-hidden shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                  />
                </div>
                {/* Info */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-brand-primary transition-colors">{project.name}</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
                        <BedDouble size={12} className="text-brand-primary" /> Room {project.rooms}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
                        <Layers size={12} className="text-brand-primary" /> Floor {project.floors}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
                        <Maximize size={12} className="text-brand-primary" /> {project.area}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-xl md:text-2xl font-bold text-white">{project.price}</span>
                        <span className="text-[10px] text-white/20 ml-2 font-medium">{project.pricePerSqm}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold text-white/50 mt-4 hover:text-brand-primary transition-colors group/btn">
                      Explore This Home
                      <ArrowUpRight size={12} className="group-hover/btn:rotate-45 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {projects.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === activeIndex 
                  ? 'w-10 bg-brand-primary shadow-[0_0_10px_var(--color-brand-primary)]' 
                  : 'w-4 bg-white/15 hover:bg-white/30'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
