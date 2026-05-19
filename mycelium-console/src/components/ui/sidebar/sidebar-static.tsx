import { cn } from '@/lib/utils';
import type { SidebarProps } from './sidebar.types';

export function StaticSidebar({ className, children, ...props }: SidebarProps) {
  return (
    <div
      data-slot='sidebar'
      className={cn(
        'flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
