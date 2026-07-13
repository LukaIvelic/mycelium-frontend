'use client';

import { cn } from '@/lib/utils';
import { SidebarState } from './sidebar.constants';
import type { SidebarProps } from './sidebar.types';
import { useSidebar } from './sidebar-context';

export function DesktopSidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: SidebarProps) {
  const { state } = useSidebar();
  const collapsibleValue = state === SidebarState.Collapsed ? collapsible : '';

  return (
    <div
      className='group peer hidden text-sidebar-foreground md:block'
      data-state={state}
      data-collapsible={collapsibleValue}
      data-variant={variant}
      data-side={side}
      data-slot='sidebar'
    >
      <SidebarGap variant={variant} />
      <div
        data-slot='sidebar-container'
        data-side={side}
        className={cn(getSidebarContainerClassName(variant), className)}
        {...props}
      >
        <div
          data-sidebar='sidebar'
          data-slot='sidebar-inner'
          className='flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border'
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarGap({ variant }: Pick<SidebarProps, 'variant'>) {
  return (
    <div
      data-slot='sidebar-gap'
      className={cn(
        'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
        'group-data-[collapsible=offcanvas]:w-0',
        'group-data-[side=right]:rotate-180',
        getSidebarGapIconClassName(variant),
      )}
    />
  );
}

function getSidebarGapIconClassName(variant: SidebarProps['variant']): string {
  if (variant === 'floating' || variant === 'inset') {
    return 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]';
  }

  return 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)';
}

function getSidebarContainerClassName(
  variant: SidebarProps['variant'],
): string {
  return cn(
    'fixed inset-y-4 z-10 hidden h-[calc(100svh-2rem)] w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-4 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc((var(--sidebar-width)*-1)+1rem)] data-[side=right]:right-4 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc((var(--sidebar-width)*-1)+1rem)] md:flex',
    getSidebarContainerVariantClassName(variant),
  );
}

function getSidebarContainerVariantClassName(
  variant: SidebarProps['variant'],
): string {
  if (variant === 'floating' || variant === 'inset') {
    return 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]';
  }

  return 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l';
}
