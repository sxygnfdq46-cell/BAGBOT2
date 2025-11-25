'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Zap, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Shield,
  Home
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  isNew?: boolean;
}

interface SidebarProps {
  activeRoute: string;
  onNavigate: (href: string) => void;
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Charts', href: '/charts', icon: TrendingUp },
  { name: 'Signals', href: '/signals', icon: Zap },
  { name: 'Logs', href: '/logs', icon: FileText, badge: 3, isNew: true },
  { name: 'Settings', href: '/settings', icon: Settings },
];

/**
 * Enhanced Collapsible Sidebar Component
 * Features:
 * - Smooth collapse/expand animation
 * - Glowing yellow left border on active items
 * - Hover slide-in effect for labels
 * - Maroon gradient icons
 * - Update badges for notifications
 * - Responsive design
 */
const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Add admin panel to navigation if user is admin
  const navItems: NavigationItem[] = user?.role === 'admin' 
    ? [...navigationItems, { name: 'Admin Panel', href: '/admin', icon: Shield } as NavigationItem]
    : navigationItems;

  return (
    <motion.nav
      initial={false}
      animate={{
        width: isCollapsed ? '80px' : '256px',
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="relative bg-black/95 backdrop-blur-xl border-r border-neon-cyan/20 min-h-screen shadow-2xl"
      style={{
        boxShadow: '4px 0 30px rgba(0, 246, 255, 0.2), inset -1px 0 0 rgba(0, 246, 255, 0.1)',
      }}
    >
      {/* Collapse Toggle Button */}
      <motion.button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 z-50 w-6 h-6 bg-black/50 border border-neon-cyan/60 rounded-full flex items-center justify-center hover:border-neon-cyan transition-all shadow-neon-cyan backdrop-blur-sm"
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-3 h-3 text-neon-cyan" />
        </motion.div>
      </motion.button>

      <div className="p-4">
        {/* Professional Trading Platform Header */}
        <div className="mb-6 px-2">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs text-neon-cyan font-medium uppercase tracking-wider neon-text">
                  Cyberpunk Trading Terminal
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse-glow shadow-neon-cyan" />
                  <span className="text-[10px] text-neon-cyan font-semibold uppercase">
                    Live
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse-glow" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className={`
                    relative w-full flex items-center px-4 py-3 rounded-xl
                    text-left transition-all duration-300 overflow-hidden group cursor-pointer
                    ${isActive
                      ? 'bg-gradient-to-r from-neon-cyan/30 via-neon-purple/15 to-neon-pink/20 shadow-neon-cyan border border-neon-cyan/50'
                      : 'hover:bg-gradient-to-r hover:from-neon-cyan/15 hover:to-neon-purple/10 hover:shadow-neon-cyan hover:border hover:border-neon-cyan/20'
                    }
                  `}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                {/* Glowing Left Border (Active Item) */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink rounded-r-full"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: '0 0 20px rgba(0, 246, 255, 0.8), 0 0 40px rgba(155, 92, 255, 0.5), 0 0 8px rgba(255, 0, 122, 0.7)',
                    }}
                  />
                )}

                {/* Icon with Neon Glow */}
                <motion.div
                  className={`
                    relative flex-shrink-0 
                    ${isActive 
                      ? 'text-neon-cyan drop-shadow-[0_0_10px_rgba(0,246,255,0.7)]' 
                      : 'text-gray-400 group-hover:text-neon-cyan'
                    }
                  `}
                  whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>

                {/* Label with Slide-in Effect */}
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between flex-1 ml-3"
                    >
                      <span
                        className={`
                          font-semibold text-sm
                          ${isActive ? 'text-neon-cyan neon-text' : 'text-gray-300'}
                          group-hover:text-neon-cyan transition-colors
                        `}
                      >
                        {item.name}
                      </span>

                      {/* Update Badge */}
                      {item.badge && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: 'spring',
                            stiffness: 500,
                            damping: 15 
                          }}
                          className="relative"
                        >
                          <div className="px-1.5 py-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full shadow-neon-cyan">
                            <span className="text-[10px] font-bold text-black">
                              {item.badge}
                            </span>
                          </div>
                          {/* Pulsing glow for new items */}
                          {item.isNew && (
                            <motion.div
                              className="absolute inset-0 bg-neon-cyan rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed State Badge */}
                {isCollapsed && item.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full flex items-center justify-center shadow-neon-cyan"
                  >
                    <span className="text-[8px] font-bold text-black">
                      {item.badge}
                    </span>
                  </motion.div>
                )}

                {/* Hover Slide Effect Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-transparent rounded-lg"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />
              </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Navigation Footer */}
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="mt-8 pt-4 border-t border-neon-cyan/20"
            >
              {/* User Profile Section */}
              {user && (
                <div className="px-3 mb-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-black/50 border border-neon-cyan/30 hover:border-neon-cyan/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-neon-cyan">
                        <User className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-semibold text-neon-cyan">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                    </button>

                    {/* User Menu Dropdown */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-black/95 border border-neon-cyan/30 backdrop-blur-xl shadow-neon-cyan"
                        >
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neon-pink hover:bg-neon-pink/10 transition-all"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Sign Out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              <div className="px-4 py-2">
                <p className="text-xs text-neon-cyan font-medium">
                  Version 1.0.0
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  © 2025 BagBot
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
