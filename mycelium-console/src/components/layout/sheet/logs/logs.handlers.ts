import type { QueryClient } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';
import type { Log } from '@/lib/types/log';
import { LogQueryKey } from './logs.config';

export function reconcileOpenLogIds(
  currentIds: Set<string>,
  logs: Log[],
): Set<string> {
  const logIds = new Set(logs.map(getLogId));
  const currentIdList = Array.from(currentIds);
  const nextIds = new Set(currentIdList.filter((id) => logIds.has(id)));

  if (nextIds.size === currentIds.size) {
    return currentIds;
  }

  return nextIds;
}

export function createToggleAllLogsHandler(
  logs: Log[] | undefined,
  areAllExpanded: boolean,
  setOpenLogIds: Dispatch<SetStateAction<Set<string>>>,
) {
  return function handleToggleAllLogs(): void {
    if (!logs?.length) {
      return;
    }

    const nextIds = areAllExpanded
      ? new Set<string>()
      : new Set(logs.map(getLogId));
    setOpenLogIds(nextIds);
  };
}

export function createToggleLogHandler(
  setOpenLogIds: Dispatch<SetStateAction<Set<string>>>,
) {
  return function handleToggleLog(logId: string): void {
    setOpenLogIds((currentIds) => toggleLogId(currentIds, logId));
  };
}

export function createLogRowToggleHandler(
  logId: string,
  onToggleLog: (logId: string) => void,
) {
  return function handleLogRowToggle(): void {
    onToggleLog(logId);
  };
}

export function createRefreshLogsHandler(
  queryClient: QueryClient,
  isRefreshing: boolean,
  setIsRefreshing: Dispatch<SetStateAction<boolean>>,
) {
  return async function handleRefreshLogs(): Promise<void> {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);

    try {
      await invalidateLogQueries(queryClient);
    } finally {
      setIsRefreshing(false);
    }
  };
}

function getLogId(log: Log): string {
  return log.id;
}

function toggleLogId(currentIds: Set<string>, logId: string): Set<string> {
  const nextIds = new Set(currentIds);

  if (nextIds.has(logId)) {
    nextIds.delete(logId);
    return nextIds;
  }

  nextIds.add(logId);
  return nextIds;
}

async function invalidateLogQueries(queryClient: QueryClient): Promise<void> {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: [LogQueryKey.Logs],
      refetchType: 'active',
    }),
    queryClient.invalidateQueries({
      queryKey: [LogQueryKey.Services],
      refetchType: 'active',
    }),
  ]);
}
