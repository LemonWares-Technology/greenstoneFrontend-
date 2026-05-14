import React, { useState, useEffect } from "react";
import {
  Building2,
  FileText,
  Users,
  TrendingUp,
  Activity,
  Mail,
  BarChart3,
} from "lucide-react";
import { statsService } from "../../services/stats";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import type { DashboardStats } from "../../types";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  colorClass,
}) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-lg hover:border-brand-primary/30 transition-all">
    <div
      className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${colorClass} opacity-5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}
    />

    <div className="flex justify-between items-start mb-6 relative z-10">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br ${colorClass} text-white shadow-sm`}
      >
        {icon}
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
          <TrendingUp size={12} /> {trend}
        </span>
      )}
    </div>

    <div className="relative z-10 mt-auto">
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1.5">
        {title}
      </h3>
      <p className="text-4xl text-gray-900 font-bold tracking-tight">
        {value}
      </p>
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
        setStats(res?.data || null);
      } catch (err: unknown) {
        const apiErr = err as { message?: string };
        setError(apiErr.message || "Failed to load dashboard stats");
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
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_var(--color-brand-primary)]" />
          <span className="text-xs tracking-widest text-gray-500 uppercase font-bold flex items-center gap-2">
            <Activity size={14} className="text-brand-primary" /> Overview
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
          Dashboard <span className="font-bold text-green-800">Overview</span>
        </h1>
        <p className="text-gray-600 mt-2 text-base">Monitor your content and engagement metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Projects"
          value={stats?.counts.projects ?? 0}
          icon={<Building2 size={24} />}
          colorClass="from-green-600 to-green-800"
        />
        <StatCard
          title="Blog Posts"
          value={stats?.counts.blogs ?? 0}
          icon={<FileText size={24} />}
          colorClass="from-amber-500 to-orange-600"
        />
        <StatCard
          title="Team Members"
          value={stats?.counts.teamMembers ?? 0}
          icon={<Users size={24} />}
          colorClass="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Subscribers"
          value={stats?.counts.subscribers ?? 0}
          icon={<Mail size={24} />}
          colorClass="from-purple-500 to-fuchsia-600"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <StatCard
          title="Contact Leads"
          value={stats?.counts.leads ?? 0}
          icon={<TrendingUp size={24} />}
          colorClass="from-orange-500 to-red-600"
        />
        <StatCard
          title="Exec. Summary Items"
          value={stats?.counts.executiveSummary ?? 0}
          icon={<BarChart3 size={24} />}
          colorClass="from-teal-500 to-cyan-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-1 h-6 rounded-full bg-brand-primary inline-block"></span>
          Recent Activity
        </h2>

        <div className="flex flex-col gap-6">
          {(stats?.recent.leads || []).slice(0, 3).map((lead) => (
            <div
              key={lead.id}
              className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-200 text-green-700">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-gray-900 font-medium mb-1">
                  New contact from{" "}
                  <span className="font-bold text-green-800">{lead.name}</span>
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                  {lead.email}{" "}
                  {lead.createdAt &&
                    `· ${new Date(lead.createdAt).toLocaleDateString()}`}
                </p>
              </div>
            </div>
          ))}
          {(!stats?.recent.leads || stats.recent.leads.length === 0) && (
            <p className="text-gray-400 text-sm text-center py-4">
              No recent activity
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
