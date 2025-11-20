'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Shield,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalTrades: number;
  totalVolume: string;
  systemStatus: 'healthy' | 'warning' | 'critical';
  uptime: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

/**
 * Admin Dashboard
 * Only accessible to users with admin role
 */
export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 156,
    activeUsers: 89,
    totalTrades: 2453,
    totalVolume: '$12.4M',
    systemStatus: 'healthy',
    uptime: '99.9%',
  });

  // Mock user data - replace with real API call
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 'user_default_001',
      email: 'test@bagbot.com',
      name: 'Test User',
      role: 'user',
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: '2024-01-15',
    },
    {
      id: 'admin_default_001',
      email: 'admin@bagbot.com',
      name: 'Admin User',
      role: 'admin',
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: '2024-01-01',
    },
  ]);

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A0E15] via-[#2A1721] to-[#1A0E15] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#C75B7A] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#FFF8E7] mb-2">Access Denied</h1>
          <p className="text-[#F5D5C0]">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, trend, status }: any) => (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(199, 91, 122, 0.3)' }}
      className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-[#C75B7A]/20 to-[#F9D949]/10 rounded-lg">
          <Icon className="w-6 h-6 text-[#F9D949]" />
        </div>
        {status && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'healthy' ? 'bg-green-500/20 text-green-400' :
            status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {status}
          </div>
        )}
      </div>
      <p className="text-sm text-[#E5B299] mb-1">{label}</p>
      <p className="text-3xl font-bold text-[#FFF8E7] mb-2">{value}</p>
      {trend && (
        <p className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}% from last month
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0E15] via-[#2A1721] to-[#1A0E15] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-[#F9D949]" />
            <h1 className="text-4xl font-bold text-[#FFF8E7]">Admin Dashboard</h1>
          </div>
          <p className="text-[#E5B299]">Welcome back, {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers}
            trend={12}
          />
          <StatCard
            icon={Activity}
            label="Active Users"
            value={stats.activeUsers}
            trend={8}
          />
          <StatCard
            icon={TrendingUp}
            label="Total Trades"
            value={stats.totalTrades}
            trend={15}
          />
          <StatCard
            icon={DollarSign}
            label="Trading Volume"
            value={stats.totalVolume}
            trend={23}
          />
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-[#FFF8E7] mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#F9D949]" />
            System Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-[#E5B299]">System Status</p>
                <p className="text-lg font-semibold text-[#FFF8E7] capitalize">{stats.systemStatus}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#F9D949]" />
              <div>
                <p className="text-sm text-[#E5B299]">Uptime</p>
                <p className="text-lg font-semibold text-[#FFF8E7]">{stats.uptime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-[#E5B299]">Active Sessions</p>
                <p className="text-lg font-semibold text-[#FFF8E7]">{stats.activeUsers}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-[#FFF8E7] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#F9D949]" />
            User Management
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#C75B7A]/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#E5B299]">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#E5B299]">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#E5B299]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#E5B299]">Last Login</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#E5B299]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userData) => (
                  <tr key={userData.id} className="border-b border-[#C75B7A]/10 hover:bg-[#C75B7A]/5 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-[#FFF8E7]">{userData.name}</p>
                        <p className="text-sm text-[#E5B299]">{userData.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        userData.role === 'admin' 
                          ? 'bg-[#F9D949]/20 text-[#F9D949]' 
                          : 'bg-[#C75B7A]/20 text-[#E5B299]'
                      }`}>
                        {userData.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        userData.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {userData.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#E5B299]">
                      {new Date(userData.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-[#F9D949] hover:text-[#F9D949]/80 text-sm font-medium transition-colors">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
