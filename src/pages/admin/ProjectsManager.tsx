import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import AdminImageUpload from '../../components/admin/ImageUpload';
import { projectService } from '../../services/projects';
import { useToast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import type { Project } from '../../types';

interface ProjectFormData {
  name: string;
  location: string;
  status: string;
  value: string;
  image: string;
  description: string;
}

const emptyForm: ProjectFormData = { name: '', location: '', status: '', value: '', image: '', description: '' };

const AdminProjects: React.FC = () => {
  const { showToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectService.getAll();
      setProjects(res?.data || []);
      setError(null);
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      setError(apiErr.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project: Project | null = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        name: project.name,
        location: project.location,
        status: project.status,
        value: project.value || '',
        image: project.image || '',
        description: project.description || '',
      });
    } else {
      setCurrentProject(null);
      setFormData(emptyForm);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setCurrentProject(null); };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentProject) {
        await projectService.update(currentProject.id, formData);
        showToast('Project updated!', 'success');
      } else {
        await projectService.create(formData);
        showToast('Project created!', 'success');
      }
      closeModal();
      fetchProjects();
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to save project.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectService.remove(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Project deleted.', 'success');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to delete project.', 'error');
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" label="Loading projects..." /></div>;
  if (error) return <div className="flex items-center justify-center py-20"><ErrorMessage message={error} onRetry={fetchProjects} /></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-green-800 tracking-tight">Manage <span className="font-bold">Projects</span></h1>
          <p className="text-green-800/50 mt-1">Add, edit, or remove signature developments.</p>
        </div>
        <button onClick={() => openModal()} className="bg-green-800 text-brand-primary hover:bg-brand-primary hover:text-green-800 transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-800/10">
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-green-800/5 shadow-sm mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-800/40" />
          <input type="text" placeholder="Search projects by name or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 pl-12 pr-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-green-800/5 shadow-xl shadow-green-800/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-green-50/50 border-b border-green-800/5 text-xs uppercase tracking-widest text-green-800/50 font-bold">
                <th className="py-4 px-6">Project Name</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Value</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-green-800/5 hover:bg-green-50/20 transition-colors group">
                  <td className="py-4 px-6 text-sm font-bold text-green-800 group-hover:text-brand-primary-dark transition-colors">{project.name}</td>
                  <td className="py-4 px-6 text-sm text-green-800/70">{project.location}</td>
                  <td className="py-4 px-6 text-sm"><span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-brand-primary/30">{project.status}</span></td>
                  <td className="py-4 px-6 text-sm font-medium text-green-800">{project.value || '—'}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openModal(project)} className="p-2 text-green-800/50 hover:text-brand-primary hover:bg-green-50 rounded-lg transition-colors" title="Edit"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 text-green-800/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-8 text-center text-green-800/50">No projects found.</td></tr>
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
              <h2 className="text-xl font-bold text-green-800">{currentProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={closeModal} className="p-2 rounded-full text-green-800/50 hover:bg-green-50 hover:text-green-800 transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Project Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Completion Status</label>
                    <input type="text" name="status" value={formData.status} onChange={handleInputChange} required placeholder="e.g., 35% Completed" className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Estimated Value</label>
                    <input type="text" name="value" value={formData.value} onChange={handleInputChange} placeholder="e.g., N 3.9 Billion" className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                </div>
                <AdminImageUpload
                  label="Featured Image"
                  value={formData.image}
                  onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                  required
                />
                <div>
                  <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Project Description</label>
                  <RichTextEditor content={formData.description} onChange={handleEditorChange} placeholder="Describe the project scope, amenities, and significance..." />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-green-800/10 bg-white sticky bottom-0 rounded-b-3xl shrink-0 flex justify-end gap-3 z-20">
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-green-800/70 hover:bg-green-800/5 transition-colors">Cancel</button>
              <button type="submit" form="project-form" disabled={saving} className="bg-green-800 text-brand-primary hover:bg-brand-primary hover:text-green-800 transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-800/10 disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? <div className="w-5 h-5 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" /> : <Save size={18} />}
                {currentProject ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
