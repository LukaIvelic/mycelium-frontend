import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LOG_DETAIL_ANIMATION_DURATION_CLASS } from './logs.config';
import type { AnimatedCollapseProps } from './logs.types';

export function AnimatedCollapse({
  id,
  isOpen,
  children,
}: AnimatedCollapseProps) {
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const opacityClassName = isOpen ? 'opacity-100' : 'opacity-0';

  useLayoutEffect(() => {
    return observeContentHeight(contentRef.current, setHeight);
  }, []);

  return (
    <div
      id={id}
      style={{ height: isOpen ? height : 0 }}
      className={cn(
        'overflow-hidden transition-[height,opacity] ease-out',
        LOG_DETAIL_ANIMATION_DURATION_CLASS,
        opacityClassName,
      )}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

function observeContentHeight(
  content: HTMLDivElement | null,
  setHeight: (height: number) => void,
): (() => void) | undefined {
  if (!content) {
    return undefined;
  }

  function updateHeight(): void {
    setHeight(content?.scrollHeight ?? 0);
  }

  updateHeight();

  if (typeof ResizeObserver === 'undefined') {
    return undefined;
  }

  const observer = new ResizeObserver(updateHeight);
  observer.observe(content);

  return function disconnectObserver(): void {
    observer.disconnect();
  };
}
