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
    <div className="relative min-h-screen w-full font-sans text-white">
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
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Bottom fading shadow to blend text and buttons */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        {/* Right Side "Grassy Glass" Overlay - Hidden on mobile */}
        <div className="hidden md:block absolute top-0 right-0 w-[55%] h-full bg-[#122c1b]/30 backdrop-blur-xl mask-[linear-gradient(to_right,transparent,black_20%)] overflow-hidden z-0">
          <div className="absolute inset-0 bg-linear-to-bl from-white/10 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-16 overflow-hidden">
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end pb-12 pt-16 relative w-full max-w-[1600px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
            

            {/* Left Box (Main Heading) */}
            <div className="lg:col-span-12 order-1 flex flex-col justify-end text-left relative z-20 pb-12 w-full">
              <div className="relative inline-block w-full max-w-[1200px]">
                {/* 
                  Using background-clip: text with background-attachment: fixed matches the viewport 
                  background exactly. This gives the illusion that the word "future" is a completely 
                  transparent window through the glass overlay. 
                  Shadows are kept on solid text to preserve contrast, but removed from the cutout.
                  A green text-stroke is added to "future" per user request.
                */}
                <h1 className="text-5xl sm:text-6xl md:text-8xl xl:text-[9.5rem] font-bold leading-[0.85] tracking-[-0.03em] lowercase text-white mb-6 relative z-30">
                  <span className="drop-shadow-lg">building the</span>{' '}
                  <span className="md:hidden text-brand-primary opacity-90 transition-all duration-1000 ease-in-out">
                    future
                  </span>
                  <span 
                    style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }} 
                    className="hidden md:inline text-transparent bg-fixed bg-cover bg-center bg-clip-text mix-blend-screen opacity-90 transition-all duration-1000 ease-in-out"
                  >
                    future
                  </span><br className="md:hidden" />
                  <span className="drop-shadow-lg"><span className="text-brand-primary italic font-light pr-2">of</span> real estate</span>
                </h1>
              </div>
              <p className="mt-4 text-base md:text-lg max-w-lg text-white/90 font-medium drop-shadow-md border-l-[3px] border-brand-gold pl-5 ml-2">
                Building long-term relationships based on integrity, performance, and clients' satisfaction.
              </p>
            </div>

            {/* Right Box (CTAs) - Absolutely positioned on large screens to avoid pushing text aligned with bottom text */}
            <div className="lg:absolute lg:right-0 lg:bottom-16 order-2 flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto lg:w-[280px] relative z-30 pt-8 lg:pt-0">
              
              <Link to="/projects" className="group flex items-center justify-between gap-4 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(1,45,1,0.4)] hover:shadow-[0_0_30px_rgba(1,45,1,0.6)] backdrop-blur-md w-full">
                <span>Explore Projects</span>
                <div className="bg-white/20 p-2 rounded-full group-hover:bg-white group-hover:text-brand-primary transition-colors duration-300">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </div>
              </Link>

              
            </div>

          </div>

          {/* Bottom container removed */}
          
        </div>
      </div>
    </div>
  );
};

export default Hero;