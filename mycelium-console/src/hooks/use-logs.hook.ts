import { useQuery } from "@tanstack/react-query";

import { LogService } from "@/api/services/log/log-service";
import { FindLogsQuery } from "@/api/services/log/log-service.types";

const logService = new LogService();
const DEFAULT_LIMIT = 100;
const DEFAULT_OFFSET = 0;

const logKeys = {
  all: ["logs"] as const,
  byProject: (projectId: string, query?: FindLogsQuery) =>
    [
      ...logKeys.all,
      "project",
      projectId,
      query?.limit ?? DEFAULT_LIMIT,
      query?.offset ?? DEFAULT_OFFSET,
    ] as const,
  detail: (projectId: string, logId: string) =>
    [...logKeys.all, "project", projectId, "detail", logId] as const,
  topology: (projectId: string) =>
    [...logKeys.all, "project", projectId, "topology"] as const,
  trace: (projectId: string, traceId: string) =>
    [...logKeys.all, "project", projectId, "trace", traceId] as const,
  traceGraph: (projectId: string, traceId: string) =>
    [...logKeys.trace(projectId, traceId), "graph"] as const,
};

function useLogsByProject(
  projectId: string | undefined,
  query?: FindLogsQuery,
) {
  return useQuery({
    queryKey: logKeys.byProject(projectId ?? "", query),
    queryFn: () => logService.findByProject(projectId!, query),
    enabled: Boolean(projectId),
  });
}

function useLogDetail(
  projectId: string | undefined,
  logId: string | undefined,
) {
  return useQuery({
    queryKey: logKeys.detail(projectId ?? "", logId ?? ""),
    queryFn: () => logService.findDetail(projectId!, logId!),
    enabled: Boolean(projectId && logId),
  });
}

function useTraceLogs(
  projectId: string | undefined,
  traceId: string | undefined,
) {
  return useQuery({
    queryKey: logKeys.trace(projectId ?? "", traceId ?? ""),
    queryFn: () => logService.findByTrace(projectId!, traceId!),
    enabled: Boolean(projectId && traceId),
  });
}

function useTraceGraph(
  projectId: string | undefined,
  traceId: string | undefined,
) {
  return useQuery({
    queryKey: logKeys.traceGraph(projectId ?? "", traceId ?? ""),
    queryFn: () => logService.findTraceGraph(projectId!, traceId!),
    enabled: Boolean(projectId && traceId),
  });
}

export function useLogs() {
  return {
    useLogsByProject,
    useLogDetail,
    useTraceLogs,
    useTraceGraph,
  };
}
