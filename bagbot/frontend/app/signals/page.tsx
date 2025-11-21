'use client';

import React from 'react';
import { Zap, TrendingUp, TrendingDown } from 'lucide-react';

export default function SignalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0810] via-[#1A0E15] to-[#150A12] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFF8E7] to-[#F9D949] bg-clip-text text-transparent mb-3">
            Trading Signals
          </h1>
          <p className="text-lg text-[#D4B5C4]">AI-powered trade recommendations</p>
        </header>

        <div className="space-y-6">
          {[
            { pair: 'BTC/USDT', action: 'BUY', confidence: '92%', target: '$45,000', icon: TrendingUp, color: 'from-[#4ADE80] to-[#22C55E]' },
            { pair: 'ETH/USDT', action: 'BUY', confidence: '87%', target: '$2,500', icon: TrendingUp, color: 'from-[#4ADE80] to-[#22C55E]' },
            { pair: 'SOL/USDT', action: 'SELL', confidence: '78%', target: '$95.00', icon: TrendingDown, color: 'from-[#F87171] to-[#EF4444]' }
          ].map((signal, index) => {
            const Icon = signal.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 border border-[#C75B7A]/30 hover:border-[#F9D949]/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${signal.color} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#FFF8E7] mb-1">{signal.pair}</h3>
                      <p className="text-[#D4B5C4]">Target: {signal.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold mb-1 ${signal.action === 'BUY' ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}>
                      {signal.action}
                    </div>
                    <div className="text-[#F9D949]">{signal.confidence} confidence</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
