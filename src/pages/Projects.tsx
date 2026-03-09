import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Info, ArrowUpRight } from 'lucide-react';
import { projectService } from '../services/projects';
import { executiveSummaryService } from '../services/executiveSummary';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import type { Project, ExecutiveSummary } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [execSummary, setExecSummary] = useState<ExecutiveSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, execRes] = await Promise.all([
          projectService.getAll(),
          executiveSummaryService.getAll(),
        ]);
        setProjects(projRes.data);
        setExecSummary(execRes.data);
      } catch (err: unknown) {
        const apiErr = err as { message?: string };
        setError(apiErr.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      {/* Dark Hero Section */}
      <div className="bg-[#050505] text-white">
        <Navbar />
        <div className="pt-24 pb-20 px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px]">
          <div className="flex flex-col md:items-center text-center">
            <span className="text-[10px] tracking-[0.3em] text-brand-primary uppercase font-bold flex items-center justify-center gap-3 mb-6 bg-brand-primary/10 px-5 py-2.5 rounded-full border border-brand-primary/20 mx-auto w-max">
              [ PORTFOLIO ]
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
              Our <span className="font-bold">Developments</span>
            </h1>
            <p className="mt-8 text-white/60 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
              A showcase of our commitment to excellence. From ultra-luxury residential havens to landmark commercial properties shaping the skyline of Nigeria&apos;s major cities.
            </p>
          </div>
        </div>
      </div>

      {/* White Section — Signature Projects Grid */}
      <div className="bg-white text-black py-24 lg:py-32">
        <div className="px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px]">
          <h2 className="text-3xl md:text-4xl font-light mb-12 flex items-center gap-4">
            <span className="w-12 h-px bg-brand-primary"></span>
            Signature <span className="font-bold text-brand-primary">Projects</span>
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" label="Loading projects..." /></div>
          ) : error ? (
            <div className="flex items-center justify-center py-20"><ErrorMessage message={error} onRetry={() => window.location.reload()} /></div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 text-black/40">
              <p className="text-lg font-medium">No projects found.</p>
              <p className="text-sm mt-2">Check back soon for our latest developments.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <Link to={`/projects/${proj.id}`} key={proj.id} className="bg-[#fcfcfc] rounded-3xl overflow-hidden border border-black/5 hover:border-brand-primary/30 transition-all duration-500 group block shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
                  <div className="w-full h-[280px] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-transparent z-10"></div>
                    {proj.image ? (
                      <img src={proj.image} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-center justify-center">
                        <span className="text-brand-primary/30 text-5xl font-black">{proj.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-20 bg-brand-primary/90 text-[#050505] text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
                      {proj.status}
                    </div>
                  </div>
                  <div className="p-8 relative z-20 -mt-12">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-black">{proj.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-black/50 mb-5 font-semibold uppercase tracking-wider">
                      <MapPin size={14} className="text-brand-primary" /> {proj.location}
                    </div>
                    <p className="text-sm text-black/50 font-medium leading-relaxed mb-6 line-clamp-3">
                      {proj.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-black/10 pt-5">
                      <div>
                        <span className="block text-[10px] text-black/30 uppercase tracking-widest font-bold mb-1">Est. Value</span>
                        <span className="font-bold text-lg text-black">{proj.value || '—'}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-black transition-colors">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dark Section — Our Experience */}
      <div className="bg-[#050505] text-white py-24 lg:py-32">
        <div className="px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px]">
          <div className="flex flex-col md:items-center text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] text-brand-primary uppercase font-bold mb-4">Past & Ongoing</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
              Our <span className="font-bold text-brand-primary">Experience</span>
            </h2>
            <p className="mt-4 text-white/50 text-sm md:text-base font-medium">
              We have wide and varied experiences.... Some of our major ones includes:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {[
              "A fully serviced Lighthouse Bay Estate of different designs with over 500 Duplexes at Marwa Lekki Phase1 (under construction)",
              "Blocks of fully furnished 5bedroom Duplexes at Greencourt Residence Maitama Abuja.",
              "6 units of 4bedroom Duplexes semi-detached at Sinari Daranijo Victoria Island Lagos",
              "Block of 4 units of 4bedroom Terraces at Providence Street Lekki 1.",
              "42 units of 3/4bedroom Apartments at Milano Estate Elegushi Lekki Lagos",
              "Block of 4 units of 4bedroom Terraces at Bera Estate Chevron Drive Lekki 2.",
              "A mini shopping complex accommodating 42 shops.",
              "A block of 5bedroom Duplex at Bourdilon Ikoyi"
            ].map((exp, idx) => (
              <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-6 flex items-start gap-4 hover:border-brand-primary/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 border border-brand-primary/20">
                  <span className="text-brand-primary text-xs font-bold">{idx + 1}</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed font-medium pt-1">{exp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* White Section — Executive Summary Table */}
      <div className="bg-white text-black py-24 lg:py-32">
        <div className="px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px]">
          <h2 className="text-3xl md:text-4xl font-light mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-brand-primary"></span>
            Executive <span className="font-bold text-brand-primary">Summary</span>
          </h2>
          <div className="bg-[#fcfcfc] border border-black/10 rounded-3xl p-6 md:p-10 overflow-hidden relative shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
            <div className="mb-8 flex items-start gap-3 bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-2xl">
              <Info size={18} className="text-brand-primary mt-0.5 shrink-0" />
              <p className="text-xs md:text-sm font-medium text-black/60 leading-relaxed">
                Ongoing and proposed developments detailing project scopes, locations, completion statuses, and estimated values.
              </p>
            </div>

            {execSummary.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="py-4 px-6 border-b border-black/10 text-[10px] text-brand-primary uppercase tracking-widest font-bold w-12">S/N</th>
                      <th className="py-4 px-6 border-b border-black/10 text-[10px] text-black/40 uppercase tracking-widest font-bold">Project</th>
                      <th className="py-4 px-6 border-b border-black/10 text-[10px] text-black/40 uppercase tracking-widest font-bold">Location</th>
                      <th className="py-4 px-6 border-b border-black/10 text-[10px] text-black/40 uppercase tracking-widest font-bold">Completion</th>
                      <th className="py-4 px-6 border-b border-black/10 text-[10px] text-black/40 uppercase tracking-widest font-bold whitespace-nowrap">Est. Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {execSummary.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-black/[0.02] transition-colors group">
                        <td className="py-5 px-6 border-b border-black/5 text-sm font-bold text-black/25">{idx + 1}</td>
                        <td className="py-5 px-6 border-b border-black/5 text-sm font-bold text-black group-hover:text-brand-primary transition-colors">{item.project}</td>
                        <td className="py-5 px-6 border-b border-black/5 text-sm text-black/60 font-medium">{item.loc}</td>
                        <td className="py-5 px-6 border-b border-black/5 text-sm text-black/60 font-medium">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                            item.status.toLowerCase().includes('completed') ? 'bg-green-500/10 text-green-600' :
                            item.status.toLowerCase().includes('design') ? 'bg-blue-500/10 text-blue-600' :
                            'bg-orange-500/10 text-orange-600'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-5 px-6 border-b border-black/5 text-sm font-bold text-black whitespace-nowrap">{item.val || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-black/40 text-sm">No executive summary data available.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
