import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogComponent from '../components/Blog';
import { Mail } from 'lucide-react';
import { newsletterService } from '../services/newsletter';
import { validateNewsletter } from '../utils/validators';
import { useToast } from '../components/ui/Toast';

const Blog: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateNewsletter(email);
    if (!validation.isValid) {
      showToast(validation.errors.email || 'Please enter a valid email.', 'error');
      return;
    }

    setSubscribing(true);
    try {
      const res = await newsletterService.subscribe(email.trim());
      showToast(res.message || 'Successfully subscribed!', 'success');
      setEmail('');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      showToast(apiErr.message || 'Failed to subscribe. Please try again.', 'error');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      <Navbar />
      
      {/* Quick Hero */}
      <div className="pt-24 pb-8 px-6 md:px-12 lg:px-24 container mx-auto max-w-[1600px] flex flex-col items-center text-center">
        <span className="text-[10px] tracking-[0.3em] text-brand-primary uppercase font-bold flex items-center justify-center gap-3 mb-6 bg-brand-primary/10 px-5 py-2.5 rounded-full border border-brand-primary/20">
          [ INSIGHTS ]
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
          News & <span className="font-bold">Perspectives</span>
        </h1>
        <p className="mt-8 text-white/60 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
          Stay updated with the latest trends in luxury real estate, market analyses, and news from Greenstone Developments Ltd.
        </p>
      </div>

      {/* Main Blog Component content */}
      <div className="w-full">
        <BlogComponent />
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1600px] py-24 pt-0">
         <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-xl relative z-10 w-full lg:w-auto text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">Subscribe to our <span className="font-bold text-brand-primary">Newsletter</span></h2>
              <p className="text-white/50 text-sm font-medium leading-relaxed">Join our exclusive mailing list to receive early access to new developments, investment opportunities, and industry insights directly in your inbox.</p>
            </div>
            
            <div className="w-full lg:w-auto flex-1 max-w-xl relative z-10">
              <form className="flex flex-col sm:flex-row w-full gap-4" onSubmit={handleSubscribe}>
                <div className="relative flex-1">
                  <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..." 
                    className="w-full bg-[#111] border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors" 
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribing}
                  className="bg-brand-primary text-[#050505] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
