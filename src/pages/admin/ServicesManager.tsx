import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Sun, Wind, Trees, Compass } from 'lucide-react';

// Map string icon names to actual Lucide components
const IconMap = {
  Sun: Sun,
  Wind: Wind,
  Trees: Trees,
  Compass: Compass,
};

// Mock Data
const initialServices = [
  {
    id: 1,
    title: 'Property Acquisition & Development',
    iconName: 'Sun',
    description: 'We develop well-designed, competitively priced real estate. Our portfolio comprises residential, commercial, and mixed-use properties across prime locations.',
  },
  {
    id: 2,
    title: 'Property Management',
    iconName: 'Compass',
    description: 'Serving as residential and industrial management specialists, we deliver a service that provides integrity, professionalism, and peace of mind to our clients.',
  },
  {
    id: 3,
    title: 'Real Estate Brokerage',
    iconName: 'Trees',
    description: 'Expert guidance in navigating the real estate market, ensuring our clients formulate and execute the most profitable transactions.',
  },
  {
    id: 4,
    title: 'Real Estate Loan Syndication',
    iconName: 'Wind',
    description: 'We improve the lot of individuals and corporate clients by structuring and securing tailored investment finance solutions.',
  }
];

const availableIcons = ['Sun', 'Wind', 'Trees', 'Compass'];

const AdminServices = () => {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    iconName: 'Sun',
    description: ''
  });

  const openModal = (service = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({ ...service });
    } else {
      setCurrentService(null);
      setFormData({ title: '', iconName: 'Sun', description: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentService) {
      // Edit
      setServices(services.map(s => s.id === currentService.id ? { ...formData, id: s.id } : s));
    } else {
      // Add
      setServices([...services, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this service offering?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header & Actions */}
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => {
            const IconComponent = IconMap[service.iconName] || Sun;
            return (
              <div 
                key={service.id} 
                className="bg-white rounded-3xl p-8 border border-[#012D01]/5 shadow-xl shadow-[#012D01]/2 flex flex-col hover:border-brand-primary/50 transition-colors group relative overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-14 h-14 bg-[#E3F9F5] rounded-2xl flex items-center justify-center border border-brand-primary/30 group-hover:bg-brand-primary group-hover:border-brand-primary transition-colors text-[#012D01]">
                    <IconComponent size={24} />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openModal(service)}
                      className="p-2 text-[#012D01]/30 hover:text-brand-primary hover:bg-[#E3F9F5] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-[#012D01]/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-bold text-[#012D01] mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-sm text-[#012D01]/60 leading-relaxed font-medium">
                    {service.description}
                  </p>
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-[#012D01]/40 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#012D01]/10 bg-white rounded-t-3xl">
              <h2 className="text-xl font-bold text-[#012D01]">
                {currentService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full text-[#012D01]/50 hover:bg-[#E3F9F5] hover:text-[#012D01] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Service Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Property Management"
                    className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-3">Service Icon</label>
                  <div className="flex flex-wrap gap-4">
                    {availableIcons.map((iconName) => {
                      const IconComponent = IconMap[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, iconName }))}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                            formData.iconName === iconName 
                              ? 'bg-brand-primary border-brand-primary text-[#012D01] ring-4 ring-brand-primary/20 scale-110' 
                              : 'bg-white border-[#012D01]/10 text-[#012D01]/40 hover:border-brand-primary/50'
                          }`}
                        >
                          <IconComponent size={24} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D01]/70 uppercase tracking-widest mb-2">Detailed Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Describe what this service entails..."
                    className="w-full bg-[#E3F9F5]/30 border border-[#012D01]/10 rounded-xl py-3 px-4 text-[#012D01] focus:outline-none focus:border-brand-primary transition-colors resize-none"
                  ></textarea>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-[#012D01]/10 bg-[#E3F9F5]/50 rounded-b-3xl flex justify-end gap-3">
              <button 
                type="button" 
                onClick={closeModal}
                className="px-6 py-3 rounded-xl font-bold text-[#012D01]/70 hover:bg-white hover:shadow-sm transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="service-form"
                className="bg-[#012D01] text-brand-primary hover:bg-brand-primary hover:text-[#012D01] transition-colors px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#012D01]/10"
              >
                <Save size={18} /> {currentService ? 'Save Changes' : 'Create Service'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
