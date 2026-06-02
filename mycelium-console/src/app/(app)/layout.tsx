'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AppHeader } from '@/components/layout/header/app-header';
import { RightSidebar } from '@/components/layout/right-sidebar/right-sidebar';
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import { SidebarInset } from '@/components/ui/sidebar/sidebar-structure';
import { useRightSidebar } from '@/hooks/use-right-sidebar';
import { cn } from '@/lib/utils';
import { shouldCloseRightSidebar } from './layout.config';
import type { AppLayoutProps } from './layout.types';

export default function AppLayout({ children }: AppLayoutProps) {
  const { state, closeRightSidebar } = useRightSidebar();
  const pathname = usePathname();

  useEffect(() => {
    if (shouldCloseRightSidebar(pathname)) {
      closeRightSidebar();
    }
  }, [pathname, closeRightSidebar]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className={cn('flex flex-1 min-h-0', state && 'gap-x-2  pr-4')}>
          <div
            className={cn(
              'flex flex-1 flex-col',
              'bg-[#1D1D1D] border border-[#434343] border-b-0!',
              'rounded-t-lg overflow-hidden',
              state && 'border rounded-tr-lg',
            )}
          >
            {children}
          </div>
          <RightSidebar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
