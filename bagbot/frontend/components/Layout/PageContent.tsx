'use client';

import React from 'react';
import { useSidebar } from '@/context/SidebarContext';

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContent({ children, className = '' }: PageContentProps) {
  const { sidebarCollapsed } = useSidebar();

  return (
    <div 
      className={`
        min-h-screen bg-black p-4 md:p-8 
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
