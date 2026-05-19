import { cn } from '@/lib/utils';
import { LogDetailsDropdown } from './log-details-dropdown';
import { LogMetaRow } from './log-meta-row';
import { createLogRowToggleHandler } from './logs.handlers';
import type { LogRowProps } from './logs.types';

export function LogRow({ log, isOpen, onToggleLog }: LogRowProps) {
  const handleToggle = createLogRowToggleHandler(log.id, onToggleLog);

  return (
    <div
      className={cn(
        'px-2 py-2 rounded-[8px]',
        'border border-foreground/10 bg-[#1d1d1d]/30',
        'grid grid-cols-4 grid-rows-[auto_auto] gap-2',
      )}
    >
      <LogMetaRow log={log} />
      <LogDetailsDropdown log={log} isOpen={isOpen} onToggle={handleToggle} />
    </div>
  );
}
