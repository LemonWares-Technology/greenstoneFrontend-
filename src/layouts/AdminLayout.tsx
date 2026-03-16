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
  Mail
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
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <LoadingSpinner size="lg" label="Verifying authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-green-50 text-green-800 font-sans flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-green-900/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - soft green instead of black */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col shadow-xl`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-brand-primary flex items-center justify-center text-green-800 font-black">G</span>
            <span>Admin</span>
          </div>
          <button onClick={closeSidebar} className="lg:hidden text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-brand-primary text-green-800 shadow-lg shadow-brand-primary/20 scale-100' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white hover:scale-[1.02]'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-white/80 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-green-800/10 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30 shadow-sm relative">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg text-green-800/70 hover:bg-green-800/5 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-green-800 hidden sm:block">Greenstone Console</h1>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-bold text-green-800/70 hover:text-brand-primary transition-colors flex items-center gap-2 bg-green-800/5 hover:bg-green-800/10 px-4 py-2 rounded-full"
            >
              View Site
            </a>
            <div className="w-10 h-10 rounded-full bg-green-800 text-brand-primary flex items-center justify-center font-bold border-2 border-brand-primary shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page Content scrollable area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-[1600px] mx-auto min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
