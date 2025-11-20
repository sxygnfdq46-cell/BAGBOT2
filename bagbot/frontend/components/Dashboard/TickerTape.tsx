'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

/**
 * Animated Ticker Tape Component
 * Bloomberg/CNBC-style scrolling price ticker
 */
const TickerTape: React.FC = () => {
  const [tickerData, setTickerData] = useState<TickerItem[]>([
    { symbol: 'BTC/USDT', price: 43684.33, change: 1234.56, changePercent: 2.92 },
    { symbol: 'ETH/USDT', price: 2318.54, change: -45.23, changePercent: -1.92 },
    { symbol: 'BNB/USDT', price: 312.45, change: 8.76, changePercent: 2.88 },
    { symbol: 'SOL/USDT', price: 98.76, change: 3.45, changePercent: 3.62 },
    { symbol: 'ADA/USDT', price: 0.456, change: 0.012, changePercent: 2.70 },
    { symbol: 'XRP/USDT', price: 0.687, change: -0.023, changePercent: -3.24 },
    { symbol: 'DOT/USDT', price: 7.89, change: 0.34, changePercent: 4.50 },
    { symbol: 'MATIC/USDT', price: 0.891, change: 0.045, changePercent: 5.32 },
  ]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(prev => 
        prev.map(item => {
          const priceChange = (Math.random() - 0.5) * item.price * 0.002;
          const newPrice = item.price + priceChange;
          const newChange = item.change + priceChange;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          
          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate items for seamless infinite scroll
  const duplicatedData = [...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="relative w-full overflow-hidden bg-surface/50 backdrop-blur-sm border-b border-border/40 py-2.5">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface/90 to-transparent z-10 pointer-events-none" />

      {/* Scrolling Ticker */}
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -33.333 + '%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedData.map((item, index) => {
          const isPositive = item.changePercent >= 0;
          
          return (
            <div
              key={`${item.symbol}-${index}`}
              className="flex items-center gap-3 px-4 whitespace-nowrap"
            >
              {/* Symbol */}
              <span className="text-sm font-semibold text-main/90">
                {item.symbol}
              </span>

              {/* Price */}
              <span className="text-sm font-bold text-main tabular-nums">
                ${item.price.toLocaleString('en-US', { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2 
                })}
              </span>

              {/* Change */}
              <div className={`flex items-center gap-1 text-xs font-semibold tabular-nums ${
                isPositive ? 'text-success' : 'text-danger'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
              </div>

              {/* Separator */}
              <div className="w-px h-4 bg-border/40" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TickerTape;
