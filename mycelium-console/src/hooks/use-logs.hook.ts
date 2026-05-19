import { useQuery } from '@tanstack/react-query';
import { LogService } from '@/api/services/log/log-service';
import type { FindLogsQuery } from '@/api/services/log/log-service.types';

const logService = new LogService();
const DEFAULT_LIMIT = 100;
const DEFAULT_OFFSET = 0;
type QueryBehaviorOptions = {
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnMount?: boolean;
};

const logKeys = {
  all: ['logs'] as const,
  byProject: (projectId: string, query?: FindLogsQuery) =>
    [
      ...logKeys.all,
      'project',
      projectId,
      query?.limit ?? DEFAULT_LIMIT,
      query?.offset ?? DEFAULT_OFFSET,
    ] as const,
  byIntegration: (integrationId: string, query?: FindLogsQuery) =>
    [
      ...logKeys.all,
      'integration',
      integrationId,
      query?.limit ?? DEFAULT_LIMIT,
      query?.offset ?? DEFAULT_OFFSET,
    ] as const,
  detail: (projectId: string, logId: string) =>
    [...logKeys.all, 'project', projectId, 'detail', logId] as const,
  topology: (projectId: string) =>
    [...logKeys.all, 'project', projectId, 'topology'] as const,
};

function useLogsByProject(
  projectId: string | undefined,
  query?: FindLogsQuery,
  options?: QueryBehaviorOptions,
) {
  return useQuery({
    queryKey: logKeys.byProject(projectId ?? '', query),
    queryFn: () => logService.findByProject(projectId as string, query),
    enabled: Boolean(projectId),
    ...options,
  });
}

function useLogsByIntegration(
  integrationId: string | undefined,
  query?: FindLogsQuery,
  options?: QueryBehaviorOptions,
) {
  return useQuery({
    queryKey: logKeys.byIntegration(integrationId ?? '', query),
    queryFn: () => logService.findByIntegration(integrationId as string, query),
    enabled: Boolean(integrationId),
    ...options,
  });
}

function useLogDetail(
  projectId: string | undefined,
  logId: string | undefined,
  options?: QueryBehaviorOptions,
) {
  return useQuery({
    queryKey: logKeys.detail(projectId ?? '', logId ?? ''),
    queryFn: () => logService.findDetail(projectId as string, logId as string),
    enabled: Boolean(projectId && logId),
    ...options,
  });
}

export function useLogs() {
  return {
    useLogsByProject,
    useLogsByIntegration,
    useLogDetail,
  };
}
