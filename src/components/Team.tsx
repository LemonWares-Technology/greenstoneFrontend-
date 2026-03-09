import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { teamService } from '../services/team';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';
import type { TeamMember } from '../types';

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await teamService.getAll();
        setTeamMembers(res.data);
      } catch (err: unknown) {
        const apiErr = err as { message?: string };
        setError(apiErr.message || 'Failed to load team members');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const currentMembers = teamMembers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  if (loading) {
    return (
      <section id="team" className="relative w-full bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
        <div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" label="Loading team..." /></div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="team" className="relative w-full bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
        <div className="flex items-center justify-center py-20"><ErrorMessage message={error} onRetry={() => window.location.reload()} /></div>
      </section>
    );
  }

  return (
    <section id="team" className="relative w-full bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="w-px h-full bg-slate-300 absolute left-1/4"></div>
        <div className="w-px h-full bg-slate-300 absolute left-1/2"></div>
        <div className="w-px h-full bg-slate-300 absolute left-3/4"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-[1600px]">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-bold">Leadership</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-light tracking-tight leading-[1.05]">
              Meet the <span className="font-bold">Visionaries</span>
            </h2>
          </div>
          <p className="text-sm md:text-[15px] text-[#070707]/60 leading-relaxed font-medium max-w-sm md:text-right">
            Qualified and tested professionals well-versed in handling complex luxury 
            developments and delivering unparalleled real estate solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {currentMembers.map((member) => (
            <div key={member.id} className="bg-[#fcfcfc] border border-[#070707]/5 rounded-3xl p-8 hover:border-brand-primary/30 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col h-full bg-transparent">
                <div className="mb-6">
                  <h3 className="text-xl font-bold tracking-tight text-[#070707] mb-1 group-hover:text-brand-primary transition-colors">{member.name}</h3>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-brand-primary">{member.role}</p>
                </div>
                <div className="h-px w-12 bg-black/10 mb-6 group-hover:w-full group-hover:bg-brand-primary/30 transition-all duration-500"></div>
                <p className="text-sm text-[#070707]/60 leading-relaxed font-medium flex-1">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-16 text-[#070707]/40">
            <p className="text-lg font-medium">No team members found.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#070707]/10 pt-8 mt-12">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold font-mono text-[#070707]">0{currentPage + 1}</span>
              <span className="text-xl text-[#070707]/20 font-light">/</span>
              <span className="text-sm font-bold font-mono text-[#070707]/40">0{totalPages}</span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={prevPage} disabled={currentPage === 0}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  currentPage === 0 ? 'border-[#070707]/10 opacity-30 cursor-not-allowed text-[#070707]/30' : 'border-[#070707]/20 hover:bg-brand-primary hover:border-brand-primary cursor-pointer text-[#070707] hover:text-white'
                }`}
              ><ArrowLeft size={16} /></button>
              <button 
                onClick={nextPage} disabled={currentPage === totalPages - 1}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  currentPage === totalPages - 1 ? 'border-[#070707]/10 opacity-30 cursor-not-allowed text-[#070707]/30' : 'border-[#070707]/20 hover:bg-brand-primary hover:border-brand-primary cursor-pointer text-[#070707] hover:text-white'
                }`}
              ><ArrowRight size={16} /></button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Team;
