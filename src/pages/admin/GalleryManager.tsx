import React, { useState } from 'react';
import { Plus, Trash2, X, Image as ImageIcon, Check } from 'lucide-react';

import proj1 from '../../assets/project_interior_1.png';
import proj2 from '../../assets/project_interior_2.png';
import proj3 from '../../assets/project_interior_3.png';

// Mock Data
const initialGallery = [
  { id: 1, url: proj1, category: 'Interior', title: 'Maitama Living Room' },
  { id: 2, url: proj2, category: 'Architecture', title: 'F.O Terraces Facade' },
  { id: 3, url: proj3, category: 'Interior', title: 'Panache Bedroom' },
  { id: 4, url: proj1, category: 'Construction', title: 'Site Overview Phase 1' },
  { id: 5, url: proj2, category: 'Landscape', title: 'Guzape Gardens' },
  { id: 6, url: proj3, category: 'Architecture', title: 'Bourdillon Aerial' },
];

const categories = ['All', 'Interior', 'Architecture', 'Construction', 'Landscape'];

const AdminGallery = () => {
  const [images, setImages] = useState(initialGallery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImages, setSelectedImages] = useState([]);

  // Upload Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Interior',
    // In a real app, 'file' would hold the object to upload
  });

  const openUploadModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // Mocking upload by taking one of our static images
    const newImage = {
      id: Date.now(),
      url: proj1, // Mock generated URL
      title: formData.title || 'New Upload',
      category: formData.category
    };
    
    setImages([newImage, ...images]);
    closeModal();
    setFormData({ title: '', category: 'Interior' });
  };

  const toggleImageSelection = (id) => {
    setSelectedImages(prev => 
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedImages.length} image(s)?`)) {
      setImages(images.filter(img => !selectedImages.includes(img.id)));
      setSelectedImages([]);
    }
  };

  const deleteSingle = (id) => {
    if (window.confirm('Delete this image?')) {
      setImages(images.filter(img => img.id !== id));
      setSelectedImages(selectedImages.filter(imgId => imgId !== id));
    }
  };

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-[#012D01] tracking-tight">
            Manage <span className="font-bold">Gallery</span>
          </h1>
          <p className="text-[#012D01]/50 mt-1">Upload and organize property showcase images.</p>
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
            className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#012D01]/10"
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
                ? 'bg-brand-primary text-[#012D01] shadow-lg shadow-brand-primary/20 scale-105' 
                : 'bg-white text-[#012D01]/60 border border-[#012D01]/10 hover:border-brand-primary hover:text-[#012D01]'
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
                  src={image.url} 
                  alt={image.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-105' : 'group-hover:scale-110'}`} 
                />
                
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#012D01]/90 via-[#012D01]/20 to-transparent transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                {/* Selection Checkbox (Top Left) */}
                <button 
                  onClick={() => toggleImageSelection(image.id)}
                  className={`absolute top-4 left-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                    isSelected 
                      ? 'bg-brand-primary border-brand-primary text-[#012D01]' 
                      : 'border-white/50 bg-black/20 text-transparent hover:border-white'
                  }`}
                >
                  <Check size={14} className={isSelected ? 'block' : 'hidden'} />
                </button>

                {/* Single Delete (Top Right) */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSingle(image.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 size={16} />
                </button>

                {/* Info (Bottom) */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 z-10 ${isSelected ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100'}`}>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-primary bg-[#012D01]/60 backdrop-blur-sm px-2 py-1 rounded-md mb-2 inline-block">
                    {image.category}
                  </span>
                  <h3 className="text-white font-bold text-sm tracking-tight truncate">{image.title}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-[#012D01]/5 flex flex-col items-center justify-center">
            <ImageIcon className="w-16 h-16 text-[#012D01]/20 mb-4" />
            <p className="text-[#012D01]/50 mb-4">No images found in this category.</p>
            <button 
              onClick={openUploadModal}
              className="text-brand-primary-dark font-bold hover:underline"
            >
              Upload your first image
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#012D01]/40 backdrop-blur-sm" onClick={closeModal}></div>
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#012D01]/10">
              <h2 className="text-xl font-bold text-[#012D01]">Upload Image</h2>
              <button onClick={closeModal} className="p-2 rounded-full text-[#012D01]/50 hover:bg-[#E3F9F5]">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-6">
              
              {/* Drag & Drop Area */}
              <div>
                <div className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-[#012D01]/10 border-dashed rounded-2xl hover:bg-[#E3F9F5]/30 transition-colors cursor-pointer group bg-white">
                  <div className="space-y-2 text-center">
                    <div className="w-16 h-16 bg-[#E3F9F5] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Plus className="h-8 w-8 text-[#012D01]" />
                    </div>
                    <div className="flex text-sm justify-center">
                      <label className="relative cursor-pointer rounded-md font-bold text-brand-primary-dark hover:text-brand-primary focus-within:outline-none">
                        <span>Click to browse</span>
                        <input type="file" className="sr-only" accept="image/*" />
                      </label>
                      <p className="pl-1 text-[#012D01]/70">or drag and drop</p>
                    </div>
                    <p className="text-xs text-[#012D01]/40 font-medium">
                      High-res JPG, PNG, WEBP (Max 10MB)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Image Title (Optional)</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="E.g., Maitama Evening View"
                  className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors appearance-none"
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
                  className="px-6 py-3 rounded-xl font-bold text-[#012D01]/70 hover:bg-[#012D01]/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#012D01]/10"
                >
                  Upload & Save
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
