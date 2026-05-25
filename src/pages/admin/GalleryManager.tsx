import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image as ImageIcon, Check, Loader2, Pencil } from 'lucide-react';
import { galleryService } from '../../services/gallery';
import AdminImageUpload from '../../components/admin/ImageUpload';
import { getImageUrl } from '../../utils/imageUrl';
import type { GalleryImage } from '../../types';

const categories = ['All', 'Interior', 'Architecture', 'Construction', 'Landscape'];

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Interior',
    url: '' as string,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadFieldKey, setUploadFieldKey] = useState(0);

  const fetchImages = async () => {
    try {
      const res = await galleryService.getAll();
      setImages(res.data || []);
    } catch {
      console.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const openUploadModal = () => {
    setEditingImage(null);
    setFormData({ title: '', category: 'Interior', url: '' });
    setImageFile(null);
    setUploadFieldKey((k) => k + 1);
    setIsModalOpen(true);
  };
  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title || '',
      category: image.category || 'Interior',
      url: image.url || '',
    });
    setImageFile(null);
    setUploadFieldKey((k) => k + 1);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setImageFile(null);
    setEditingImage(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = formData.url.trim();
    if (!editingImage && !imageFile && !url) {
      alert('Add an image file or paste an image URL.');
      return;
    }
    setSaving(true);
    try {
      const body = new FormData();
      
      // Add image file or URL
      if (imageFile) {
        body.append('image', imageFile);
        console.log('📤 Uploading file:', imageFile.name, imageFile.type, imageFile.size, 'bytes');
      } else if (url) {
        body.append('url', url);
        console.log('📤 Uploading URL:', url);
      }
      
      // Add other fields
      body.append('title', formData.title || 'Untitled');
      body.append('category', formData.category);
      
      console.log('📤 FormData contents:');
      for (const [key, value] of body.entries()) {
        console.log(`  ${key}:`, value instanceof File ? `File(${value.name})` : value);
      }
      
      if (editingImage) {
        await galleryService.update(editingImage.id, body);
      } else {
        await galleryService.create(body);
      }
      
      // Refetch the gallery list to get the newly created image
      await fetchImages();
      
      closeModal();
      setFormData({ title: '', category: 'Interior', url: '' });
      setUploadFieldKey((k) => k + 1);
    } catch (error) {
      console.error('❌ Upload error:', error);
      const errorMsg = (error as { message?: string })?.message || 'Failed to upload image. Please try again.';
      alert(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedImages.length} image(s)?`)) return;
    setSaving(true);
    try {
      await Promise.all(selectedImages.map(id => galleryService.remove(id)));
      setImages(images.filter(img => !selectedImages.includes(img.id)));
      setSelectedImages([]);
    } catch {
      alert('Failed to delete some images.');
    } finally {
      setSaving(false);
    }
  };

  const deleteSingle = async (id: string) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await galleryService.remove(id);
      setImages(images.filter(img => img.id !== id));
      setSelectedImages(selectedImages.filter(imgId => imgId !== id));
    } catch {
      alert('Failed to delete image.');
    }
  };

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={36} className="animate-spin text-green-800" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-green-800 tracking-tight">
            Manage <span className="font-bold">Gallery</span>
          </h1>
          <p className="text-green-800/50 mt-1">Upload and organize property showcase images.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedImages.length > 0 && (
            <button 
              onClick={deleteSelected}
              className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors px-4 py-3 rounded-xl font-bold flex items-center gap-2"
            >
              <Trash2 size={18} /> Delete Selected ({selectedImages.length})
            </button>
          )}
          <button 
            onClick={openUploadModal}
            className="bg-green-800 text-brand-primary hover:bg-brand-primary hover:text-green-800 transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-800/10"
          >
            <Plus size={18} /> Upload Image
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              activeCategory === category 
                ? 'bg-brand-primary text-green-800 shadow-lg shadow-brand-primary/20 scale-105' 
                : 'bg-white text-green-800/60 border border-green-800/10 hover:border-brand-primary hover:text-green-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => {
            const isSelected = selectedImages.includes(image.id);
            return (
              <div 
                key={image.id} 
                className={`relative group rounded-3xl overflow-hidden aspect-square border-2 transition-all duration-300 ${
                  isSelected ? 'border-brand-primary scale-[0.98]' : 'border-transparent'
                }`}
              >
                <img 
                  src={getImageUrl(image.url)} 
                  alt={image.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-105' : 'group-hover:scale-110'}`} 
                />
                
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-linear-to-t from-green-800/90 via-green-800/20 to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                {/* Selection Checkbox (Top Left) */}
                <button 
                  onClick={() => toggleImageSelection(image.id)}
                  className={`absolute top-4 left-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                    isSelected 
                      ? 'bg-brand-primary border-brand-primary text-green-800' 
                      : 'border-white/50 bg-black/20 text-transparent hover:border-white'
                  }`}
                >
                  <Check size={14} className={isSelected ? 'block' : 'hidden'} />
                </button>

                {/* Card Actions */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(image);
                  }}
                  className="absolute top-4 right-14 p-2 bg-white/90 text-green-800 rounded-lg hover:bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  aria-label={`Edit ${image.title}`}
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSingle(image.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  aria-label={`Delete ${image.title}`}
                >
                  <Trash2 size={16} />
                </button>

                {/* Info (Bottom) */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 z-10 ${isSelected ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100'}`}>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-primary bg-green-800/60 backdrop-blur-sm px-2 py-1 rounded-md mb-2 inline-block">
                    {image.category}
                  </span>
                  <h3 className="text-white font-bold text-sm tracking-tight truncate">{image.title}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-green-800/5 flex flex-col items-center justify-center">
            <ImageIcon className="w-16 h-16 text-green-800/20 mb-4" />
            <p className="text-green-800/50 mb-4">No images found in this category.</p>
            <button 
              onClick={openUploadModal}
              className="text-brand-primary-dark font-bold hover:underline"
            >
              Upload your first image
            </button>
          </div>
        )}
      </div>

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-green-800/40 backdrop-blur-sm" onClick={closeModal}></div>
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-green-800/10">
              <h2 className="text-xl font-bold text-green-800">{editingImage ? 'Update Image' : 'Upload Image'}</h2>
              <button onClick={closeModal} className="p-2 rounded-full text-green-800/50 hover:bg-green-50">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGallerySubmit} className="p-6 space-y-6">
              <AdminImageUpload
                key={uploadFieldKey}
                label={editingImage ? 'Replace image file' : 'Image file'}
                value={editingImage ? formData.url : ''}
                onChange={() => {}}
                mode="deferred"
                onFileChange={setImageFile}
              />
              <div>
                <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">
                  Or image URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://api-ldsv1.greenstoneng.com/upload/…"
                  className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors text-sm"
                />
                <p className="text-xs text-green-800/45 mt-1">
                  {editingImage ? 'Leave the current URL as-is to keep the existing image, or choose a new file above.' : 'Provide a file above or a direct URL.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Image Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="E.g., Maitama Evening View"
                  className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-green-800/70 uppercase tracking-widest mb-2">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-green-50/30 border border-green-800/10 rounded-xl py-3 px-4 text-green-800 focus:outline-none focus:border-brand-primary transition-colors appearance-none"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl font-bold text-green-800/70 hover:bg-green-800/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving || (!imageFile && !formData.url.trim())}
                  className="bg-green-800 text-brand-primary hover:bg-brand-primary hover:text-green-800 transition-colors px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-800/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {saving ? 'Saving...' : editingImage ? 'Update Image' : 'Save Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
