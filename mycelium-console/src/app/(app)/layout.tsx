import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div
          className={cn(
            'flex flex-1 flex-col',
            'bg-[#1D1D1D] border-t border-l border-[#434343]',
            'rounded-tl-lg overflow-hidden',
          )}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
