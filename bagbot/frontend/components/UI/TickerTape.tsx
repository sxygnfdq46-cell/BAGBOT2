'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon: string;
}

const tickerData: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43684.32, change: 2.34, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', price: 2318.54, change: 1.87, icon: 'Ξ' },
  { symbol: 'BNB', name: 'Binance', price: 245.67, change: -0.52, icon: '◆' },
  { symbol: 'SOL', name: 'Solana', price: 58.42, change: 4.21, icon: '◎' },
  { symbol: 'ADA', name: 'Cardano', price: 0.38, change: 1.15, icon: '₳' },
  { symbol: 'XRP', name: 'Ripple', price: 0.62, change: -1.23, icon: '✕' },
  { symbol: 'DOT', name: 'Polkadot', price: 5.24, change: 3.45, icon: '●' },
  { symbol: 'MATIC', name: 'Polygon', price: 0.89, change: 2.67, icon: '⬡' },
];

/**
 * Premium Animated Ticker Tape Component
 * Displays live crypto prices with smooth horizontal scrolling
 * Bloomberg Terminal inspired design
 */
const TickerTape: React.FC = () => {
  // Duplicate items for seamless infinite scroll
  const duplicatedTicker = [...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-surface via-surface/95 to-surface border-y border-border/60 backdrop-blur-xl">
      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling Ticker */}
      <motion.div
        className="flex gap-8 py-3 px-4"
        animate={{
          x: [0, -1920], // Adjust based on content width
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 45,
            ease: 'linear',
          },
        }}
      >
        {duplicatedTicker.map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className="flex items-center gap-3 min-w-fit group cursor-pointer hover:scale-105 transition-transform"
          >
            {/* Coin Icon */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all">
              {item.icon}
            </div>

            {/* Symbol & Price */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-main tracking-wide">
                  {item.symbol}
                </span>
                <span className="text-xs text-muted/70">/USDT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tabular-nums text-main/90">
                  ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                
                {/* Change Indicator */}
                <div className={`flex items-center gap-0.5 ${
                  item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {item.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs font-medium tabular-nums">
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-8 bg-border/40" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TickerTape;
