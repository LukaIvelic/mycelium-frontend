import { cn } from '@/lib/utils';
import type { CenteredProps } from './centered.types';

export function Centered({ children }: CenteredProps) {
  return (
    <div
      className={cn(
        'w-300 h-full',
        'mx-auto py-12 px-6',
        'overflow-auto no-scrollbar',
      )}
    >
      {children}
    </div>
  );
}
