import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useLogs } from '@/hooks/use-logs.hook';
import { cn } from '@/lib/utils';
import { LogRow } from './log-row';
import { EMPTY_LOGS, MANUAL_REFRESH_QUERY_OPTIONS } from './logs.config';
import {
  createRefreshLogsHandler,
  createToggleAllLogsHandler,
  createToggleLogHandler,
  reconcileOpenLogIds,
} from './logs.handlers';
import type { LogsProps } from './logs.types';
import { LogsControls } from './logs-controls';

export function Logs({ integrationId }: LogsProps) {
  const [requestedOpenLogIds, setRequestedOpenLogIds] = useState<Set<string>>(
    new Set(),
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { useLogsByIntegration } = useLogs();
  const { data: logsData, isFetching } = useLogsByIntegration(
    integrationId,
    undefined,
    MANUAL_REFRESH_QUERY_OPTIONS,
  );
  const logs = logsData ?? EMPTY_LOGS;
  const openLogIds = useMemo(
    () => reconcileOpenLogIds(requestedOpenLogIds, logs),
    [requestedOpenLogIds, logs],
  );
  const hasLogs = Boolean(logs.length);
  const areAllExpanded = hasLogs
    ? logs.every((log) => openLogIds.has(log.id))
    : false;
  const handleToggleAll = createToggleAllLogsHandler(
    logs,
    areAllExpanded,
    setRequestedOpenLogIds,
  );
  const handleToggleLog = createToggleLogHandler(setRequestedOpenLogIds);
  const handleRefresh = createRefreshLogsHandler(
    queryClient,
    isRefreshing,
    setIsRefreshing,
  );

  return (
    <div className={cn('flex flex-col gap-3 no-scrollbar')}>
      <LogsControls
        canToggleAll={hasLogs}
        isRefreshing={isRefreshing || isFetching}
        areAllExpanded={areAllExpanded}
        onRefresh={handleRefresh}
        onToggleAll={handleToggleAll}
      />

      {isFetching && !hasLogs && <Skeleton className='h-20 w-full' />}
      {logs.map((log) => (
        <LogRow
          key={log.id}
          log={log}
          isOpen={openLogIds.has(log.id)}
          onToggleLog={handleToggleLog}
        />
      ))}
    </div>
  );
}
