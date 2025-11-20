'use client';

import React from 'react';
import { Zap, TrendingUp, TrendingDown } from 'lucide-react';

export default function SignalsPage() {
  const signals = [
    { id: 1, pair: 'BTC/USDT', type: 'BUY', price: 43250, confidence: 85, time: '2 min ago' },
    { id: 2, pair: 'ETH/USDT', type: 'SELL', price: 2280, confidence: 78, time: '5 min ago' },
    { id: 3, pair: 'SOL/USDT', type: 'BUY', price: 98.5, confidence: 92, time: '12 min ago' },
  ];

  return (
    <div className="p-3 sm:p-6 lg:p-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF8E7] flex items-center gap-2 sm:gap-3">
          <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#F9D949]" />
          Trading Signals
        </h1>
        <p className="text-sm sm:text-base text-[#D4B5C4] mt-1 sm:mt-2">AI-powered trading signals and recommendations</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {signals.map((signal) => (
          <div key={signal.id} className="bg-gradient-to-br from-[#2A1721]/80 to-[#1A0E15]/80 backdrop-blur-sm border border-[#C75B7A]/30 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-[#F9D949]/50 transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {signal.type === 'BUY' ? (
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                )}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-[#FFF8E7]">{signal.pair}</h3>
                  <p className="text-[#D4B5C4] text-xs sm:text-sm">{signal.time}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-8">
                <div className="text-left sm:text-right">
                  <div className={`text-xl sm:text-2xl font-bold ${signal.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                    {signal.type}
                  </div>
                  <p className="text-[#D4B5C4] text-xs sm:text-sm">${signal.price.toLocaleString()}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-[#D4B5C4]">Confidence</div>
                  <div className="text-xl sm:text-2xl font-bold text-[#F9D949]">{signal.confidence}%</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
