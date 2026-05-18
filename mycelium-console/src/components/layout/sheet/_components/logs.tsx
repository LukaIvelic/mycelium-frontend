import { useQueryClient } from '@tanstack/react-query';
import { useLogs } from '@/hooks/use-logs.hook';
import { useServices } from '@/hooks/use-services.hook';
import type { Log, LogDetail } from '@/lib/types/log';
import { statusCodeColor } from '@/lib/status-code';
import { cn } from '@/lib/utils';
import dateformat from 'dateformat';
import { ChevronDown } from 'lucide-react';
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface LogsProps {
  integrationId: string;
}

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
const manualRefreshQueryOptions = {
  staleTime: Number.POSITIVE_INFINITY,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
} as const;

export function Logs({ integrationId }: LogsProps) {
  const queryClient = useQueryClient();
  const { useLogsByIntegration } = useLogs();
  const { data: logs, isFetching } = useLogsByIntegration(
    integrationId,
    undefined,
    manualRefreshQueryOptions,
  );
  const [openLogIds, setOpenLogIds] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!logs) {
      return;
    }

    const logIds = new Set(logs.map((log) => log.id));

    setOpenLogIds((current) => {
      const next = new Set([...current].filter((id) => logIds.has(id)));
      return next.size === current.size ? current : next;
    });
  }, [logs]);

  const hasLogs = Boolean(logs?.length);
  const areAllExpanded =
    logs?.length !== undefined && logs.length > 0
      ? logs.every((log) => openLogIds.has(log.id))
      : false;

  const handleToggleAll = () => {
    if (!logs?.length) {
      return;
    }

    setOpenLogIds(
      areAllExpanded ? new Set() : new Set(logs.map((log) => log.id)),
    );
  };

  const handleToggleLog = (logId: string) => {
    setOpenLogIds((current) => {
      const next = new Set(current);

      if (next.has(logId)) {
        next.delete(logId);
      } else {
        next.add(logId);
      }

      return next;
    });
  };

  const handleRefresh = async () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);

    try {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['logs'],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['services'],
          refetchType: 'active',
        }),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-3 no-scrollbar')}>
      <LogsControls
        canToggleAll={hasLogs}
        isRefreshing={isRefreshing || isFetching}
        areAllExpanded={areAllExpanded}
        onRefresh={handleRefresh}
        onToggleAll={handleToggleAll}
      />

      {logs?.map((log) => {
        return (
          <div
            key={log.id}
            className={cn(
              'px-2 py-2 rounded-[8px]',
              'border border-foreground/10 bg-[#1d1d1d]/30',
              'grid grid-cols-4 grid-rows-[auto_auto] gap-2',
            )}
          >
            <LogMetaRow log={log} />
            <LogDetailsDropdown
              log={log}
              isOpen={openLogIds.has(log.id)}
              onToggle={() => handleToggleLog(log.id)}
            />
          </div>
        );
      })}
    </div>
  );
}

function LogsControls({
  canToggleAll,
  isRefreshing,
  areAllExpanded,
  onRefresh,
  onToggleAll,
}: {
  canToggleAll: boolean;
  isRefreshing: boolean;
  areAllExpanded: boolean;
  onRefresh: () => void;
  onToggleAll: () => void;
}) {
  const controlButtonClassName = cn(
    'rounded-sm border border-foreground/10 bg-foreground/2.5 px-2 py-1 text-xs text-foreground/65 transition-colors',
    'enabled:hover:cursor-pointer enabled:hover:bg-foreground/5',
    'disabled:cursor-not-allowed disabled:text-foreground/35',
  );

  return (
    <div className="sticky top-0 z-10 rounded-[8px] border border-foreground/10 bg-[#252525]/95 p-1 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={onToggleAll}
          disabled={!canToggleAll}
          className={controlButtonClassName}
        >
          {areAllExpanded ? 'Collapse all' : 'Expand all'}
        </button>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className={controlButtonClassName}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
}

function LogMetaRow({ log }: { log: Log }) {
  const { useFindById } = useServices();
  const { data: callerIntegration } = useFindById(
    log.callerIntegrationId,
    manualRefreshQueryOptions,
  );
  const baseItemClassName =
    'text-xs justify-self-start p-1 px-2 border border-foreground/10 rounded-sm bg-foreground/2.5';
  const callerLabel =
    callerIntegration?.name ?? formatLogOriginLabel(log.origin);

  const items: Array<{
    key: string;
    className: string;
    content: string;
    title?: string;
  }> = [
    {
      key: 'duration',
      className: 'text-foreground/50',
      content: `${log.durationMs} ms`,
    },
    {
      key: 'status',
      className: statusCodeColor(log.statusCode),
      content: `${log.method} ${log.statusCode}`,
    },
    {
      key: 'origin',
      className: 'min-w-0 truncate text-foreground/50',
      content: callerLabel,
      title: log.origin,
    },
  ];

  return (
    <div
      className={cn(
        'col-span-4 row-1',
        'grid grid-cols-[minmax(0,1fr)_max-content] items-center gap-1',
      )}
    >
      <div className="grid min-w-0 grid-cols-[max-content_max-content_minmax(0,1fr)] items-center gap-1">
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

function LogDetailsDropdown({
  log,
  isOpen,
  onToggle,
}: {
  log: Log;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { useLogDetail } = useLogs();
  const { data: detail, isLoading } = useLogDetail(
    log.projectId,
    log.id,
    manualRefreshQueryOptions,
  );
  const detailContentId = `log-details-${log.id}`;
  const hasHeaders = Boolean(detail && Object.keys(detail.headers).length > 0);
  const hasBody = Boolean(detail?.body);
  const summaryItems = getLogDetailSummaryItems(detail, isLoading);

  return (
    <div className="col-span-4 row-2 rounded-sm border border-foreground/10 bg-foreground/2.5">
      <button
        type="button"
        onClick={onToggle}
        aria-controls={detailContentId}
        aria-expanded={isOpen}
        className={cn(
          'w-full p-1',
          'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 text-left',
          'hover:cursor-pointer',
        )}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-1">
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
            isOpen && 'rotate-180',
          )}
          size={14}
        />
      </button>

      <AnimatedCollapse id={detailContentId} isOpen={isOpen}>
        <div className="min-h-0 overflow-hidden border-t border-foreground/10">
          <div className="grid gap-1 p-1">
            {isLoading ? (
              <div className="p-2 text-xs text-foreground/50">
                Loading details...
              </div>
            ) : hasHeaders || hasBody ? (
              <>
                {hasHeaders ? (
                  <LogDetailSection
                    title="headers"
                    contentId={`log-headers-${log.id}`}
                  >
                    <div className="grid gap-1 p-2 text-xs font-mono">
                      {Object.entries(detail?.headers ?? {}).map(
                        ([key, value]) => (
                          <LogDetailKeyValueRow key={key} label={key}>
                            <span className="min-w-0 break-words text-emerald-300">
                              {value}
                            </span>
                          </LogDetailKeyValueRow>
                        ),
                      )}
                    </div>
                  </LogDetailSection>
                ) : null}

                {detail?.body ? (
                  <LogDetailSection
                    title="body"
                    contentId={`log-body-${log.id}`}
                  >
                    <LogDetailBodyContent body={detail.body} />
                  </LogDetailSection>
                ) : null}
              </>
            ) : (
              <div className="p-2 text-xs text-foreground/50">
                No detail content available.
              </div>
            )}
          </div>
        </div>
      </AnimatedCollapse>
    </div>
  );
}

function LogDetailSection({
  title,
  contentId,
  children,
}: {
  title: string;
  contentId: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-sm border border-foreground/10">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
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
            isOpen && 'rotate-180',
          )}
          size={14}
        />
      </button>

      <AnimatedCollapse id={contentId} isOpen={isOpen}>
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-foreground/10">{children}</div>
        </div>
      </AnimatedCollapse>
    </div>
  );
}

function LogDetailKeyValueRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[max-content_minmax(0,1fr)] gap-2">
      <span className="text-sky-300">{label}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function LogDetailBodyContent({ body }: { body: string }) {
  let parsedBody: JsonValue | undefined;

  try {
    parsedBody = JSON.parse(body) as JsonValue;
  } catch {
    parsedBody = undefined;
  }

  if (parsedBody === undefined) {
    return (
      <pre className="p-2 font-mono text-xs whitespace-pre-wrap break-words text-emerald-300">
        {body}
      </pre>
    );
  }

  return (
    <div className="grid gap-1 p-2 font-mono text-xs">
      <LogDetailJsonValue value={parsedBody} />
    </div>
  );
}

function LogDetailJsonValue({ value }: { value: JsonValue }) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-foreground/40">[]</span>;
    }

    return (
      <div className="grid gap-1">
        {value.map((item, index) => (
          <LogDetailKeyValueRow key={index} label={`[${index}]`}>
            <LogDetailJsonValue value={item} />
          </LogDetailKeyValueRow>
        ))}
      </div>
    );
  }

  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return <span className="text-foreground/40">{'{}'}</span>;
    }

    return (
      <div className="grid gap-1">
        {entries.map(([key, nestedValue]) => (
          <LogDetailKeyValueRow key={key} label={key}>
            <LogDetailJsonValue value={nestedValue} />
          </LogDetailKeyValueRow>
        ))}
      </div>
    );
  }

  return <LogDetailPrimitiveValue value={value} />;
}

function LogDetailPrimitiveValue({ value }: { value: JsonPrimitive }) {
  if (typeof value === 'string') {
    return (
      <span className="min-w-0 wrap-break-word text-emerald-300">{value}</span>
    );
  }

  if (typeof value === 'number') {
    return <span className="text-amber-300">{value}</span>;
  }

  if (typeof value === 'boolean') {
    return <span className="text-violet-300">{String(value)}</span>;
  }

  return <span className="text-foreground/40">null</span>;
}

function AnimatedCollapse({
  id,
  isOpen,
  children,
}: {
  id: string;
  isOpen: boolean;
  children: ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const updateHeight = () => {
      setHeight(content.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, [children]);

  return (
    <div
      id={id}
      style={{ height: isOpen ? height : 0 }}
      className={cn(
        'overflow-hidden transition-[height,opacity] duration-200 ease-out',
        isOpen ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

function formatLogOriginLabel(origin: string) {
  try {
    const url = new URL(origin);
    return url.host;
  } catch {
    return origin;
  }
}

function getLogDetailSummaryItems(
  detail: LogDetail | undefined,
  isLoading: boolean,
) {
  if (isLoading && !detail) {
    return [
      {
        key: 'loading',
        label: 'loading',
        className: 'text-foreground/40',
      },
    ];
  }

  if (!detail) {
    return [
      {
        key: 'unavailable',
        label: 'unavailable',
        className: 'text-foreground/40',
      },
    ];
  }

  const headerCount = Object.keys(detail.headers).length;
  const items = [
    {
      key: 'headers',
      label:
        headerCount > 0
          ? `${headerCount} header${headerCount === 1 ? '' : 's'}`
          : 'no headers',
      className: headerCount > 0 ? 'text-sky-300' : 'text-foreground/40',
    },
    {
      key: 'body',
      label: detail.body ? 'body' : 'no body',
      className: detail.body ? 'text-emerald-300' : 'text-foreground/40',
    },
  ];

  if (detail.contentType) {
    items.push({
      key: 'content-type',
      label: formatLogContentTypeLabel(detail.contentType),
      className: 'text-foreground/60',
    });
  }

  const sizeLabel = formatLogDetailSize(detail);
  if (sizeLabel) {
    items.push({
      key: 'size',
      label: sizeLabel,
      className: 'text-foreground/60',
    });
  }

  if (detail.aborted) {
    items.push({
      key: 'aborted',
      label: 'aborted',
      className: 'text-rose-300',
    });
  } else if (detail.completed) {
    items.push({
      key: 'completed',
      label: 'completed',
      className: 'text-foreground/60',
    });
  }

  if (detail.idempotent) {
    items.push({
      key: 'idempotent',
      label: 'idempotent',
      className: 'text-violet-300',
    });
  }

  return items;
}

function formatLogContentTypeLabel(contentType: string) {
  const [type, subtype] = contentType.split('/');

  if (!subtype) {
    return contentType;
  }

  if (subtype.includes('json')) {
    return 'json';
  }

  if (type === 'text') {
    return subtype;
  }

  return subtype;
}

function formatLogDetailSize(detail: LogDetail) {
  if (detail.contentLength && detail.contentLength > 0) {
    return formatBytes(detail.contentLength);
  }

  if (detail.bodySizeKb > 0) {
    return detail.bodySizeKb >= 1024
      ? `${(detail.bodySizeKb / 1024).toFixed(1)} MB`
      : `${trimTrailingZero(detail.bodySizeKb.toFixed(1))} KB`;
  }

  return null;
}

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${trimTrailingZero((bytes / (1024 * 1024)).toFixed(1))} MB`;
  }

  if (bytes >= 1024) {
    return `${trimTrailingZero((bytes / 1024).toFixed(1))} KB`;
  }

  return `${bytes} B`;
}

function trimTrailingZero(value: string) {
  return value.replace(/\.0$/, '');
}
