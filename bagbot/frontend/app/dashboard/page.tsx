'use client';

import React, { useState } from 'react';
import { Activity, TrendingUp, DollarSign, Zap } from 'lucide-react';

/**
 * Main Trading Dashboard
 */
export default function Dashboard() {
  const [stats] = useState({
    totalBalance: 125430.50,
    dailyProfit: 3420.25,
    activePositions: 12,
    winRate: 68.5
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0810] via-[#1A0E15] to-[#150A12] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFF8E7] to-[#F9D949] bg-clip-text text-transparent mb-3">
            Trading Dashboard
          </h1>
          <p className="text-lg text-[#D4B5C4]">Real-time trading operations & analytics</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Balance', value: `$${stats.totalBalance.toLocaleString()}`, icon: DollarSign, color: 'from-[#4ADE80] to-[#22C55E]' },
            { label: 'Daily Profit', value: `+$${stats.dailyProfit.toLocaleString()}`, icon: TrendingUp, color: 'from-[#F9D949] to-[#FDE68A]' },
            { label: 'Active Positions', value: stats.activePositions, icon: Activity, color: 'from-[#C75B7A] to-[#E5B299]' },
            { label: 'Win Rate', value: `${stats.winRate}%`, icon: Zap, color: 'from-[#60A5FA] to-[#3B82F6]' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 border border-[#C75B7A]/30 backdrop-blur-sm hover:border-[#F9D949]/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#FFF8E7] mb-1">{stat.value}</div>
                <div className="text-sm text-[#D4B5C4]">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Trading Activity */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#FFF8E7] mb-6">Recent Trades</h2>
          <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 border border-[#C75B7A]/30 rounded-2xl p-8">
            <div className="space-y-4">
              {[
                { pair: 'BTC/USDT', type: 'BUY', price: '$43,250', profit: '+$245', time: '2 min ago' },
                { pair: 'ETH/USDT', type: 'SELL', price: '$2,340', profit: '+$189', time: '15 min ago' },
                { pair: 'SOL/USDT', type: 'BUY', price: '$98.50', profit: '+$67', time: '1 hour ago' },
              ].map((trade, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#1A0E15]/50 border border-[#C75B7A]/20 hover:border-[#F9D949]/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      trade.type === 'BUY' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' : 'bg-[#F87171]/20 text-[#F87171]'
                    }`}>
                      {trade.type}
                    </div>
                    <div>
                      <div className="text-[#FFF8E7] font-semibold">{trade.pair}</div>
                      <div className="text-sm text-[#D4B5C4]">{trade.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#FFF8E7] font-semibold">{trade.price}</div>
                    <div className="text-sm text-[#4ADE80]">{trade.profit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* System Status */}
        <section>
          <h2 className="text-3xl font-bold text-[#FFF8E7] mb-6">System Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'API Status', status: 'Healthy', color: 'bg-[#4ADE80]' },
              { label: 'Worker Status', status: 'Running', color: 'bg-[#F9D949]' },
              { label: 'Database', status: 'Connected', color: 'bg-[#60A5FA]' }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 border border-[#C75B7A]/30"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${item.color} animate-pulse`} />
                  <span className="text-[#FFF8E7] font-semibold">{item.label}</span>
                </div>
                <div className="text-[#D4B5C4]">{item.status}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
