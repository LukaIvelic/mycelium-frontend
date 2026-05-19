import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedCollapse } from './animated-collapse';
import { LOG_DETAIL_ICON_SIZE } from './logs.config';
import type { LogDetailSectionProps } from './logs.types';

export function LogDetailSection({
  title,
  contentId,
  children,
}: LogDetailSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const iconClassName = isOpen ? 'rotate-180' : '';

  function handleSectionToggle(): void {
    setIsOpen((open) => !open);
  }

  return (
    <div className='rounded-sm border border-foreground/10'>
      <button
        type='button'
        onClick={handleSectionToggle}
        aria-controls={contentId}
        aria-expanded={isOpen}
        className={cn(
          'w-full px-2 py-1',
          'flex items-center justify-between text-left text-xs text-foreground/50',
        )}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            'text-xs transition-transform duration-200',
            iconClassName,
          )}
          size={LOG_DETAIL_ICON_SIZE}
        />
      </button>

      <AnimatedCollapse id={contentId} isOpen={isOpen}>
        <div className='min-h-0 overflow-hidden'>
          <div className='border-t border-foreground/10'>{children}</div>
        </div>
      </AnimatedCollapse>
    </div>
  );
}
