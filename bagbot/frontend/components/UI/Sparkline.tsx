'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SparklineProps {
  data?: number[];
  width?: number;
  height?: number;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

/**
 * Micro Sparkline Chart Component
 * Displays mini trend visualization for data points
 * Institutional-grade design
 */
const Sparkline: React.FC<SparklineProps> = ({
  data = [20, 35, 25, 45, 30, 50, 40, 55, 45, 60, 50, 65],
  width = 80,
  height = 24,
  trend = 'up',
  className = '',
}) => {
  // Normalize data to fit within height
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Generate SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return { x, y };
  });

  const pathData = points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x},${point.y}`;
    }
    // Smooth curve using quadratic bezier
    const prevPoint = points[index - 1];
    const midX = (prevPoint.x + point.x) / 2;
    return `${path} Q ${prevPoint.x},${prevPoint.y} ${midX},${(prevPoint.y + point.y) / 2} Q ${midX},${(prevPoint.y + point.y) / 2} ${point.x},${point.y}`;
  }, '');

  // Area path for gradient fill
  const areaPath = `${pathData} L ${width},${height} L 0,${height} Z`;

  const colorMap = {
    up: { stroke: '#12E693', gradient: ['#12E693', '#0ECB81'] },
    down: { stroke: '#FF5370', gradient: ['#FF5370', '#F6465D'] },
    neutral: { stroke: '#FDB91A', gradient: ['#FDB91A', '#E0A506'] },
  };

  const colors = colorMap[trend];

  return (
    <svg
      width={width}
      height={height}
      className={`sparkline ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`gradient-${trend}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity="0.3" />
          <stop offset="100%" stopColor={colors.gradient[1]} stopOpacity="0.05" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Area Fill with Gradient */}
      <motion.path
        d={areaPath}
        fill={`url(#gradient-${trend})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Line with Glow */}
      <motion.path
        d={pathData}
        fill="none"
        stroke={colors.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* End Point Indicator */}
      <motion.circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="2"
        fill={colors.stroke}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <animate
          attributeName="r"
          values="2;3;2"
          dur="2s"
          repeatCount="indefinite"
        />
      </motion.circle>
    </svg>
  );
};

export default Sparkline;
