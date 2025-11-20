'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function ChartsPage() {
  return (
    <div className="p-3 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF8E7] flex items-center gap-2 sm:gap-3">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#F9D949]" />
          Trading Charts
        </h1>
        <p className="text-sm sm:text-base text-[#D4B5C4] mt-1 sm:mt-2">View real-time trading charts and technical analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-lg sm:rounded-xl p-4 sm:p-6 h-64 sm:h-80 lg:h-96">
          <h2 className="text-lg sm:text-xl font-bold text-[#FFF8E7] mb-3 sm:mb-4">BTC/USDT</h2>
          <div className="flex items-center justify-center h-40 sm:h-52 lg:h-64 text-sm sm:text-base text-[#D4B5C4]">
            Chart Component Coming Soon
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-lg sm:rounded-xl p-4 sm:p-6 h-64 sm:h-80 lg:h-96">
          <h2 className="text-lg sm:text-xl font-bold text-[#FFF8E7] mb-3 sm:mb-4">ETH/USDT</h2>
          <div className="flex items-center justify-center h-40 sm:h-52 lg:h-64 text-sm sm:text-base text-[#D4B5C4]">
            Chart Component Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
