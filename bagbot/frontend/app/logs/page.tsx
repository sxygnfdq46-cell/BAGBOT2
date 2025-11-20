'use client';

import React from 'react';
import { FileText, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function LogsPage() {
  const logs = [
    { id: 1, type: 'success', message: 'Trade executed successfully: BTC/USDT', time: '10:45:23 AM' },
    { id: 2, type: 'info', message: 'Bot started monitoring markets', time: '10:30:15 AM' },
    { id: 3, type: 'warning', message: 'High volatility detected in ETH/USDT', time: '10:15:42 AM' },
    { id: 4, type: 'success', message: 'Profit target reached: +2.5%', time: '10:00:08 AM' },
    { id: 5, type: 'info', message: 'New signal generated for SOL/USDT', time: '09:45:33 AM' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF8E7] flex items-center gap-2 sm:gap-3">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#F9D949]" />
          Activity Logs
        </h1>
        <p className="text-sm sm:text-base text-[#D4B5C4] mt-1 sm:mt-2">System activity and trading events</p>
      </div>

      <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-lg sm:rounded-xl p-3 sm:p-6">
        <div className="space-y-2 sm:space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-[#1A0E15]/50 border border-[#C75B7A]/20 hover:border-[#F9D949]/30 transition-all">
              <div className="flex-shrink-0">
                {getIcon(log.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-[#FFF8E7]">{log.message}</p>
                <p className="text-[#D4B5C4] text-xs sm:text-sm mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
