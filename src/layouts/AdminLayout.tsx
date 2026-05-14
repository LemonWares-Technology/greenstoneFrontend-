import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Menu,
  X,
  Mail,
  Home
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, logout } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <Building2 size={20} /> },
    { name: 'Blog Posts', path: '/admin/blog', icon: <FileText size={20} /> },
    { name: 'Team', path: '/admin/team', icon: <Users size={20} /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Settings size={20} /> },
    { name: 'Subscribers', path: '/admin/subscribers', icon: <Mail size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Show loading spinner while verifying auth
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" label="Verifying authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Elegant Black */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#0a0a0a] text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col shadow-2xl`}
      >
        {/* Logo Area */}
        <div className="h-24 flex items-center justify-between px-8 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-[#c5a572] flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <span className="text-[#0a0a0a] font-black text-lg">G</span>
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight text-white">Greenstone</div>
              <div className="text-[10px] tracking-widest uppercase text-white/40 font-bold">Admin Console</div>
            </div>
          </div>
          <button onClick={closeSidebar} className="lg:hidden text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-5 flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 font-medium group relative overflow-hidden ${
                  isActive 
                    ? 'bg-brand-primary text-[#0a0a0a] shadow-lg shadow-brand-primary/20' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0a0a0a] rounded-r-full" />
                  )}
                  <span className={isActive ? 'text-[#0a0a0a]' : 'text-white/60 group-hover:text-brand-primary transition-colors'}>
                    {item.icon}
                  </span>
                  <span className="text-sm tracking-wide">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-5 border-t border-white/5 shrink-0 space-y-3">
          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-[#c5a572] flex items-center justify-center font-bold text-[#0a0a0a] shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{user?.name || 'Admin'}</div>
              <div className="text-xs text-white/40 truncate">{user?.email || 'admin@greenstone.com'}</div>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 rounded-xl w-full text-white/70 hover:bg-red-500/10 hover:text-red-400 transition-all font-medium text-sm group"
          >
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area - Clean White */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header - Minimal & Clean */}
        <header className="h-20 bg-white border-b border-gray-200/80 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_var(--color-brand-primary)]" />
              <h1 className="text-lg font-light text-gray-900 tracking-tight">
                Welcome back, <span className="font-bold text-green-800">{user?.name?.split(' ')[0] || 'Admin'}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold text-gray-700 hover:text-green-800 transition-colors flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-5 py-2.5 rounded-full border border-gray-200"
            >
              <Home size={16} />
              <span className="hidden sm:inline">View Site</span>
            </a>
          </div>
        </header>

        {/* Page Content - Clean White Background */}
        <div className="flex-1 overflow-y-auto bg-[#fafafa]">
          <div className="p-6 lg:p-10">
            <div className="max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
