import { useLocation, Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between py-6 relative z-50">
      <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
        <span>Green</span>
        <span className="text-brand-primary">stone</span>
      </Link>

      {/* Glassy Curve Header for Navigation */}
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

      <div className="hidden md:block w-[120px]"></div>
    </nav>
  );
};

export default Navbar;
