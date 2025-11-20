'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationToastProps {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

/**
 * Premium Toast Notification Component
 * Elegant slide-in notifications with auto-dismiss
 */
const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  type,
  title,
  message,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const colorMap = {
    success: {
      icon: 'text-success',
      bg: 'from-success/20 to-success/5',
      border: 'border-success/40',
      glow: 'shadow-[0_0_20px_rgba(18,230,147,0.3)]',
    },
    error: {
      icon: 'text-danger',
      bg: 'from-danger/20 to-danger/5',
      border: 'border-danger/40',
      glow: 'shadow-[0_0_20px_rgba(255,83,112,0.3)]',
    },
    info: {
      icon: 'text-info',
      bg: 'from-info/20 to-info/5',
      border: 'border-info/40',
      glow: 'shadow-[0_0_20px_rgba(74,158,255,0.3)]',
    },
  };

  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.95 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`
        relative w-full max-w-sm p-4 rounded-xl
        bg-gradient-to-r ${colors.bg}
        backdrop-blur-xl border ${colors.border}
        ${colors.glow}
        overflow-hidden
      `}
    >
      {/* Animated Progress Bar */}
      {duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-success rounded-full"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}

      <div className="flex items-start gap-3">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.1 
          }}
        >
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-main mb-1">
            {title}
          </h4>
          <p className="text-xs text-muted leading-relaxed">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <motion.button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded-md hover:bg-hover/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4 text-muted hover:text-main transition-colors" />
        </motion.button>
      </div>
    </motion.div>
  );
};

/**
 * Toast Container Component
 * Manages multiple toast notifications
 */
interface ToastContainerProps {
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>;
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  notifications, 
  onClose 
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <NotificationToast
              {...notification}
              onClose={onClose}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
