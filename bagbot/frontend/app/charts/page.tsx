'use client';

import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0810] via-[#1A0E15] to-[#150A12] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFF8E7] to-[#F9D949] bg-clip-text text-transparent mb-3">
            Trading Charts
          </h1>
          <p className="text-lg text-[#D4B5C4]">Advanced market analysis & visualization</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'BTC/USDT', price: '$43,250.00', change: '+2.4%', icon: TrendingUp },
            { title: 'ETH/USDT', price: '$2,340.50', change: '+1.8%', icon: TrendingUp },
            { title: 'SOL/USDT', price: '$98.50', change: '+3.2%', icon: TrendingUp },
            { title: 'Market Overview', price: 'All Pairs', change: '+2.1%', icon: BarChart3 }
          ].map((chart, index) => {
            const Icon = chart.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 border border-[#C75B7A]/30 hover:border-[#F9D949]/50 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#FFF8E7] mb-1">{chart.title}</h3>
                    <p className="text-[#D4B5C4]">{chart.price}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C75B7A] to-[#F9D949] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-[#4ADE80] text-lg font-semibold">{chart.change}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
