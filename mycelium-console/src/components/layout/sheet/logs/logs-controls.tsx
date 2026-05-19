import { cn } from '@/lib/utils';
import type { LogsControlsProps } from './logs.types';

export function LogsControls({
  canToggleAll,
  isRefreshing,
  areAllExpanded,
  onRefresh,
  onToggleAll,
}: LogsControlsProps) {
  const controlButtonClassName = cn(
    'rounded-sm border border-foreground/10 bg-foreground/2.5 px-2 py-1 text-xs text-foreground/65 transition-colors',
    'enabled:hover:cursor-pointer enabled:hover:bg-foreground/5',
    'disabled:cursor-not-allowed disabled:text-foreground/35',
  );
  const toggleLabel = areAllExpanded ? 'Collapse all' : 'Expand all';
  const refreshLabel = isRefreshing ? 'Refreshing...' : 'Refresh';

  return (
    <div className='sticky top-0 z-10 rounded-[8px] border border-foreground/10 bg-[#252525]/95 p-1 backdrop-blur-sm'>
      <div className='flex flex-wrap items-center gap-1'>
        <button
          type='button'
          onClick={onToggleAll}
          disabled={!canToggleAll}
          className={controlButtonClassName}
        >
          {toggleLabel}
        </button>

        <button
          type='button'
          onClick={onRefresh}
          disabled={isRefreshing}
          className={controlButtonClassName}
        >
          {refreshLabel}
        </button>
      </div>
    </div>
  );
}
