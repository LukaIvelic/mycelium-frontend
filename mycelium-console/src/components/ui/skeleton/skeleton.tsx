import { cn } from '@/lib/utils';
import type { SkeletonProps } from './skeleton.types';

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot='skeleton'
      className={cn('animate-pulse rounded-md bg-foreground/10', className)}
      {...props}
    />
  );
}

export { Skeleton };
