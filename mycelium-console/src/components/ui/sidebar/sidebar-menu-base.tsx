import { cn } from '@/lib/utils';
import type { SidebarMenuProps } from './sidebar.types';

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-0', className)}
      {...props}
    />
  );
}
