import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { blogService } from '../../services/blogs';
import { useToast } from '../../components/ui/Toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import type { Blog } from '../../types';

interface BlogFormData {
  title: string;
  author: string;
  role: string;
  tags: string;
  image: string;
  excerpt: string;
  content: string;
}

const emptyForm: BlogFormData = { title: '', author: '', role: '', tags: '', image: '', excerpt: '', content: '' };

const AdminBlog: React.FC = () => {
  const { showToast } = useToast();
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPost, setCurrentPost] = useState<Blog | null>(null);
  const [sendNewsletter, setSendNewsletter] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>(emptyForm);

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogService.getAll();
      setPosts(res.data);
      setError(null);
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      setError(apiErr.message || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (post: Blog | null = null) => {
    if (post) {
      setCurrentPost(post);
      setFormData({
        title: post.title,
        author: post.author,
        role: post.role,
        tags: (post.tags || []).join(', '),
        image: post.image || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
      });
      setSendNewsletter(false);
    } else {
      setCurrentPost(null);
      setFormData(emptyForm);
      setSendNewsletter(true);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: formData.title,
      author: formData.author,
      role: formData.role,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      image: formData.image,
      excerpt: formData.excerpt,
      content: formData.content,
      ...(sendNewsletter && !currentPost ? { sendNewsletter: true } : {}),
    };

    try {
      if (currentPost) {
        await blogService.update(currentPost.id, payload);
        showToast('Blog post updated successfully!', 'success');
      } else {
        const res = await blogService.create(payload);
        showToast(res.message || 'Blog post published!', 'success');
      }
      closeModal();
      fetchBlogs(); // Refresh list
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to save post.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await blogService.remove(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast('Post deleted.', 'success');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to delete post.', 'error');
    }
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center py-20"><LoadingSpinner size="lg" label="Loading posts..." /></div>;
  }

  if (error) {
    return <div className="flex items-center justify-center py-20"><ErrorMessage message={error} onRetry={fetchBlogs} /></div>;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-[#012D01] tracking-tight">
            Manage <span className="font-bold">Blog Posts</span>
          </h1>
          <p className="text-[#012D01]/50 mt-1">Add, edit, or remove articles and insights.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#012D01]/10"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#012D01]/5 shadow-sm mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#012D01]/40" />
          <input 
            type="text" 
            placeholder="Search posts by title or author..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 pl-12 pr-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-[#012D01]/5 shadow-xl shadow-[#012D01]/2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#E3F9F5]/50 border-b border-[#012D01]/5 text-xs uppercase tracking-widest text-[#012D01]/50 font-bold">
                <th className="py-4 px-6">Post Title</th>
                <th className="py-4 px-6 w-48">Author</th>
                <th className="py-4 px-6 w-48">Tags</th>
                <th className="py-4 px-6 text-right w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-[#012D01]/5 hover:bg-[#E3F9F5]/20 transition-colors group">
                    <td className="py-4 px-6 text-sm font-bold text-[#012D01] group-hover:text-brand-primary-dark transition-colors line-clamp-2 pr-12">{post.title}</td>
                    <td className="py-4 px-6 text-sm">
                      <p className="text-[#012D01] font-medium">{post.author}</p>
                      <p className="text-[#012D01]/50 text-xs">{post.role}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {(post.tags || []).slice(0, 2).map((tag, i) => (
                          <span key={i} className="bg-[#E3F9F5] text-[#012D01] px-2 py-0.5 rounded text-[10px] font-bold border border-brand-primary/30 uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                        {(post.tags || []).length > 2 && (
                          <span className="text-[#012D01]/30 text-xs font-bold px-1">+{(post.tags || []).length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openModal(post)} className="p-2 text-[#012D01]/50 hover:text-brand-primary hover:bg-[#E3F9F5] rounded-lg transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="p-2 text-[#012D01]/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-[#012D01]/50">No blog posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#012D01]/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#012D01]/10 bg-white sticky top-0 rounded-t-3xl z-20 shrink-0">
              <h2 className="text-xl font-bold text-[#012D01]">{currentPost ? 'Edit Post' : 'Create New Post'}</h2>
              <button onClick={closeModal} className="p-2 rounded-full text-[#012D01]/50 hover:bg-[#E3F9F5] hover:text-[#012D01] transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Post Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="Enter an engaging title..." className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] text-lg font-medium focus:outline-none focus:border-brand-primary transition-colors" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Author Name</label>
                    <input type="text" name="author" value={formData.author} onChange={handleInputChange} required placeholder="e.g., Greenstone Team" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Author Role / Category</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} required placeholder="e.g., Market Insights" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Tags (comma separated)</label>
                    <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} required placeholder="e.g., Investment, Lagos" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Cover Image URL</label>
                    <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Excerpt</label>
                    <input type="text" name="excerpt" value={formData.excerpt} onChange={handleInputChange} placeholder="Short preview of the blog post..." className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Post Content</label>
                  <RichTextEditor content={formData.content} onChange={handleEditorChange} placeholder="Write your blog post content here..." />
                </div>

                {/* Image Upload placeholder */}
                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Upload Cover Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#012D01]/10 border-dashed rounded-xl hover:bg-[#E3F9F5]/30 transition-colors cursor-pointer group">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-[#012D01]/30 group-hover:text-brand-primary transition-colors" />
                      <div className="flex text-sm text-[#012D01]/70 justify-center">
                        <label className="relative cursor-pointer rounded-md font-medium text-brand-primary-dark hover:text-brand-primary">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-[#012D01]/50">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Newsletter notification checkbox */}
                <div className="p-4 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex items-start pt-1">
                      <input type="checkbox" checked={sendNewsletter} onChange={(e) => setSendNewsletter(e.target.checked)} className="w-4 h-4 rounded text-brand-primary-dark border-[#012D01]/20 focus:ring-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#012D01]">Send Newsletter Notification</p>
                      <p className="text-xs text-[#012D01]/60 leading-relaxed mt-0.5">
                        Automatically email all subscribers a link to this {currentPost ? 'updated' : 'new'} post when you save.
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-[#012D01]/10 bg-white sticky bottom-0 rounded-b-3xl shrink-0 flex justify-end gap-3 z-20">
              <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-[#012D01]/70 hover:bg-[#012D01]/5 transition-colors">Cancel</button>
              <button type="submit" form="blog-form" disabled={saving} className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#012D01]/10 disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? <div className="w-5 h-5 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" /> : <Save size={18} />}
                {currentPost ? 'Save Changes' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
