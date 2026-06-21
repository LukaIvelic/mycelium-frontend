'use client';

import { type PointerEvent, useState } from 'react';
import { useRightSidebar } from '@/hooks/use-right-sidebar';
import { cn } from '@/lib/utils';

export function RightSidebar() {
  const { state, content, width, setWidth } = useRightSidebar();
  const [isResizing, setIsResizing] = useState(false);

  const handleResizePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!state) return;

    event.preventDefault();
    const startX = event.clientX;
    const startWidth = width;

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      setWidth(startWidth + startX - moveEvent.clientX);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    setIsResizing(true);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });
  };

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-lg border bg-sidebar',
        'transition-[width,border-color,margin] duration-300 ease-in-out',
        state ? 'mb-2 border-[#434343] p-2 py-3' : 'border-transparent p-0',
        isResizing && 'transition-none',
      )}
      style={{ width: state ? width : 0 }}
    >
      {state && (
        <button
          aria-label='Resize right sidebar'
          className={cn(
            'absolute inset-y-0 left-0 z-10 w-2 cursor-ew-resize',
            'bg-transparent transition-colors hover:bg-foreground/10',
            isResizing && 'bg-foreground/10',
          )}
          onPointerDown={handleResizePointerDown}
          type='button'
        />
      )}
      <div className='flex h-full w-full min-w-0 flex-col bg-sidebar text-sidebar-foreground'>
        {content}
      </div>
    </div>
  );
}
