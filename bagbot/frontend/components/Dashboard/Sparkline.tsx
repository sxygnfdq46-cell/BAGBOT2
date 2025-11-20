'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SparklineProps {
  data: number[];
  color?: 'success' | 'danger' | 'accent';
  height?: number;
  width?: number;
  animate?: boolean;
}

/**
 * Mini Sparkline Chart Component
 * Displays trend data as a small line chart
 */
const Sparkline: React.FC<SparklineProps> = ({ 
  data, 
  color = 'success',
  height = 32,
  width = 80,
  animate = true
}) => {
  if (!data || data.length < 2) return null;

  const colorMap = {
    success: '#12E693',
    danger: '#FF5370',
    accent: '#FDB91A',
  };

  const strokeColor = colorMap[color];
  const fillColor = `${strokeColor}20`;

  // Calculate SVG path
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <svg 
      width={width} 
      height={height} 
      className="sparkline"
      style={{ overflow: 'visible' }}
    >
      {/* Gradient Fill */}
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area Fill */}
      <motion.path
        d={areaD}
        fill={`url(#gradient-${color})`}
        initial={animate ? { opacity: 0 } : {}}
        animate={animate ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : {}}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          filter: `drop-shadow(0 0 4px ${strokeColor}40)`,
        }}
      />

      {/* End Point Indicator */}
      <motion.circle
        cx={points[points.length - 1].split(',')[0]}
        cy={points[points.length - 1].split(',')[1]}
        r="2.5"
        fill={strokeColor}
        initial={animate ? { scale: 0, opacity: 0 } : {}}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{
          filter: `drop-shadow(0 0 4px ${strokeColor})`,
        }}
      />
    </svg>
  );
};

export default Sparkline;
