import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CoreValues from '../components/CoreValues';
import { teamService } from '../services/team';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { TeamMember } from '../types';
import aboutBg from '../assets/about-grand-mansion.jpg';

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await teamService.getAll();
        setTeamMembers(res.data);
      } catch (err) {
        console.error('Failed to load team members:', err);
      } finally {
        setTeamLoading(false);
      }
    };
    fetchTeam();
  }, []);
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      
      {/* Hero Section — Navbar overlays the image */}
      <div className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={aboutBg} alt="Greenstone About" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
        </div>
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6">
          <div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
              <span className="text-xs tracking-[0.25em] text-brand-primary uppercase font-bold">Since 2002</span>
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
              Building <span className="font-bold">Legacies</span>
            </h1>
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
              Enhancing associations through ethical, socially conscious development. We turn ideas into reality with a tradition of building long-term relationships based on integrity, partnership, and performance.
            </p>
          </div>
        </div>
      </div>

      <div className="grow pt-12 pb-24 px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px] flex flex-col gap-32">
        
        {/* History & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-8">Our <span className="font-bold text-brand-primary">History</span></h2>
            <div className="text-white/70 space-y-6 text-base md:text-[15px] leading-relaxed font-medium">
              <p>
                Greenstone Developments Limited was incorporated in 2002. The Company was formed to develop well designed, competitively priced real estate in Nigeria.
              </p>
              <p>
                Over the past decade we've been consistent in our objective of contributing our quota to the growth and development of Nigeria's economy as well as improving the lot of individuals and corporate clients through investment finance and management services.
              </p>
              <p>
                Greenstone Developments Limited is a pre-eminent focused Property Company with a large well-balanced portfolio comprised of residential, commercial and mixed-use properties. It is renowned for its impressive development of residential properties in Lekki, Chevron, Victoria Island, Ikoyi, Maitama, Asokoro, Lugbe etc. and its landmark development of a mixed-use F.O Terraces at Lekki Phase1 Lagos State. The Company also has a small but growing portfolio of property investments in Nigeria and an interest in property development across borders.
              </p>
              <p>
                We've also served as residential and industrial Property Management Specialists; where we've gained good reputation in property management; because we deliver a service that provides integrity, professionalism and peace of mind to our clients.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-8">Vision & <span className="font-bold text-brand-primary">Mission</span></h2>
            <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-colors">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-brand-primary">Vision</h3>
              <p className="text-white/70 text-base leading-relaxed font-medium mb-8">
                To be a recognised leader in the Property Development/Management industry in Nigeria and then Africa; while maintaining our authentic level of services founded on basic core values of integrity and partnership as enshrined in our Corporate Objectives.
              </p>
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-brand-primary">Core Values Overview</h3>
              <p className="text-white/70 text-base leading-relaxed font-medium">
                We turn ideas into reality with a tradition of building long-term relationships based on integrity, partnership, performance, value and client's satisfaction through delivering exceptional and innovative client services.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Component */}
        <div className="w-full relative">
          <CoreValues />
        </div>

        {/* Corporate Objectives */}
        <div>
           <div className="flex flex-col md:items-center text-center mb-16">
            <span className="text-xs tracking-[0.25em] text-brand-primary uppercase font-bold mb-4">The Foundation</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Corporate <span className="font-bold text-brand-primary">Objectives</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Innovative Solutions', desc: 'Providing innovative solutions to our clients changing needs.' },
              { title: 'Highest Quality', desc: 'Anticipating client requirements and providing the best quality products & services.' },
              { title: 'Expert Artisans', desc: 'Continually improving the talents of our artisans to better serve clients.' },
              { title: 'Prompt Delivery', desc: 'Always ensuring prompt, efficient and effective service delivery.' }
            ].map((obj, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 hover:bg-white/5 hover:border-brand-primary/50 transition-all duration-300">
                <div className="text-brand-primary font-mono text-sm mb-6">0{i + 1}</div>
                <h3 className="text-lg font-bold mb-4">{obj.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-medium">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Organogram */}
        <div className="py-12">
          <div className="flex flex-col md:items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Company <span className="font-bold text-brand-primary">Organogram</span>
            </h2>
            <p className="text-white/60 text-base mt-4">Structural hierarchy of Greenstone Developments Limited</p>
          </div>
          
          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-16 overflow-x-auto relative">
             <div className="min-w-[800px] flex flex-col items-center">
                {/* Level 1 */}
                <div className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-6 py-3 rounded-lg font-bold text-sm tracking-widest text-center shadow-lg">
                  CHAIRMAN BOARD OF DIRECTOR
                </div>
                <div className="w-px h-8 bg-brand-primary/50"></div>
                {/* Level 2 */}
                <div className="bg-red-600/20 text-red-400 border border-red-500/30 px-8 py-3 rounded-lg font-bold text-sm tracking-widest text-center shadow-lg relative">
                  CHIEF EXECUTIVE OFFICER
                </div>
                <div className="w-px h-8 bg-brand-primary/50"></div>
                {/* Horizontal branch */}
                <div className="w-[600px] h-px bg-brand-primary/50 flex justify-between relative">
                  <div className="w-px h-8 bg-brand-primary/50 absolute left-0"></div>
                  <div className="w-px h-8 bg-brand-primary/50 absolute right-0"></div>
                </div>
                
                {/* Level 3 */}
                <div className="w-[600px] flex justify-between mt-8 relative">
                   {/* Left Branch */}
                   <div className="flex flex-col items-center">
                     <div className="bg-green-600/20 text-green-400 border border-green-500/30 px-6 py-2 rounded-lg font-bold text-xs tracking-widest text-center w-48 shadow-md">SENIOR MANAGER</div>
                     <div className="w-px h-6 bg-brand-primary/30"></div>
                     <div className="bg-green-600/10 text-green-300 border border-green-500/20 px-6 py-2 rounded-lg font-bold text-xs tracking-widest text-center w-48">FINANCE</div>
                     <div className="w-px h-6 bg-brand-primary/30"></div>
                     <div className="bg-green-600/10 text-green-300 border border-green-500/20 px-6 py-2 rounded-lg font-bold text-xs tracking-widest text-center w-48">ACCOUNTANT</div>
                     <div className="w-px h-6 bg-brand-primary/30"></div>
                     <div className="bg-green-600/10 text-green-300 border border-green-500/20 px-6 py-2 rounded-lg font-bold text-xs tracking-widest text-center w-48">ADMINISTRATIVE</div>
                     <div className="w-px h-6 bg-brand-primary/30"></div>
                     <div className="bg-green-600/10 text-green-300 border border-green-500/20 px-6 py-2 rounded-lg font-bold text-xs tracking-widest text-center w-32">SECRETARY</div>
                     <div className="w-px h-6 bg-brand-primary/30"></div>
                     <div className="bg-green-600/10 text-green-300 border border-green-500/20 px-6 py-2 rounded-lg font-bold text-xs tracking-widest text-center w-32">OFFICE ASSISTANT</div>
                   </div>

                   {/* Right Branch */}
                   <div className="flex flex-col items-center">
                      <div className="bg-orange-600/20 text-orange-400 border border-orange-500/30 px-6 py-2 rounded-lg font-bold text-xs tracking-widest text-center shadow-md">GENERAL PROJECT MANAGER</div>
                      <div className="w-px h-6 bg-brand-primary/30"></div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-[150px] h-px bg-brand-primary/30 translate-y-3 relative">
                            <div className="absolute left-0 w-px h-3 bg-brand-primary/30"></div>
                          </div>
                          <div className="flex gap-2">
                             <div className="flex flex-col items-center mt-3">
                               <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-28">PROJECT ENGINEER</div>
                               <div className="w-px h-4 bg-brand-primary/30"></div>
                               <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-28">STORE KEEPERS</div>
                               <div className="w-px h-4 bg-brand-primary/30"></div>
                               <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-28">SAFETY OFFICERS</div>
                             </div>
                             <div className="flex flex-col items-center mt-3">
                               <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-2 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-24">QUANTITY SURVEYOR</div>
                             </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center z-10">
                          <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-28">ASS. PROJECT MANAGER</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="w-[80px] h-px bg-brand-primary/30 translate-y-3 relative -translate-x-full">
                            <div className="absolute right-0 w-px h-3 bg-brand-primary/30"></div>
                          </div>
                          <div className="flex flex-col items-center mt-3">
                             <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-28">PROJECT CONSULTANT</div>
                             <div className="w-px h-4 bg-brand-primary/30"></div>
                             <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-28">SITE MANAGERS</div>
                             <div className="w-px h-4 bg-brand-primary/30"></div>
                             <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-28">MAINTENANCE OFFICERS</div>
                             <div className="w-px h-4 bg-brand-primary/30"></div>
                             <div className="bg-orange-600/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg font-bold text-[10px] tracking-wider text-center w-28">ARTISANS</div>
                          </div>
                        </div>

                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Extended Management Team */}
        <div>
           <div className="flex flex-col md:items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              The Management <span className="font-bold text-brand-primary">Team</span>
            </h2>
            <p className="text-white/60 text-base mt-4">Qualified and tested professionals well versed in handling various projects.</p>
          </div>
          
          {teamLoading ? (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner size="lg" label="Loading team..." />
            </div>
          ) : teamMembers.length === 0 ? (
            <p className="text-center text-white/50 py-12 text-lg">No team members found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Link to={`/team/${member.id}`} key={member.id} className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:bg-white/5 transition-colors group block">
                  <h3 className="text-xl font-bold mb-1 text-white group-hover:text-brand-primary transition-colors">{member.name}</h3>
                  <p className="text-xs tracking-widest text-[#012d01] font-bold uppercase mb-4 bg-brand-primary/80 inline-block px-3 py-1 rounded-full">{member.role}</p>
                  <p className="text-base text-white/50 leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default About;
