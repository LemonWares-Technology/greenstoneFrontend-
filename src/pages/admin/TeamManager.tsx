import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save, Send, FileEdit } from 'lucide-react';
import { teamService } from '../../services/team';
import { useToast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import type { TeamMember, TeamStatus } from '../../types';

interface TeamFormData {
  name: string;
  role: string;
  bio: string;
}

type StatusFilter = 'ALL' | TeamStatus;

const emptyForm: TeamFormData = { name: '', role: '', bio: '' };

// Members saved before drafts existed have no status — treat them as published.
const statusOf = (member: TeamMember): TeamStatus => (member.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED');

const AdminTeam: React.FC = () => {
  const { showToast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamFormData>(emptyForm);

  useEffect(() => { fetchTeam(); }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      // Admin endpoint — drafts included.
      const res = await teamService.getAllAdmin();
      setTeamMembers(res?.data || []);
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

  // `status` is the state the member should end up in once saved.
  const saveMember = async (status: TeamStatus) => {
    if (!formData.name.trim() || !formData.role.trim() || !formData.bio.trim()) {
      showToast('Name, role and biography are all required.', 'error');
      return;
    }
    setSaving(true);
    try {
      if (currentMember) {
        await teamService.update(currentMember.id, { ...formData, status });
        showToast(
          status === 'PUBLISHED'
            ? statusOf(currentMember) === 'DRAFT' ? 'Team member published!' : 'Team member updated!'
            : statusOf(currentMember) === 'PUBLISHED' ? 'Team member moved to draft.' : 'Draft saved.',
          'success'
        );
      } else {
        await teamService.create({ ...formData, status });
        showToast(status === 'PUBLISHED' ? 'Team member published!' : 'Draft saved.', 'success');
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

  // The form's native submit keeps the member's current status (new members default to draft).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMember(currentMember ? statusOf(currentMember) : 'DRAFT');
  };

  const handleToggleStatus = async (member: TeamMember) => {
    const nextStatus: TeamStatus = statusOf(member) === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    if (nextStatus === 'DRAFT' && !window.confirm(`Move "${member.name}" back to draft? They will no longer appear on the website.`)) return;
    setStatusUpdatingId(member.id);
    try {
      await teamService.updateStatus(member.id, nextStatus);
      setTeamMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, status: nextStatus } : m)));
      showToast(nextStatus === 'PUBLISHED' ? 'Team member published — now live on the website.' : 'Moved to draft — hidden from the website.', 'success');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to update status.', 'error');
    } finally {
      setStatusUpdatingId(null);
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

  const publishedCount = teamMembers.filter((m) => statusOf(m) === 'PUBLISHED').length;
  const draftCount = teamMembers.length - publishedCount;

  const filteredTeam = teamMembers
    .filter((m) => statusFilter === 'ALL' || statusOf(m) === statusFilter)
    .filter((m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filterTabs: { key: StatusFilter; label: string; count: number }[] = [
    { key: 'ALL', label: 'All', count: teamMembers.length },
    { key: 'PUBLISHED', label: 'Published', count: publishedCount },
    { key: 'DRAFT', label: 'Drafts', count: draftCount },
  ];

  if (loading) return <div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" label="Loading team..." /></div>;
  if (error) return <div className="flex items-center justify-center py-20"><ErrorMessage message={error} onRetry={fetchTeam} /></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-green-800 tracking-tight">Manage <span className="font-bold">Team</span></h1>
          <p className="text-green-800/50 mt-1">Add, edit, or remove executives and engineers. Drafts stay hidden from the website.</p>
        </div>
        <button onClick={() => openModal()} className="bg-green-800 text-brand-primary hover:bg-brand-primary hover:text-green-800 transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-800/10">
          <Plus size={18} /> Add Member
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-green-800/5 shadow-sm mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-800/40" />
          <input type="text" placeholder="Search team members by name or role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 pl-12 pr-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
        </div>
        <div className="flex items-center gap-1 bg-green-50/50 border border-green-800/10 rounded-xl p-1 shrink-0">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                statusFilter === tab.key ? 'bg-green-800 text-brand-primary shadow-sm' : 'text-green-800/60 hover:text-green-800 hover:bg-green-800/5'
              }`}
            >
              {tab.label} <span className="opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeam.length > 0 ? filteredTeam.map((member) => {
          const status = statusOf(member);
          const isDraft = status === 'DRAFT';
          return (
            <div key={member.id} className={`bg-white rounded-3xl border p-6 shadow-xl shadow-green-800/2 hover:border-green-800/10 transition-all flex flex-col ${isDraft ? 'border-amber-400/40 border-dashed' : 'border-green-800/5'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-800 font-bold text-xl border-2 ${isDraft ? 'border-amber-400' : 'border-brand-primary'}`}>
                  {member.name.charAt(0)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(member)}
                    disabled={statusUpdatingId === member.id}
                    className={`p-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${isDraft ? 'text-green-800/50 hover:text-green-700 hover:bg-green-50' : 'text-green-800/50 hover:text-amber-600 hover:bg-amber-50'}`}
                    title={isDraft ? 'Publish to website' : 'Move back to draft'}
                  >
                    {statusUpdatingId === member.id
                      ? <div className="w-4 h-4 border-2 border-green-800/20 border-t-green-800 rounded-full animate-spin" />
                      : isDraft ? <Send size={16} /> : <FileEdit size={16} />}
                  </button>
                  <button onClick={() => openModal(member)} className="p-2 text-green-800/50 hover:text-brand-primary hover:bg-green-50 rounded-lg transition-colors" title="Edit"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(member.id)} className="p-2 text-green-800/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isDraft ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {isDraft ? 'Draft' : 'Published'}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-green-800 mb-1">{member.name}</h3>
                <p className="text-xs uppercase tracking-widest font-bold text-brand-primary-dark">{member.role}</p>
              </div>
              <p className="text-sm text-green-800/70 leading-relaxed font-medium flex-1 line-clamp-4">{member.bio}</p>
            </div>
          );
        }) : (
          <div className="col-span-full py-12 text-center text-green-800/50 bg-white rounded-3xl border border-green-800/5">
            {statusFilter === 'DRAFT' ? 'No drafts yet.' : 'No team members found.'}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 overflow-y-auto">
          <div className="fixed inset-0 bg-green-800/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-green-800/10 bg-white sticky top-0 rounded-t-3xl z-20 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-green-800">{currentMember ? 'Edit Team Member' : 'Add Team Member'}</h2>
                {currentMember && (
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusOf(currentMember) === 'DRAFT' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {statusOf(currentMember) === 'DRAFT' ? 'Draft' : 'Published'}
                  </span>
                )}
              </div>
              <button onClick={closeModal} className="p-2 rounded-full text-green-800/50 hover:bg-green-50 hover:text-green-800 transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="team-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g., Dr. Yemi Osindero" className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Role / Title</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} required placeholder="e.g., Technical Director" className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Biography</label>
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} required rows={5} placeholder="Enter professional biography and qualifications..." className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors resize-none" />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-green-800/10 bg-white sticky bottom-0 rounded-b-3xl shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 z-20">
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-green-800/70 hover:bg-green-800/5 transition-colors">Cancel</button>
              <button
                type="button"
                onClick={() => saveMember('DRAFT')}
                disabled={saving}
                className="px-6 py-3 rounded-xl font-bold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileEdit size={18} />
                {currentMember && statusOf(currentMember) === 'PUBLISHED' ? 'Move to Draft' : 'Save as Draft'}
              </button>
              <button
                type="button"
                onClick={() => saveMember('PUBLISHED')}
                disabled={saving}
                className="bg-green-800 text-brand-primary hover:bg-brand-primary hover:text-green-800 transition-colors px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-800/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? <div className="w-5 h-5 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" /> : currentMember && statusOf(currentMember) === 'PUBLISHED' ? <Save size={18} /> : <Send size={18} />}
                {currentMember && statusOf(currentMember) === 'PUBLISHED' ? 'Save Changes' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
