import dateformat from 'dateformat';
import { useServices } from '@/hooks/use-services.hook';
import { statusCodeColor } from '@/lib/status-code';
import { cn } from '@/lib/utils';
import { MANUAL_REFRESH_QUERY_OPTIONS } from './logs.config';
import { formatLogOriginLabel } from './logs.formatters';
import type { LogMetaItem, LogMetaRowProps } from './logs.types';

export function LogMetaRow({ log }: LogMetaRowProps) {
  const { useFindById } = useServices();
  const { data: callerIntegration } = useFindById(
    log.callerIntegrationId,
    MANUAL_REFRESH_QUERY_OPTIONS,
  );
  const baseItemClassName =
    'text-xs justify-self-start p-1 px-2 border border-foreground/10 rounded-sm bg-foreground/2.5';
  const callerLabel =
    callerIntegration?.name ?? formatLogOriginLabel(log.origin);
  const statusClassName = statusCodeColor(log.statusCode);
  const durationContent = `${log.durationMs} ms`;
  const statusContent = `${log.method} ${log.statusCode}`;
  const items = createLogMetaItems(
    durationContent,
    statusClassName,
    statusContent,
    callerLabel,
    log.origin,
  );

  return (
    <div
      className={cn(
        'col-span-4 row-1',
        'grid grid-cols-[minmax(0,1fr)_max-content] items-center gap-1',
      )}
    >
      <div className='grid min-w-0 grid-cols-[max-content_max-content_minmax(0,1fr)] items-center gap-1'>
        {items.map((item) => (
          <span
            key={item.key}
            className={cn(baseItemClassName, item.className)}
            title={item.title}
          >
            {item.content}
          </span>
        ))}
      </div>

      <span
        className={cn(
          baseItemClassName,
          'justify-self-end whitespace-nowrap text-foreground/50',
        )}
      >
        {dateformat(log.timestamp)}
      </span>
    </div>
  );
}

function createLogMetaItems(
  durationContent: string,
  statusClassName: string,
  statusContent: string,
  callerLabel: string,
  origin: string,
): LogMetaItem[] {
  return [
    {
      key: 'duration',
      className: 'text-foreground/50',
      content: durationContent,
    },
    { key: 'status', className: statusClassName, content: statusContent },
    {
      key: 'origin',
      className: 'min-w-0 truncate text-foreground/50',
      content: callerLabel,
      title: origin,
    },
  ];
}
