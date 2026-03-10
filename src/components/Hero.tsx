import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import heroBg1 from '../assets/beautiful-red-brick-house-with-decorative-lights.webp';
import heroBg2 from '../assets/photorealistic-wooden-house-with-timber-structure.webp';

const backgroundImages = [heroBg1, heroBg2];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full font-sans text-white overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Render all background images and use opacity to transition between them smoothly */}
        {backgroundImages.map((imgSrc, index) => (
          <img 
            key={imgSrc}
            src={imgSrc} 
            alt={`Hero Background ${index + 1}`} 
            {...(index === 0 ? { fetchPriority: "high" } : {})}
            loading={index === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
              index === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        ))}
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-black/10"></div>
        {/* Bottom fading shadow to blend text and buttons */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
        {/* Abstract "Grassy Glass" Overlay */}
        <div className="absolute top-0 right-0 w-full md:w-[60%] lg:w-[45%] h-full bg-[#012D01]/10 backdrop-blur-3xl mask-[linear-gradient(to_right,transparent,black_40%)] overflow-hidden z-0 hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent mix-blend-overlay"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-24">
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center md:justify-end pb-16 md:pb-24 pt-16 relative w-full mb-12 sm:mb-0 max-w-[1600px] mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-end w-full">
            
            {/* Left Box (Main Heading) */}
            <div className="flex-1 flex flex-col justify-end text-left relative z-20 pb-4 lg:pb-12 w-full">
              <div className="relative inline-block w-full">
                {/* 
                  Using responsive text sizes that won't break mobile layout.
                */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] font-bold leading-[0.9] tracking-[-0.03em] text-white/90 mb-6 drop-shadow-2xl">
                  Building the <br />
                  <span 
                    style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }} 
                    className="bg-fixed bg-cover bg-center bg-clip-text text-transparent mix-blend-screen opacity-100 transition-all duration-1000 ease-in-out pr-4 block lg:inline"
                  >
                    future
                  </span>
                  <span className="block sm:inline whitespace-nowrap"><span className="text-brand-primary italic font-light pr-2 hidden sm:inline">of</span>real estate</span>
                </h1>
              </div>
              <p className="mt-4 md:mt-8 text-sm md:text-base lg:text-lg max-w-lg text-white/70 font-medium leading-relaxed drop-shadow-md border-l-[3px] border-brand-primary pl-4 md:pl-6 ml-1">
                A tradition of building long-term relationships based on uncompromised integrity, superior performance, value, and absolute client satisfaction.
              </p>
            </div>

            {/* Right Box (CTAs) */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto lg:w-[320px] relative z-30 pt-4 lg:pt-0 lg:pb-12 shrink-0">
              
              <Link to="/projects" className="group flex items-center justify-between gap-4 bg-brand-primary text-black px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_0_20px_rgba(1,45,1,0.4)] hover:shadow-[0_0_30px_rgba(1,45,1,0.8)] hover:bg-white w-full">
                <span>Explore Projects</span>
                <div className="bg-black/10 p-2 rounded-full group-hover:bg-brand-primary group-hover:text-black transition-colors duration-300">
                  <ArrowRight size={16} strokeWidth={3} />
                </div>
              </Link>
              
              <Link to="/contact" className="group flex items-center justify-between gap-4 bg-white/10 text-white border border-white/20 hover:border-brand-primary px-6 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 backdrop-blur-md w-full">
                <span>Get In Touch</span>
                <div className="bg-white/20 p-2 rounded-full group-hover:bg-brand-primary group-hover:text-black transition-colors duration-300">
                   <ArrowRight size={16} strokeWidth={3} />
                </div>
              </Link>

            </div>

          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Hero;
