import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { teamService } from '../../services/team';
import { useToast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import type { TeamMember } from '../../types';

interface TeamFormData {
  name: string;
  role: string;
  bio: string;
}

const emptyForm: TeamFormData = { name: '', role: '', bio: '' };

const AdminTeam: React.FC = () => {
  const { showToast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamFormData>(emptyForm);

  useEffect(() => { fetchTeam(); }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await teamService.getAll();
      setTeamMembers(res.data);
      setError(null);
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      setError(apiErr.message || 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (member: TeamMember | null = null) => {
    if (member) {
      setCurrentMember(member);
      setFormData({ name: member.name, role: member.role, bio: member.bio });
    } else {
      setCurrentMember(null);
      setFormData(emptyForm);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setCurrentMember(null); };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentMember) {
        await teamService.update(currentMember.id, formData);
        showToast('Team member updated!', 'success');
      } else {
        await teamService.create(formData);
        showToast('Team member added!', 'success');
      }
      closeModal();
      fetchTeam();
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to save team member.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this team member?')) return;
    try {
      await teamService.remove(id);
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      showToast('Team member removed.', 'success');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to delete.', 'error');
    }
  };

  const filteredTeam = teamMembers.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" label="Loading team..." /></div>;
  if (error) return <div className="flex items-center justify-center py-20"><ErrorMessage message={error} onRetry={fetchTeam} /></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-[#012D01] tracking-tight">Manage <span className="font-bold">Team</span></h1>
          <p className="text-[#012D01]/50 mt-1">Add, edit, or remove executives and engineers.</p>
        </div>
        <button onClick={() => openModal()} className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#012D01]/10">
          <Plus size={18} /> Add Member
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#012D01]/5 shadow-sm mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#012D01]/40" />
          <input type="text" placeholder="Search team members by name or role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 pl-12 pr-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeam.length > 0 ? filteredTeam.map((member) => (
          <div key={member.id} className="bg-white rounded-3xl border border-[#012D01]/5 p-6 shadow-xl shadow-[#012D01]/2 hover:border-[#012D01]/10 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 rounded-full bg-[#E3F9F5] flex items-center justify-center text-[#012D01] font-bold text-xl border-2 border-brand-primary">
                {member.name.charAt(0)}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openModal(member)} className="p-2 text-[#012D01]/50 hover:text-brand-primary hover:bg-[#E3F9F5] rounded-lg transition-colors" title="Edit"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(member.id)} className="p-2 text-[#012D01]/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold tracking-tight text-[#012D01] mb-1">{member.name}</h3>
              <p className="text-xs uppercase tracking-widest font-bold text-brand-primary-dark">{member.role}</p>
            </div>
            <p className="text-sm text-[#012D01]/70 leading-relaxed font-medium flex-1 line-clamp-4">{member.bio}</p>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-[#012D01]/50 bg-white rounded-3xl border border-[#012D01]/5">No team members found.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#012D01]/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#012D01]/10 bg-white sticky top-0 rounded-t-3xl z-20 shrink-0">
              <h2 className="text-xl font-bold text-[#012D01]">{currentMember ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <button onClick={closeModal} className="p-2 rounded-full text-[#012D01]/50 hover:bg-[#E3F9F5] hover:text-[#012D01] transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="team-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g., Dr. Yemi Osindero" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Role / Title</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} required placeholder="e.g., Technical Director" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Biography</label>
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} required rows={5} placeholder="Enter professional biography and qualifications..." className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Profile Photo</label>
                  <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-[#012D01]/10 border-dashed rounded-xl hover:bg-[#E3F9F5]/30 transition-colors cursor-pointer group">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-[#012D01]/30 group-hover:text-brand-primary transition-colors" />
                      <div className="flex text-sm text-[#012D01]/70 justify-center"><label className="relative cursor-pointer font-medium text-brand-primary-dark hover:text-brand-primary"><span>Upload a profile photo</span><input type="file" className="sr-only" accept="image/*" /></label></div>
                      <p className="text-xs text-[#012D01]/50">1:1 Ratio recommended (PNG, JPG)</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-[#012D01]/10 bg-white sticky bottom-0 rounded-b-3xl shrink-0 flex justify-end gap-3 z-20">
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-[#012D01]/70 hover:bg-[#012D01]/5 transition-colors">Cancel</button>
              <button type="submit" form="team-form" disabled={saving} className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#012D01]/10 disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? <div className="w-5 h-5 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" /> : <Save size={18} />}
                {currentMember ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
