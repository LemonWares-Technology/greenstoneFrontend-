import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BedDouble, Layers, MapPin, Tag } from 'lucide-react';
import proj1 from '../assets/project-luxury-apartments.jpg';
import proj2 from '../assets/project-classic-residence.jpg';
import proj3 from '../assets/project-duplex-terrace.jpg';

const projects = [
  {
    id: 1,
    name: 'F.O Terraces',
    image: proj2,
    rooms: 4,
    floors: 2,
    type: 'Mixed-use',
    price: '₦990M',
    location: 'Lekki Phase 1, Lagos',
    description:
      'A landmark mixed-use development masterfully designed to blend premium residential comfort with unparalleled commercial convenience.',
  },
  {
    id: 2,
    name: 'GreenCourt Maitama',
    image: proj1,
    rooms: 5,
    floors: 3,
    type: 'Luxury Duplex',
    price: '₦3.9B',
    location: 'Maitama, Abuja',
    description:
      '5 units of 4-bed luxury duplexes with a suspended swimming pool — setting a new standard for opulent living in the capital.',
  },
  {
    id: 3,
    name: 'Panache Terraces',
    image: proj3,
    rooms: 4,
    floors: 2,
    type: 'Semi-Detached',
    price: '₦2.04B',
    location: 'Victoria Island, Lagos',
    description:
      '6 units of exquisite 4-bedroom semi-detached duplexes — contemporary masterpieces in the heart of Lagos\'s premier business district.',
  },
];

const Projects = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="relative w-full bg-[#f5f5f0] text-[#070707] py-24 md:py-32 font-sans overflow-hidden">

      {/* Subtle warm texture */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-linear-to-b from-white via-transparent to-white opacity-60" aria-hidden />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* ===== Header ===== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
                Our Projects
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              Our Signature <span className="font-bold text-brand-primary">Projects</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#070707]/70 font-medium max-w-md">
              Explore our portfolio of luxury developments across Lagos and Abuja.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-3 self-start md:self-auto bg-[#070707] text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-brand-primary group"
          >
            View All Projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ===== Project cards — stacked full-width ===== */}
        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden border border-[#070707]/5 bg-white hover:shadow-2xl hover:shadow-[#070707]/8 transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[280px]">

                {/* Image */}
                <div className="lg:col-span-5 relative overflow-hidden h-[220px] sm:h-[280px] lg:h-auto">
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt=""
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-[2s] ease-out ${
                        hovered === i ? 'scale-105' : 'scale-100'
                      }`}
                    />
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#070707] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
                      <Tag size={10} />
                      {project.type}
                    </span>
                  </div>

                  {/* Number accent */}
                  <div className="absolute bottom-4 right-5 z-10">
                    <span className="text-5xl md:text-6xl font-black text-white/20 leading-none select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7 p-7 md:p-9 flex flex-col justify-between">
                  <div>
                    {/* Name + location */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                        {project.name}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-sm text-[#070707]/60 font-medium shrink-0">
                        <MapPin size={12} className="text-brand-primary" />
                        {project.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-base text-[#070707]/70 leading-relaxed font-medium max-w-lg mb-5">
                      {project.description}
                    </p>

                    {/* Specs */}
                    <div className="flex items-center gap-5 mb-6">
                      <span className="flex items-center gap-1.5 text-sm text-[#070707]/60 font-medium">
                        <BedDouble size={14} className="text-brand-primary" />
                        {project.rooms} Bedrooms
                      </span>
                      <span className="w-px h-3.5 bg-[#070707]/10" aria-hidden />
                      <span className="flex items-center gap-1.5 text-sm text-[#070707]/60 font-medium">
                        <Layers size={14} className="text-brand-primary" />
                        {project.floors} Floors
                      </span>
                    </div>
                  </div>

                  {/* Bottom: price + CTA */}
                  <div className="flex items-end justify-between pt-5 border-t border-[#070707]/5">
                    <div>
                      <span className="text-sm text-[#070707]/60 uppercase tracking-widest font-bold block mb-1">
                        Estimated Value
                      </span>
                      <span className="text-2xl md:text-3xl font-black text-[#070707] tracking-tight">
                        {project.price}
                      </span>
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#070707]/60 hover:text-brand-primary border border-[#070707]/10 hover:border-brand-primary/30 px-5 py-3 rounded-full transition-all duration-300 group/btn"
                    >
                      Explore
                      <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Bottom CTA ===== */}
        <div className="flex items-center justify-center mt-14 md:mt-18">
          <div className="flex items-center gap-4 text-[#070707]/60">
            <span className="w-12 h-px bg-[#070707]/10" aria-hidden />
            <span className="text-sm tracking-widest uppercase font-bold">
              3 of 10+ developments
            </span>
            <span className="w-12 h-px bg-[#070707]/10" aria-hidden />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
