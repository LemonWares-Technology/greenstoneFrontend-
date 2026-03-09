import React from 'react';
import { Link } from 'react-router-dom';
import proj1 from '../assets/project_interior_1.png';
import proj2 from '../assets/project_interior_2.png';
import proj3 from '../assets/project_interior_3.png';
import aboutImg from '../assets/about_vision_property.png';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      
      {/* Top content area */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1600px] pt-20 pb-12 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Left — Tagline + Thumbnails */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <p className="text-xl md:text-2xl font-light leading-snug tracking-tight max-w-xs">
              Guiding Your Homeownership
              Journey, Nurturing <span className="italic">Home</span>{' '}
              <span className="text-brand-primary font-medium">Dreams</span> Life
            </p>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {[proj1, proj2, proj3].map((img, idx) => (
                <div key={idx} className="w-16 h-12 md:w-20 md:h-14 rounded-xl overflow-hidden border border-white/10 hover:border-brand-primary/50 transition-colors cursor-pointer group">
                  <img src={img} alt={`Project ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Center — Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] tracking-widest uppercase text-white/30 font-bold mb-6">Navigate</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-sm text-white/60 hover:text-brand-primary transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] tracking-widest uppercase text-white/30 font-bold mb-6">Social</h4>
            <ul className="flex flex-col gap-3">
              {['Instagram', 'Facebook', 'Twitter', 'LinkedIn'].map((social, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-white/60 hover:text-brand-primary transition-colors font-medium">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] tracking-widest uppercase text-white/30 font-bold mb-6">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-white/60 font-medium">(+234) 08033040403<br/>(+234) 08160278752</li>
              <li>
                <a href="mailto:info@greenstoneltd.com" className="text-sm text-white/60 hover:text-brand-primary transition-colors font-medium">
                  info@greenstoneltd.com
                </a>
              </li>
              <li className="text-sm text-white/40 font-medium leading-relaxed mt-2">
                6, Boyle Street (4th Floor),<br/>Onikan, Lagos Nigeria.
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Massive Brand Name + Background Image */}
      <div className="relative w-full h-[280px] md:h-[380px] lg:h-[420px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={aboutImg} 
            alt="Greenstone Development"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/90"></div>
        </div>

        {/* Giant brand text */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h2 className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-bold tracking-tighter leading-none uppercase select-none whitespace-nowrap">
            <span className="text-white/90">Green</span><span className="text-brand-primary">stone</span>
          </h2>
        </div>

        {/* Bottom bar — absolute positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1600px] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <p className="text-xs text-white/30 font-medium">
              Copyright © {new Date().getFullYear()} Greenstone Developments. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-white/30 hover:text-brand-primary transition-colors font-medium">Terms & Conditions</a>
              <a href="#" className="text-xs text-white/30 hover:text-brand-primary transition-colors font-medium">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
