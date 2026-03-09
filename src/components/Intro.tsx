import { ArrowDown } from 'lucide-react';

const Intro = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center py-24 overflow-hidden font-sans">
      
      {/* Decorative Brackets */}
      <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-5xl md:text-8xl font-light text-white/20 select-none">
        [
      </div>
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-5xl md:text-8xl font-light text-white/20 select-none">
        ]
      </div>

      <div className="container mx-auto px-6 md:px-24 xl:px-32 flex flex-col items-center relative z-10 w-full max-w-7xl">
        
        {/* Main Huge Typography */}
        <div className="text-center w-full mb-16 md:mb-24">
          <h2 className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter leading-[0.85] flex flex-col items-center uppercase w-full">
            <span className="text-brand-primary block w-full text-center">Turning</span>
            <span className="flex items-center justify-between w-[95%] max-w-[1200px] mt-4">
              <span className="text-white relative top-2">Ideas</span>
              {/* Glowing Orb / Brand Accent */}
              <span className="relative flex items-center justify-center w-8 h-8 md:w-16 md:h-16 shrink-0 mx-4 md:mx-0">
                <span className="absolute inset-0 bg-brand-primary blur-[15px] md:blur-[30px] opacity-80 rounded-full"></span>
                <span className="relative w-4 h-4 md:w-6 md:h-6 bg-brand-soft rounded-full shadow-[0_0_20px_var(--color-brand-primary)]"></span>
              </span>
              <div className="flex flex-col text-left mb-2">
                <span className="text-white">Into</span>
                <span className="text-brand-primary">Reality</span>
              </div>
            </span>
          </h2>
        </div>

        {/* 3-Column Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center w-full mt-8">
          
          {/* Left Text */}
          <div className="text-center md:text-left order-2 md:order-1 flex justify-center md:justify-end">
            <div className="text-xs md:text-sm tracking-widest leading-loose uppercase max-w-[200px] font-medium flex flex-col gap-2">
              <span className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">
                Delivering
              </span>
              <span className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">
                exceptional
              </span>
              <span className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">
                client 
              </span>
              <span className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">
                services
              </span>
            </div>
          </div>

          {/* Center Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-[320px] aspect-[16/9] md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src="/images/about_luxury_property.png" 
                alt="Luxury Modern Architecture" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="text-center md:text-left order-3 flex justify-center md:justify-start">
            <div className="text-xs md:text-sm tracking-widest leading-loose uppercase max-w-[200px] font-medium flex flex-col gap-2">
              <span className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">
                Integrated
              </span>
              <span className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">
                team approach
              </span>
              <span className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">
                to 
              </span>
              <span className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all duration-300 cursor-pointer inline-block">
                development
              </span>
            </div>
          </div>

        </div>

        {/* Scroll To Explore */}
        <div className="mt-32 flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-xs tracking-widest uppercase font-semibold">Scroll To Explore</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>

      </div>
    </section>
  );
};

export default Intro;
