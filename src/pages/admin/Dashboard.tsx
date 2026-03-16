import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  FileText, 
  Users, 
  TrendingUp,
  Activity,
  Mail,
  BarChart3
} from 'lucide-react';
import { statsService } from '../../services/stats';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import type { DashboardStats } from '../../types';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, colorClass }) => (
  <div className="bg-white rounded-3xl p-6 border border-green-800/5 shadow-xl shadow-green-800/5 flex flex-col relative overflow-hidden group hover:border-green-800/10 transition-colors">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
    
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colorClass} text-green-800 shadow-sm`}>
        {icon}
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
          <TrendingUp size={12} /> {trend}
        </span>
      )}
    </div>
    
    <div className="relative z-10 mt-auto">
      <h3 className="text-[green-800]/50 text-sm font-bold uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-4xl text-[green-800] font-bold tracking-tight">{value}</p>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await statsService.getDashboardStats();
        setStats(res.data);
      } catch (err: unknown) {
        const apiErr = err as { message?: string };
        setError(apiErr.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner size="lg" label="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs tracking-widest text-[green-800]/50 uppercase font-bold flex items-center gap-2 mb-2">
          <Activity size={14} className="text-brand-primary" /> Overview
        </span>
        <h1 className="text-3xl md:text-4xl font-light text-[green-800] tracking-tight">
          Welcome back, <span className="font-bold">Admin</span>
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Total Projects" 
          value={stats?.counts.projects ?? 0} 
          icon={<Building2 size={24} />} 
          colorClass="from-brand-primary to-emerald-200"
        />
        <StatCard 
          title="Blog Posts" 
          value={stats?.counts.blogs ?? 0} 
          icon={<FileText size={24} />} 
          colorClass="from-amber-300 to-yellow-100"
        />
        <StatCard 
          title="Team Members" 
          value={stats?.counts.teamMembers ?? 0} 
          icon={<Users size={24} />} 
          colorClass="from-blue-300 to-indigo-100"
        />
        <StatCard 
          title="Subscribers" 
          value={stats?.counts.subscribers ?? 0} 
          icon={<Mail size={24} />} 
          colorClass="from-purple-300 to-fuchsia-100"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <StatCard 
          title="Contact Leads" 
          value={stats?.counts.leads ?? 0} 
          icon={<TrendingUp size={24} />} 
          colorClass="from-orange-300 to-red-100"
        />
        <StatCard 
          title="Exec. Summary Items" 
          value={stats?.counts.executiveSummary ?? 0} 
          icon={<BarChart3 size={24} />} 
          colorClass="from-teal-300 to-cyan-100"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-8 border border-green-800/5 shadow-xl shadow-green-800/5">
        <h2 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-3">
          <span className="w-2 h-6 rounded-full bg-brand-primary inline-block"></span>
          Recent Activity
        </h2>
        
        <div className="flex flex-col gap-6">
          {(stats?.recent.leads || []).slice(0, 3).map((lead) => (
            <div key={lead.id} className="flex items-start gap-4 pb-6 border-b border-green-800/5 last:border-0 last:pb-0">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-brand-primary/20 text-green-800/50">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-green-800 font-medium mb-1">
                  New contact from <span className="font-bold">{lead.name}</span>
                </p>
                <p className="text-sm text-green-800/50 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-800/20"></span>
                  {lead.email} {lead.createdAt && `· ${new Date(lead.createdAt).toLocaleDateString()}`}
                </p>
              </div>
            </div>
          ))}
          {(!stats?.recent.leads || stats.recent.leads.length === 0) && (
            <p className="text-green-800/40 text-sm text-center py-4">No recent activity</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
