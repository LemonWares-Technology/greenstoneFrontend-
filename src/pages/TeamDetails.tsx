import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Briefcase, Award, ChevronRight } from 'lucide-react';
import aboutBg from '../assets/about-grand-mansion.jpg';

export const allTeamMembers = [
  { id: 1, name: 'Dr. Yemi Osindero', role: 'Chairman Board of Directors', bio: 'Founder and Managing Partner of Uhuru Investment Partners. Decades of investment banking, private equity and operating experience. Holds a BEng and PhD in Chemical Engineering from Bath University.', fullBio: 'Dr. Yemi Osindero serves as the visionary Chairman of the Board of Directors. As the Founder and Managing Partner of Uhuru Investment Partners, he brings decades of invaluable experience spanning investment banking, private equity, and executive operations. His strategic oversight guides Greenstone\'s high-level growth trajectories. He holds both a Bachelor of Engineering (BEng) and a PhD in Chemical Engineering from the prestigious Bath University.' },
  { id: 2, name: 'Mr. Emeka Nweze', role: 'Chief Executive Officer', bio: 'Set up Greenstone Developments Ltd in 2002. Expert in business development, complex project management, and technical design with vast experience in construction.', fullBio: 'Mr. Emeka Nweze is the foundational pillar of Greenstone Developments Ltd, having established the company in 2002. As CEO, he acts as the primary driving force behind the company\'s strategic direction and day-to-day excellence. He is a recognized expert in business development, complex project management, and meticulous technical design, backed by vast, hands-on experience in the Nigerian construction sector.' },
  { id: 3, name: 'Engr. Oluyemi Utsheoritshelaju', role: 'General Project Manager', bio: 'COREN certified (B.Eng Civil Engineering). Wealth of experience in project initiation, organization, supervision, management and delivery.', fullBio: 'Engr. Oluyemi Utsheoritshelaju is a highly accomplished COREN-certified Civil Engineer (B.Eng). Acting as the General Project Manager, he leverages a profound wealth of experience in project initiation, detailed organization, rigorous supervision, and ultimate delivery. His leadership ensures all Greenstone projects meet stringent quality and timeline metrics.' },
  { id: 4, name: 'Ms. Ayanlere Oluwatobi .B.', role: 'Senior Manager', bio: 'Dynamic professional with 5+ years driving operational efficiency. Certified in QAQC, HRM, and CSRM.', fullBio: 'Ms. Ayanlere Oluwatobi .B. is a dynamic and results-driven professional with over 5 years of experience dedicated to maximizing operational efficiency. As Senior Manager, she holds critical certifications in Quality Assurance/Quality Control (QAQC), Human Resource Management (HRM), and Customer Service Relationship Management (CSRM), ensuring operational excellence across all departments.' },
  { id: 5, name: 'Mr. Olaogun Ayodele', role: 'Executive Assistant to the C.E.O', bio: 'Distinguished insurance professional and certified member of CIIN, bringing business acumen and leadership capabilities.', fullBio: 'Mr. Olaogun Ayodele serves as the Executive Assistant to the C.E.O. He is a distinguished insurance professional and a certified member of the Chartered Insurance Institute of Nigeria (CIIN). He brings sharp business acumen, risk management expertise, and strong leadership capabilities to the executive suite.' },
  { id: 6, name: 'Engr. Abdelrazzak Kannouj', role: 'Technical Director', bio: 'Seasoned Engineer with vast local and international experience, currently lead engineer for Green Court Residence Maitama.', fullBio: 'Engr. Abdelrazzak Kannouj is our Technical Director, a seasoned engineer renowned for his vast portfolio of both local and international developments. He is currently serving as the lead engineer for the ultra-luxury Green Court Residence in Maitama, applying global best practices to local contexts.' },
  { id: 7, name: 'Mr Funmi Olubajo', role: 'Director', bio: 'Civil Engineer (Bsc Hons) with a diploma in Project Management from Pro-consult LLC (USA).', fullBio: 'Mr. Funmi Olubajo is a Director at Greenstone Developments. Holding a Bsc (Hons) in Civil Engineering, he further honed his expertise with a specialized diploma in Project Management from Pro-consult LLC in the United States, bringing international project management standards to the board.' },
  { id: 8, name: 'Engr. Tosin Aborisade', role: 'Site Engineer', bio: 'Architect with over 20 years of experience and proven track records managing infrastructural projects.', fullBio: 'Engr. Tosin Aborisade is a veteran Architect functioning as a Senior Site Engineer. With an impressive career spanning over 20 years, he possesses a proven track record of successfully managing and delivering large-scale, complex infrastructural projects from concept through to completion.' },
  { id: 9, name: 'Engr. Olugbenga.O. Osoba', role: 'Site Engineer', bio: '18 years experience in civil/structural engineering. Member of COREN and ACEN.', fullBio: 'Engr. Olugbenga O. Osoba is a highly respected Site Engineer with 18 years of dedicated experience in civil and structural engineering. He is a proud, active member of both COREN and the Association of Consulting Engineering in Nigeria (ACEN), ensuring strict adherence to structural safety standards.' },
  { id: 10, name: 'Engr. Pierro Mjally', role: 'Civil Structural Engineer', bio: 'Over 16 years experience ensuring trouble-free installation and quality project delivery. COREN Registered.', fullBio: 'Engr. Pierro Mjally is a COREN-registered Civil Structural Engineer. Bringing over 16 years of hands-on experience to the team, his primary focus is ensuring trouble-free structural installations, rigorous quality control, and the seamless delivery of foundational engineering works.' },
  { id: 11, name: 'Engr. Da Ojochide Gad', role: 'Civil Engineer', bio: 'Over 20 years experience successfully managing large-scale infrastructural projects. Corporate member NSE & COREN.', fullBio: 'Engr. Da Ojochide Gad is a veteran Civil Engineer with over two decades of experience successfully directing and managing large-scale infrastructural initiatives. He holds esteemed corporate memberships with both the Nigerian Society of Engineers (NSE) and COREN.' },
  { id: 12, name: 'Engr. Olusegun Olatunji', role: 'Civil Engineer', bio: 'Highly experienced in site coordination, Bill of Quantities, and effective management of concrete production.', fullBio: 'Engr. Olusegun Olatunji is a dedicated Civil Engineer highly experienced in the nuanced aspects of site coordination. His expertise lies in accurate Bill of Quantities generation and the highly effective management of on-site concrete production and material logistics.' },
];

const TeamDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    const numericId = parseInt(id, 10);
    const foundMember = allTeamMembers.find(m => m.id === numericId);
    setMember(foundMember);
    window.scrollTo(0, 0);
  }, [id]);

  if (!member) {
    return (
      <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
        <Link to="/about" className="text-brand-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to About Us
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      
      {/* Profile Header — Navbar overlays */}
      <div className="relative w-full pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-10 blur-xl">
          <img src={aboutBg} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-[#050505]/90 to-[#050505]"></div>
        <div className="relative z-10">
          <Navbar />
        </div>
        
        <div className="container mx-auto max-w-[1000px] relative z-10 flex flex-col lg:flex-row items-center lg:items-end gap-10 px-6 md:px-12 lg:px-24 pt-8">
          
          <div className="flex-1 text-center lg:text-left">
            <Link to="/about" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8">
              <ArrowLeft size={14} /> Back to Management Team
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{member.name}</h1>
            <div className="inline-flex items-center gap-3 bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-full">
              <Briefcase size={16} className="text-brand-primary" />
              <span className="text-xs tracking-widest text-brand-primary font-bold uppercase">{member.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grow container mx-auto px-6 md:px-12 lg:px-24 max-w-[1000px] py-16">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

          <h2 className="text-xl md:text-2xl font-light mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-brand-primary"></span>
            Professional <span className="font-bold text-brand-primary">Biography</span>
          </h2>
          
          <p className="text-base md:text-lg text-white/70 font-medium leading-relaxed md:leading-loose">
            {member.fullBio}
          </p>

          <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-4">
            <Award className="text-white/50" size={24} />
            <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Greenstone Developments Ltd. Executive</p>
          </div>
        </div>

        {/* Quick link to other team members */}
        <div className="mt-16 text-center">
            <p className="text-white/60 text-base mb-6">Discover more of our leadership</p>
            <div className="flex flex-wrap justify-center gap-3">
              {allTeamMembers.filter(m => m.id !== member.id).slice(0, 3).map(m => (
                <Link key={m.id} to={`/team/${m.id}`} className="flex items-center gap-2 bg-[#111] border border-white/5 hover:border-brand-primary/30 px-4 py-3 rounded-xl transition-colors text-sm font-medium text-white/70 hover:text-white group">
                  {m.name}
                  <ChevronRight size={14} className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
                </Link>
              ))}
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeamDetails;
