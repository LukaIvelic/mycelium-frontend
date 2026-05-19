import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
  const [openLogIds, setOpenLogIds] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { useLogsByIntegration } = useLogs();
  const { data: logsData, isFetching } = useLogsByIntegration(
    integrationId,
    undefined,
    MANUAL_REFRESH_QUERY_OPTIONS,
  );
  const logs = logsData ?? EMPTY_LOGS;
  const hasLogs = Boolean(logs.length);
  const areAllExpanded = hasLogs
    ? logs.every((log) => openLogIds.has(log.id))
    : false;
  const handleToggleAll = createToggleAllLogsHandler(
    logs,
    areAllExpanded,
    setOpenLogIds,
  );
  const handleToggleLog = createToggleLogHandler(setOpenLogIds);
  const handleRefresh = createRefreshLogsHandler(
    queryClient,
    isRefreshing,
    setIsRefreshing,
  );

  useEffect(() => {
    setOpenLogIds((currentIds) => reconcileOpenLogIds(currentIds, logs));
  }, [logs]);

  return (
    <div className={cn('flex flex-col gap-3 no-scrollbar')}>
      <LogsControls
        canToggleAll={hasLogs}
        isRefreshing={isRefreshing || isFetching}
        areAllExpanded={areAllExpanded}
        onRefresh={handleRefresh}
        onToggleAll={handleToggleAll}
      />

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
