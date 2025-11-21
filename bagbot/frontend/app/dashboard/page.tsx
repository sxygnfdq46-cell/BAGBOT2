'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, DollarSign, Target, Activity, Server, Zap, Home, BarChart3, Radio, FileText, Settings, RefreshCw, Download, Filter } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function DashboardPage() {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    setLastUpdate(new Date());
  };
  const stats = [
    { 
      label: 'Total Trades', 
      value: '12,547', 
      change: '+234 today',
      icon: Target,
      color: 'from-[#7C2F39] to-[#C75B7A]',
      bgColor: 'from-[#7C2F39]/10 to-black'
    },
    { 
      label: 'Profit Today', 
      value: '+$4,287', 
      change: '+12.4%',
      icon: DollarSign,
      color: 'from-[#4ADE80] to-[#22C55E]',
      bgColor: 'from-[#4ADE80]/10 to-black'
    },
    { 
      label: 'Win Rate', 
      value: '73.2%', 
      change: '+2.1% this week',
      icon: TrendingUp,
      color: 'from-[#F9D949] to-[#FDE68A]',
      bgColor: 'from-[#F9D949]/10 to-black'
    },
    { 
      label: 'Active Positions', 
      value: '18', 
      change: '6 pending',
      icon: Activity,
      color: 'from-[#60A5FA] to-[#3B82F6]',
      bgColor: 'from-[#60A5FA]/10 to-black'
    }
  ];

  return (
    <>
      <Navigation active="/dashboard" />
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#FFFBE7]/60 hover:text-[#F9D949] transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span className="text-[#FFFBE7]/30">/</span>
          <span className="text-[#F9D949] font-semibold">Dashboard</span>
        </nav>

        {/* Quick Navigation */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-[#7C2F39] border border-[#F9D949] text-[#FFFBE7] font-semibold text-sm transition-all">
            Dashboard
          </Link>
          <Link href="/charts" className="px-4 py-2 rounded-lg bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7]/60 hover:border-[#F9D949]/50 hover:text-[#F9D949] font-semibold text-sm transition-all flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Charts
          </Link>
          <Link href="/signals" className="px-4 py-2 rounded-lg bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7]/60 hover:border-[#F9D949]/50 hover:text-[#F9D949] font-semibold text-sm transition-all flex items-center gap-2">
            <Radio className="w-4 h-4" />
            Signals
          </Link>
          <Link href="/logs" className="px-4 py-2 rounded-lg bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7]/60 hover:border-[#F9D949]/50 hover:text-[#F9D949] font-semibold text-sm transition-all flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Logs
          </Link>
          <Link href="/settings" className="px-4 py-2 rounded-lg bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7]/60 hover:border-[#F9D949]/50 hover:text-[#F9D949] font-semibold text-sm transition-all flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </div>

        {/* Header with Controls */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-5xl font-black mb-3">
                <span className="bg-gradient-to-r from-[#FFFBE7] to-[#F9D949] bg-clip-text text-transparent">
                  Trading Dashboard
                </span>
              </h1>
              <p className="text-[#FFFBE7]/60 text-lg">Real-time trading operations & analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleManualRefresh}
                className="px-4 py-2 rounded-lg bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] hover:border-[#F9D949]/50 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 rounded-lg bg-black/50 border border-[#7C2F39]/30 text-[#FFFBE7] hover:border-[#F9D949]/50 transition-all flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7C2F39] to-[#991B1B] text-[#FFFBE7] hover:from-[#991B1B] hover:to-[#7C2F39] transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-[#4ADE80] animate-pulse' : 'bg-[#7C2F39]'}`} />
              <span className="text-[#FFFBE7]/60">Last updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="text-[#F9D949] hover:text-[#FDE68A] transition-colors"
            >
              {autoRefresh ? 'Disable' : 'Enable'} auto-refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.bgColor} border border-[#7C2F39]/30 hover:border-[#F9D949]/50 transition-all group`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${stat.color}`} />
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-sm text-[#FFFBE7]/60 font-semibold tracking-wide uppercase mb-1">
                    {stat.label}
                  </div>
                  <div className="text-4xl font-black">
                    <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-[#FFFBE7]/50">
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* System Health */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#FFFBE7] mb-6">System Health</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* API Status */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#7C2F39]/10 to-black border border-[#7C2F39]/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4ADE80] to-[#22C55E] flex items-center justify-center">
                    <Server className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#FFFBE7]">API Status</h3>
                    <p className="text-[#FFFBE7]/60 text-sm">Backend Service</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="text-[#4ADE80] font-bold">Online</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#FFFBE7]/60">Response Time</span>
                  <span className="text-[#FFFBE7] font-semibold">42ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#FFFBE7]/60">Uptime</span>
                  <span className="text-[#FFFBE7] font-semibold">99.97%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#FFFBE7]/60">Last Check</span>
                  <span className="text-[#FFFBE7] font-semibold">2 sec ago</span>
                </div>
              </div>
            </div>

            {/* Worker Status */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#7C2F39]/10 to-black border border-[#7C2F39]/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F9D949] to-[#FDE68A] flex items-center justify-center">
                    <Zap className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#FFFBE7]">Worker Status</h3>
                    <p className="text-[#FFFBE7]/60 text-sm">Trading Engine</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F9D949] animate-pulse" />
                  <span className="text-[#F9D949] font-bold">Active</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#FFFBE7]/60">Tasks Processed</span>
                  <span className="text-[#FFFBE7] font-semibold">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#FFFBE7]/60">Queue Size</span>
                  <span className="text-[#FFFBE7] font-semibold">3 pending</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#FFFBE7]/60">Last Activity</span>
                  <span className="text-[#FFFBE7] font-semibold">1 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-3xl font-bold text-[#FFFBE7] mb-6">Recent Trades</h2>
          
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#7C2F39]/10 to-black border border-[#7C2F39]/30">
            <div className="space-y-4">
              {[
                { pair: 'BTC/USDT', type: 'BUY', price: '$43,250', profit: '+$245', time: '2 min ago', status: 'success' },
                { pair: 'ETH/USDT', type: 'SELL', price: '$2,340', profit: '+$189', time: '15 min ago', status: 'success' },
                { pair: 'SOL/USDT', type: 'BUY', price: '$98.50', profit: '+$67', time: '1 hour ago', status: 'success' },
                { pair: 'ADA/USDT', type: 'SELL', price: '$0.52', profit: '-$23', time: '2 hours ago', status: 'loss' },
              ].map((trade, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-black/50 border border-[#7C2F39]/20 hover:border-[#F9D949]/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      trade.type === 'BUY' 
                        ? 'bg-[#4ADE80]/20 text-[#4ADE80]' 
                        : 'bg-[#F87171]/20 text-[#F87171]'
                    }`}>
                      {trade.type}
                    </div>
                    <div>
                      <div className="text-[#FFFBE7] font-semibold">{trade.pair}</div>
                      <div className="text-sm text-[#FFFBE7]/50">{trade.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#FFFBE7] font-semibold">{trade.price}</div>
                    <div className={`text-sm font-semibold ${
                      trade.status === 'success' ? 'text-[#4ADE80]' : 'text-[#F87171]'
                    }`}>
                      {trade.profit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
