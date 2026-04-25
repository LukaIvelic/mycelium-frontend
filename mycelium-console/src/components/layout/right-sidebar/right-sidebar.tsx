'use client';

import { useRightSidebar } from '@/hooks/use-right-sidebar';
import { cn } from '@/lib/utils';

export function RightSidebar() {
  const { state, content } = useRightSidebar();

  return (
    <div
      className={cn(
        'overflow-hidden shrink-0 border-spacing-1 p-2 py-3',
        'transition-all duration-300 ease-in-out',
        'border-[#434343] border rounded-lg',
        state ? 'w-69 mb-2' : 'w-0 border-transparent',
      )}
    >
      <div className='flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground'>
        {content}
      </div>
    </div>
  );
}
