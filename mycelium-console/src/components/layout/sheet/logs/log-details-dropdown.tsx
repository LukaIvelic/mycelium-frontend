import { ChevronDown } from 'lucide-react';
import { useLogs } from '@/hooks/use-logs.hook';
import { cn } from '@/lib/utils';
import { AnimatedCollapse } from './animated-collapse';
import { LogDetailContent } from './log-detail-content';
import { getLogDetailSummaryItems } from './log-detail-summary.formatters';
import {
  LOG_DETAIL_ICON_SIZE,
  MANUAL_REFRESH_QUERY_OPTIONS,
} from './logs.config';
import type { LogDetailsDropdownProps } from './logs.types';

export function LogDetailsDropdown({
  log,
  isOpen,
  onToggle,
}: LogDetailsDropdownProps) {
  const { useLogDetail } = useLogs();
  const { data: detail, isLoading } = useLogDetail(
    log.projectId,
    log.id,
    MANUAL_REFRESH_QUERY_OPTIONS,
  );
  const detailContentId = `log-details-${log.id}`;
  const summaryItems = getLogDetailSummaryItems(detail, isLoading);
  const iconClassName = isOpen ? 'rotate-180' : '';

  return (
    <div className='col-span-4 row-2 rounded-sm border border-foreground/10 bg-foreground/2.5'>
      <button
        type='button'
        onClick={onToggle}
        aria-controls={detailContentId}
        aria-expanded={isOpen}
        className={cn(
          'w-full p-1',
          'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 text-left',
          'hover:cursor-pointer',
        )}
      >
        <div className='flex min-w-0 flex-wrap items-center gap-1'>
          {summaryItems.map((item) => (
            <span
              key={item.key}
              className={cn(
                'rounded-sm border border-foreground/10 bg-foreground/3 px-1.5 py-0.5 text-[11px] leading-none',
                item.className,
              )}
            >
              {item.label}
            </span>
          ))}
        </div>

        <ChevronDown
          className={cn(
            'text-xs transition-transform duration-200',
            iconClassName,
          )}
          size={LOG_DETAIL_ICON_SIZE}
        />
      </button>

      <AnimatedCollapse id={detailContentId} isOpen={isOpen}>
        <div className='min-h-0 overflow-hidden border-t border-foreground/10'>
          <div className='grid gap-1 p-1'>
            <LogDetailContent
              detail={detail}
              isLoading={isLoading}
              logId={log.id}
            />
          </div>
        </div>
      </AnimatedCollapse>
    </div>
  );
}
