import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useToast } from './ui/Toast';
import { leadService } from '../services/leads';
import { validateLead } from '../utils/validators';
import { sanitizeObject } from '../utils/sanitize';
import contactBg from '../assets/waterfront-house-beach-with-beautiful-setting-sun-horizon.jpg';
import type { ValidationErrors } from '../types';

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      showToast('Please accept the privacy policy to proceed.', 'info');
      return;
    }

    // Validate
    const validation = validateLead(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Sanitize and submit
    setLoading(true);
    try {
      const sanitized = sanitizeObject(formData);
      await leadService.create(sanitized);
      showToast('Thank you! We will get back to you shortly.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setAgreed(false);
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to submit. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full text-white font-sans overflow-hidden">
      
      {/* ===== Image hero with solid white text ===== */}
      <div className="relative w-full h-[450px] md:h-[580px]">
        <img 
          src={contactBg}
          alt="Luxury Waterfront Property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent z-[1]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent"></div>

        <div className="absolute inset-0 flex items-end z-10">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1600px] pb-12 md:pb-16">
            <div className="flex items-end gap-3 md:gap-5">
              <span className="text-5xl md:text-7xl lg:text-9xl font-thin text-white/25 leading-none self-start mt-2">[</span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold uppercase tracking-tight leading-[1.08] text-white">
                Ready to discuss<br/>
                your <span className="text-brand-primary">future</span> home?
              </h2>
              <span className="text-5xl md:text-7xl lg:text-9xl font-thin text-white/25 leading-none self-end mb-2">]</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Dark form area ===== */}
      <div className="bg-[#080808]">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1600px] py-16 md:py-20">

          <p className="text-[13px] text-white/35 leading-relaxed font-medium max-w-sm mb-12">
            Leave your contact details, and our team will get in
            touch to help you choose the right apartment,
            answer your questions, and schedule a personal visit.
          </p>

          <form className="max-w-lg" onSubmit={handleSubmit}>
            
            <div className="border-b border-white/10 hover:border-white/25 transition-colors">
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                className="w-full bg-transparent text-[13px] text-white font-bold tracking-[0.2em] uppercase py-5 placeholder-white/20 focus:outline-none focus:placeholder-brand-primary/50 transition-colors"
              />
              {errors.name && <p className="text-red-400 text-xs pb-2 font-medium">{errors.name}</p>}
            </div>

            <div className="border-b border-white/10 hover:border-white/25 transition-colors">
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent text-[13px] text-white font-bold tracking-[0.2em] uppercase py-5 placeholder-white/20 focus:outline-none focus:placeholder-brand-primary/50 transition-colors"
              />
              {errors.email && <p className="text-red-400 text-xs pb-2 font-medium">{errors.email}</p>}
            </div>

            <div className="border-b border-white/10 hover:border-white/25 transition-colors">
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 (0) 803 304 0403"
                className="w-full bg-transparent text-[13px] text-white font-bold tracking-[0.2em] py-5 placeholder-white/20 focus:outline-none focus:placeholder-brand-primary/50 transition-colors"
              />
              {errors.phone && <p className="text-red-400 text-xs pb-2 font-medium">{errors.phone}</p>}
            </div>

            <div className="border-b border-white/10 hover:border-white/25 transition-colors">
              <input 
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="SUBJECT"
                className="w-full bg-transparent text-[13px] text-white font-bold tracking-[0.2em] uppercase py-5 placeholder-white/20 focus:outline-none focus:placeholder-brand-primary/50 transition-colors"
              />
            </div>

            <div className="border-b border-white/10 hover:border-white/25 transition-colors mt-4">
              <textarea 
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="YOUR MESSAGE"
                className="w-full bg-transparent text-[13px] text-white font-bold tracking-[0.2em] uppercase py-5 placeholder-white/20 focus:outline-none focus:placeholder-brand-primary/50 transition-colors resize-none mt-2"
              />
              {errors.message && <p className="text-red-400 text-xs pb-2 font-medium">{errors.message}</p>}
            </div>

            <label className="flex items-start gap-3 cursor-pointer group mt-8 mb-8">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-brand-primary w-3.5 h-3.5 cursor-pointer" 
              />
              <span className="text-[11px] text-white/20 leading-relaxed font-medium group-hover:text-white/35 transition-colors max-w-[300px]">
                By clicking the button, you accept the privacy
                policy and consent to the processing of personal data.
              </span>
            </label>

            <button 
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 text-[13px] font-bold text-white border border-white/20 px-8 py-4 rounded-full hover:bg-brand-primary hover:border-brand-primary hover:text-black transition-all duration-300 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Get A Free Consultation
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </section>
  );
};

export default Contact;
