import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="flex items-center justify-between py-6 px-6 md:px-12 lg:px-16 relative z-[100] lg:z-[50]">
        <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
          <span>Green</span>
          <span className="text-brand-primary">stone</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center p-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                location.pathname === link.path 
                  ? 'bg-white text-slate-900 shadow-md' 
                  : 'text-white/90 hover:bg-white/20 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block w-[120px]"></div>

        {/* Mobile Hamburger Button */}
        <button 
          className="lg:hidden p-2 text-white hover:text-brand-primary transition-colors relative z-[110]"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu: portal to body so it sits above hero / stacking contexts (overflow, z-10 layers) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-hidden={!isMenuOpen}
            className={`fixed inset-0 z-[9999] flex flex-col justify-center items-center px-6 transition-all duration-500 ease-in-out lg:hidden bg-[#050505] ${
              isMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className={`absolute top-6 right-6 p-2 rounded-full text-white hover:text-brand-primary hover:bg-white/10 transition-colors z-[10001] ${
                isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <div className="absolute top-0 right-0 w-[80%] h-[50%] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-white/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center gap-6 w-full max-w-sm relative z-10">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-3xl sm:text-4xl font-bold tracking-tight uppercase transition-all duration-500 ${
                    location.pathname === link.path
                      ? 'text-brand-primary translate-x-2'
                      : 'text-white/70 hover:text-white hover:translate-x-2'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  {link.name}
                </Link>
              ))}

              <div
                className="w-12 h-px bg-white/20 my-8 transition-all duration-700"
                style={{ opacity: isMenuOpen ? 1 : 0, width: isMenuOpen ? '48px' : '0px' }}
              />

              <Link
                to="/contact"
                className="text-sm tracking-widest uppercase font-bold text-white bg-brand-primary/20 border border-brand-primary px-8 py-4 rounded-full transition-all duration-500 hover:bg-brand-primary hover:text-black"
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '300ms',
                }}
              >
                Get in touch
              </Link>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Navbar;
