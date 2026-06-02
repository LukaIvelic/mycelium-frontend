import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { cn } from '@/lib/utils';
import type { SidebarMenuSkeletonProps } from './sidebar.types';

const SKELETON_WIDTH_RANGE = 40;
const SKELETON_WIDTH_MIN = 50;

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: SidebarMenuSkeletonProps) {
  const [width] = React.useState<string>(createSkeletonWidth);

  return (
    <div
      data-slot='sidebar-menu-skeleton'
      data-sidebar='menu-skeleton'
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className='size-4 rounded-md'
          data-sidebar='menu-skeleton-icon'
        />
      )}
      <Skeleton
        className='h-4 max-w-(--skeleton-width) flex-1'
        data-sidebar='menu-skeleton-text'
        style={createSkeletonStyle(width)}
      />
    </div>
  );
}

function createSkeletonWidth(): string {
  return `${Math.floor(Math.random() * SKELETON_WIDTH_RANGE) + SKELETON_WIDTH_MIN}%`;
}

function createSkeletonStyle(width: string) {
  return { '--skeleton-width': width } as React.CSSProperties;
}
