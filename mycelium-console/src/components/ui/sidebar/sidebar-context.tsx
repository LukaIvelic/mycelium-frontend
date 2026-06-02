'use client';

import { createContext, use } from 'react';
import type { SidebarContextProps } from './sidebar.types';

export const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = use(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}
