import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import { validateLogin } from '../../utils/validators';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import type { ValidationErrors } from '../../types';

const AdminLogin: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side validation
    const validation = validateLogin(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back!', 'success');
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      const message = apiErr.message || 'Login failed. Please try again.';
      showToast(message, 'error');
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#012D01] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-primary text-[#012D01] font-black text-2xl mb-5 shadow-lg shadow-brand-primary/30">
            G
          </div>
          <h1 className="text-3xl font-light text-white tracking-tight">
            Admin <span className="font-bold">Console</span>
          </h1>
          <p className="text-white/40 text-sm mt-2 font-medium">Sign in to manage your content</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          
          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-medium">
              {errors.general}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })); }}
                placeholder="admin@greenstoneltd.com"
                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors placeholder-white/20`}
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
                placeholder="••••••••"
                className={`w-full bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 pl-12 pr-12 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors placeholder-white/20`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary text-[#012D01] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#012D01]/20 border-t-[#012D01] rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-8 font-medium">
          © {new Date().getFullYear()} Greenstone Developments Ltd.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
