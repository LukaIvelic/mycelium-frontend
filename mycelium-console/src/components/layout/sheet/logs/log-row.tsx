import { cn } from '@/lib/utils';
import { LogDetailsDropdown } from './log-details-dropdown';
import { LogMetaRow } from './log-meta-row';
import { createSheetLogElementId } from './logs.config';
import { createLogRowToggleHandler } from './logs.handlers';
import type { LogRowProps } from './logs.types';

export function LogRow({
  log,
  isFocused = false,
  isOpen,
  onToggleLog,
}: LogRowProps) {
  const handleToggle = createLogRowToggleHandler(log.id, onToggleLog);

  return (
    <div
      id={createSheetLogElementId(log.id)}
      className={cn(
        'px-2 py-2 rounded-[8px]',
        'border border-foreground/10 bg-[#1d1d1d]/30',
        'grid grid-cols-4 grid-rows-[auto_auto] gap-2',
        isFocused && 'border-emerald-300/55 bg-emerald-300/5',
      )}
    >
      <LogMetaRow log={log} />
      <LogDetailsDropdown log={log} isOpen={isOpen} onToggle={handleToggle} />
    </div>
  );
}
