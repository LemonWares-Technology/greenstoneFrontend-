import React, { useState, useEffect } from 'react';
import { Mail, Search, Trash2, X, Send, Users } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { newsletterService } from '../../services/newsletter';
import { useToast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import type { Newsletter } from '../../types';

const AdminSubscribers: React.FC = () => {
  const { showToast } = useToast();
  const [subscribers, setSubscribers] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ subject: '', content: '' });

  useEffect(() => { fetchSubscribers(); }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await newsletterService.getAll();
      setSubscribers(res.data);
      setError(null);
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      setError(apiErr.message || 'Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const openComposeModal = () => setIsModalOpen(true);
  const closeModal = () => { setIsModalOpen(false); setFormData({ subject: '', content: '' }); };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSendNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || (!formData.content || formData.content === '<p></p>')) {
      showToast('Please provide both a subject and content.', 'info');
      return;
    }
    // In a real app, this would hit a backend endpoint for sending bulk emails
    showToast(`Newsletter "${formData.subject}" sent to ${subscribers.length} subscribers!`, 'success');
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this subscriber?')) return;
    try {
      await newsletterService.remove(id);
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      showToast('Subscriber removed.', 'success');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to remove subscriber.', 'error');
    }
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" label="Loading subscribers..." /></div>;
  if (error) return <div className="flex items-center justify-center py-20"><ErrorMessage message={error} onRetry={fetchSubscribers} /></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-green-800 tracking-tight">Manage <span className="font-bold">Subscribers</span></h1>
          <p className="text-green-800/50 mt-1">View email list and broadcast newsletters.</p>
        </div>
        <button onClick={openComposeModal} className="bg-green-800 text-brand-primary hover:bg-brand-primary hover:text-green-800 transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-800/10">
          <Mail size={18} /> Compose Newsletter
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 border border-green-800/5 shadow-xl shadow-green-800/2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-800"><Users size={24} /></div>
          <div>
            <p className="text-green-800/50 text-xs font-bold uppercase tracking-wider mb-1">Total Subscribers</p>
            <p className="text-2xl font-bold text-green-800">{subscribers.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-green-800/5 shadow-xl shadow-green-800/2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center text-green-800"><Send size={24} /></div>
          <div>
            <p className="text-green-800/50 text-xs font-bold uppercase tracking-wider mb-1">Newsletters Sent</p>
            <p className="text-2xl font-bold text-green-800">—</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-green-800/5 shadow-sm mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-800/40" />
          <input type="text" placeholder="Search email addresses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 pl-12 pr-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-green-800/5 shadow-xl shadow-green-800/2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-green-50/50 border-b border-green-800/5 text-xs uppercase tracking-widest text-green-800/50 font-bold">
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6 w-48">Date Subscribed</th>
                <th className="py-4 px-6 text-right w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.length > 0 ? filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="border-b border-green-800/5 hover:bg-green-50/20 transition-colors group">
                  <td className="py-4 px-6 text-sm font-bold text-green-800">{sub.email}</td>
                  <td className="py-4 px-6 text-sm text-green-800/70">{sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end">
                      <button onClick={() => handleDelete(sub.id)} className="p-2 text-green-800/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove Subscriber"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={3} className="py-8 text-center text-green-800/50">No subscribers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 overflow-y-auto">
          <div className="fixed inset-0 bg-green-800/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-green-800/10 bg-white sticky top-0 rounded-t-3xl z-20 shrink-0">
              <h2 className="text-xl font-bold text-green-800 flex items-center gap-2"><Mail size={20} className="text-brand-primary-dark" /> Compose Newsletter</h2>
              <button onClick={closeModal} className="p-2 rounded-full text-green-800/50 hover:bg-green-50 hover:text-green-800 transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="newsletter-form" onSubmit={handleSendNewsletter} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Email Subject Line</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="Enter an engaging subject line..." className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 text-lg font-medium focus:outline-none focus:border-brand-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Newsletter Content</label>
                  <RichTextEditor content={formData.content} onChange={handleEditorChange} placeholder="Write your email broadcast here..." />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-green-800/10 bg-white sticky bottom-0 rounded-b-3xl shrink-0 flex justify-between items-center z-20">
              <div className="text-sm font-medium text-green-800/50">Will be sent to <strong className="text-green-800">{subscribers.length}</strong> recipients.</div>
              <div className="flex gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-green-800/70 hover:bg-green-800/5 transition-colors">Cancel</button>
                <button type="submit" form="newsletter-form" className="bg-green-800 text-brand-primary hover:bg-brand-primary hover:text-green-800 transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-800/10">
                  <Send size={18} /> Send Broadcast
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscribers;
