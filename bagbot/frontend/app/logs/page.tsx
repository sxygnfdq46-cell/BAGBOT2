'use client';

import React from 'react';
import { Activity, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function LogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0810] via-[#1A0E15] to-[#150A12] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFF8E7] to-[#F9D949] bg-clip-text text-transparent mb-3">
            Activity Logs
          </h1>
          <p className="text-lg text-[#D4B5C4]">System events & trade history</p>
        </header>

        <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 border border-[#C75B7A]/30 rounded-2xl p-8">
          <div className="space-y-4">
            {[
              { type: 'success', message: 'Trade executed: BTC/USDT BUY @$43,250', time: '2 min ago', icon: CheckCircle, color: 'text-[#4ADE80]' },
              { type: 'info', message: 'Price alert triggered: ETH/USDT reached $2,340', time: '15 min ago', icon: Info, color: 'text-[#60A5FA]' },
              { type: 'warning', message: 'High volatility detected in market', time: '1 hour ago', icon: AlertTriangle, color: 'text-[#F9D949]' },
              { type: 'success', message: 'Profit target reached: SOL/USDT +$67', time: '2 hours ago', icon: CheckCircle, color: 'text-[#4ADE80]' },
              { type: 'info', message: 'Worker status: Running normally', time: '3 hours ago', icon: Activity, color: 'text-[#60A5FA]' }
            ].map((log, index) => {
              const Icon = log.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#1A0E15]/50 border border-[#C75B7A]/20"
                >
                  <Icon className={`w-5 h-5 ${log.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <p className="text-[#FFF8E7] mb-1">{log.message}</p>
                    <p className="text-sm text-[#D4B5C4]">{log.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
