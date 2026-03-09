import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-brand-primary selection:text-black">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Number */}
        <p className="text-[150px] md:text-[200px] font-black text-white/[0.03] leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          404
        </p>

        <div className="relative z-10">
          <span className="text-[10px] tracking-[0.3em] text-brand-primary uppercase font-bold flex items-center justify-center gap-3 mb-6 bg-brand-primary/10 px-5 py-2.5 rounded-full border border-brand-primary/20 mx-auto w-max">
            [ PAGE NOT FOUND ]
          </span>

          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
            Lost in <span className="font-bold text-brand-primary">Space</span>
          </h1>

          <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let us guide you back to familiar territory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brand-primary text-[#050505] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white transition-colors"
            >
              <Home size={14} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-full border border-white/10 hover:border-white/30 transition-colors"
            >
              <ArrowLeft size={14} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
