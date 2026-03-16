import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Building2, ShieldCheck, KeyRound, Landmark, Leaf, Sun, Wind, Trees, Compass } from 'lucide-react';
import { serviceService } from '../../services/services';
import { useToast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import type { Service } from '../../types';

const IconMap: Record<string, React.ElementType> = {
  Building2, ShieldCheck, KeyRound, Landmark, Leaf, Sun, Wind, Trees, Compass,
};

const availableIcons = Object.keys(IconMap);

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  image: string;
  highlights: string;
}

const emptyForm: ServiceFormData = { title: '', description: '', icon: 'Building2', image: '', highlights: '' };

const AdminServices: React.FC = () => {
  const { showToast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(emptyForm);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await serviceService.getAll();
      setServices(res.data);
      setError(null);
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      setError(apiErr.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (service: Service | null = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon || 'Building2',
        image: service.image || '',
        highlights: (service.highlights || []).join(', '),
      });
    } else {
      setCurrentService(null);
      setFormData(emptyForm);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setCurrentService(null); };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      image: formData.image || undefined,
      highlights: formData.highlights.split(',').map((h) => h.trim()).filter(Boolean),
    };

    try {
      if (currentService) {
        await serviceService.update(currentService.id, payload);
        showToast('Service updated successfully!', 'success');
      } else {
        await serviceService.create(payload);
        showToast('Service created!', 'success');
      }
      closeModal();
      fetchServices();
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to save service.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this service?')) return;
    try {
      await serviceService.remove(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      showToast('Service deleted.', 'success');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to delete service.', 'error');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" label="Loading services..." /></div>;
  }

  if (error) {
    return <div className="flex items-center justify-center py-20"><ErrorMessage message={error} onRetry={fetchServices} /></div>;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-[#012D01] tracking-tight">
            Manage <span className="font-bold">Services</span>
          </h1>
          <p className="text-[#012D01]/50 mt-1">Configure the core capabilities offered by Greenstone.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#012D01]/10"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => {
            const IconComponent = IconMap[service.icon] || Building2;
            return (
              <div key={service.id} className="bg-white rounded-3xl p-8 border border-[#012D01]/5 shadow-xl shadow-[#012D01]/2 flex flex-col hover:border-brand-primary/50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-150 duration-700" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-14 h-14 bg-[#E3F9F5] rounded-2xl flex items-center justify-center border border-brand-primary/30 group-hover:bg-brand-primary group-hover:border-brand-primary transition-colors text-[#012D01]">
                    <IconComponent size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal(service)} className="p-2 text-[#012D01]/30 hover:text-brand-primary hover:bg-[#E3F9F5] rounded-lg transition-colors" title="Edit"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(service.id)} className="p-2 text-[#012D01]/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-bold text-[#012D01] mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-sm text-[#012D01]/60 leading-relaxed font-medium line-clamp-3">{service.description}</p>
                  {service.highlights && service.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {service.highlights.slice(0, 3).map((h, i) => (
                        <span key={i} className="bg-[#E3F9F5] text-[#012D01] px-2 py-0.5 rounded text-[10px] font-bold border border-brand-primary/30 uppercase tracking-wider">{h}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-[#012D01]/5">
            <p className="text-[#012D01]/50 mb-4">No services defined yet.</p>
            <button onClick={() => openModal()} className="text-brand-primary-dark font-bold hover:underline">Create your first service offering</button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#012D01]/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl relative z-10">
            <div className="flex items-center justify-between p-6 border-b border-[#012D01]/10 bg-white rounded-t-3xl">
              <h2 className="text-xl font-bold text-[#012D01]">{currentService ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={closeModal} className="p-2 rounded-full text-[#012D01]/50 hover:bg-[#E3F9F5] hover:text-[#012D01] transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6">
              <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Service Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g., Property Management" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-3">Icon</label>
                  <div className="flex flex-wrap gap-3">
                    {availableIcons.map((iconName) => {
                      const IC = IconMap[iconName];
                      return (
                        <button key={iconName} type="button" onClick={() => setFormData((prev) => ({ ...prev, icon: iconName }))} className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${formData.icon === iconName ? 'bg-brand-primary border-brand-primary text-[#012D01] ring-4 ring-brand-primary/20 scale-110' : 'bg-white border-[#012D01]/10 text-[#012D01]/40 hover:border-brand-primary/50'}`}>
                          <IC size={20} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={4} placeholder="Describe what this service entails..." className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors resize-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Highlights (comma separated)</label>
                  <input type="text" name="highlights" value={formData.highlights} onChange={handleInputChange} placeholder="e.g., Land banking, Mixed-use developments" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Image URL (optional)</label>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-[#012D01]/10 bg-[#E3F9F5]/50 rounded-b-3xl flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-[#012D01]/70 hover:bg-white hover:shadow-sm transition-all">Cancel</button>
              <button type="submit" form="service-form" disabled={saving} className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#012D01]/10 disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? <div className="w-5 h-5 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" /> : <Save size={18} />}
                {currentService ? 'Save Changes' : 'Create Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
