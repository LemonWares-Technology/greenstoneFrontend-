import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from './ui/Toast';
import { leadService } from '../services/leads';
import { validateLead } from '../utils/validators';
import { sanitizeObject } from '../utils/sanitize';
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

    const validation = validateLead(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

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
    <section id="contact" className="relative w-full bg-white text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* ===== Header ===== */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-brand-primary" aria-hidden />
<span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
            Get In Touch
          </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
            Let's Discuss Your Future <span className="font-bold text-brand-primary">Home</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-[#070707]/70 font-medium max-w-lg">
            Leave your details and our team will get in touch to help you choose the right property, answer your questions, and schedule a personal visit.
          </p>
        </div>

        {/* ===== Two-column: Form + Contact info ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="text-xs tracking-widest uppercase font-bold text-[#070707]/60 mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-[#fafafa] border border-[#070707]/8 rounded-xl px-5 py-4 text-base font-medium text-[#070707] placeholder-[#070707]/40 focus:outline-none focus:border-brand-primary/40 transition-colors"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs tracking-widest uppercase font-bold text-[#070707]/60 mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-[#fafafa] border border-[#070707]/8 rounded-xl px-5 py-4 text-base font-medium text-[#070707] placeholder-[#070707]/40 focus:outline-none focus:border-brand-primary/40 transition-colors"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div>
                  <label className="text-xs tracking-widest uppercase font-bold text-[#070707]/60 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 803 304 0403"
                    className="w-full bg-[#fafafa] border border-[#070707]/8 rounded-xl px-5 py-4 text-base font-medium text-[#070707] placeholder-[#070707]/40 focus:outline-none focus:border-brand-primary/40 transition-colors"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs tracking-widest uppercase font-bold text-[#070707]/60 mb-2 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Property enquiry"
                    className="w-full bg-[#fafafa] border border-[#070707]/8 rounded-xl px-5 py-4 text-base font-medium text-[#070707] placeholder-[#070707]/40 focus:outline-none focus:border-brand-primary/40 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs tracking-widest uppercase font-bold text-[#070707]/60 mb-2 block">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about what you're looking for..."
                  className="w-full bg-[#fafafa] border border-[#070707]/8 rounded-xl px-5 py-4 text-base font-medium text-[#070707] placeholder-[#070707]/40 focus:outline-none focus:border-brand-primary/40 transition-colors resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>}
              </div>

              {/* Checkbox + submit */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 accent-brand-primary w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-[#070707]/60 leading-relaxed font-medium max-w-[280px] group-hover:text-[#070707]/50 transition-colors">
                    I accept the privacy policy and consent to the processing of personal data.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 bg-brand-primary text-white text-sm font-bold px-7 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Get A Free Consultation
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Contact info cards */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 flex flex-col gap-4">

              {/* Phone */}
              <div className="bg-[#fafafa] rounded-2xl p-6 border border-[#070707]/5 hover:border-brand-primary/20 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/8 flex items-center justify-center group-hover:bg-brand-primary/15 transition-colors">
                    <Phone size={16} className="text-brand-primary" />
                  </div>
                  <span className="text-xs tracking-[0.3em] uppercase font-bold text-brand-primary">Phone</span>
                </div>
                <a href="tel:+2348033040403" className="text-base font-bold text-[#070707] hover:text-brand-primary transition-colors">
                  +234 (0) 803 304 0403
                </a>
                <p className="text-xs text-[#070707]/60 font-medium mt-1">Mon – Fri, 9am – 5pm WAT</p>
              </div>

              {/* Email */}
              <div className="bg-[#fafafa] rounded-2xl p-6 border border-[#070707]/5 hover:border-brand-primary/20 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/8 flex items-center justify-center group-hover:bg-brand-primary/15 transition-colors">
                    <Mail size={16} className="text-brand-primary" />
                  </div>
                  <span className="text-xs tracking-[0.3em] uppercase font-bold text-brand-primary">Email</span>
                </div>
                <a href="mailto:info@greenstoneltd.com" className="text-base font-bold text-[#070707] hover:text-brand-primary transition-colors">
                  info@greenstoneltd.com
                </a>
                <p className="text-xs text-[#070707]/60 font-medium mt-1">We respond within 24 hours</p>
              </div>

              {/* Office */}
              <div className="bg-[#fafafa] rounded-2xl p-6 border border-[#070707]/5 hover:border-brand-primary/20 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/8 flex items-center justify-center group-hover:bg-brand-primary/15 transition-colors">
                    <MapPin size={16} className="text-brand-primary" />
                  </div>
                  <span className="text-xs tracking-[0.3em] uppercase font-bold text-brand-primary">Office</span>
                </div>
                <p className="text-base font-bold text-[#070707]">Lagos, Nigeria</p>
                <p className="text-xs text-[#070707]/60 font-medium mt-1">Schedule a visit to our showroom</p>
              </div>

              {/* Trust strip */}
              <div className="mt-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[#070707]/10" aria-hidden />
                <span className="text-xs tracking-widest uppercase text-[#070707]/50 font-bold">
                  Trusted by 120+ clients since 2002
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
