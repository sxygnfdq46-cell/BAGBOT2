/**
 * StatusTile Component for BagBot Trading Platform
 * Displays system status with accessible colors using CSS variables
 */

import React from 'react';

/**
 * Status types for the trading platform
 */
export type StatusType = 'healthy' | 'degraded' | 'down' | 'maintenance';

/**
 * Props for StatusTile component
 */
interface StatusTileProps {
  title: string;
  status: StatusType;
  description?: string;
  lastUpdated?: Date;
  onClick?: () => void;
  className?: string;
}

/**
 * Get status-specific styling with accessible contrast
 */
const getStatusStyles = (status: StatusType) => {
  switch (status) {
    case 'healthy':
      return {
        container: 'bg-primary-700 text-white border-primary-700',
        indicator: 'bg-success',
        badge: 'bg-success text-white',
        text: 'text-white',
        description: 'text-gray-100',
      };
    case 'degraded':
      return {
        container: 'bg-accent text-black border-accent',
        indicator: 'bg-warning',
        badge: 'bg-warning text-black',
        text: 'text-black',
        description: 'text-gray-800',
      };
    case 'down':
      return {
        container: 'bg-danger text-white border-danger',
        indicator: 'bg-danger',
        badge: 'bg-danger text-white',
        text: 'text-white',
        description: 'text-gray-100',
      };
    case 'maintenance':
      return {
        container: 'bg-info text-white border-info',
        indicator: 'bg-info',
        badge: 'bg-info text-white',
        text: 'text-white',
        description: 'text-gray-100',
      };
    default:
      return {
        container: 'bg-surface text-main border-main',
        indicator: 'bg-gray-400',
        badge: 'bg-gray-400 text-white',
        text: 'text-main',
        description: 'text-muted',
      };
  }
};

/**
 * Get human-readable status text
 */
const getStatusText = (status: StatusType): string => {
  switch (status) {
    case 'healthy':
      return 'Operational';
    case 'degraded':
      return 'Degraded Performance';
    case 'down':
      return 'Service Down';
    case 'maintenance':
      return 'Maintenance Mode';
    default:
      return 'Unknown';
  }
};

/**
 * Format timestamp for display
 */
const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

/**
 * StatusTile component with accessible styling using design tokens
 */
const StatusTile: React.FC<StatusTileProps> = ({
  title,
  status,
  description,
  lastUpdated,
  onClick,
  className = '',
}) => {
  const styles = getStatusStyles(status);
  const statusText = getStatusText(status);

  return (
    <div
      className={`
        relative p-6 rounded-xl border-2 shadow-custom-md
        transition-all duration-200 cursor-pointer
        hover:shadow-custom-lg hover:scale-105
        ${styles.container}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {/* Status Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`
              w-3 h-3 rounded-full animate-pulse
              ${styles.indicator}
            `}
            aria-hidden="true"
          />
          <h3 className={`text-lg font-semibold ${styles.text}`}>
            {title}
          </h3>
        </div>
        
        {/* Status Badge */}
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${styles.badge}
          `}
        >
          {statusText}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className={`text-sm mb-3 ${styles.description}`}>
          {description}
        </p>
      )}

      {/* Footer with Last Updated */}
      <div className="flex items-center justify-between">
        {lastUpdated && (
          <span className={`text-xs ${styles.description}`}>
            Updated {formatTimestamp(lastUpdated)}
          </span>
        )}
        
        {/* Action Indicator */}
        {onClick && (
          <div className={`${styles.description}`}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div
        className="
          absolute inset-0 rounded-xl opacity-0 hover:opacity-10
          bg-white transition-opacity duration-200 pointer-events-none
        "
        aria-hidden="true"
      />
    </div>
  );
};

export default StatusTile;