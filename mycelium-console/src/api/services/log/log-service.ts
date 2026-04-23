import { Log, LogDetail, TraceGraph } from "@/lib/types/log";
import { apiClient, ApiClient } from "../../api-client";
import { FindLogsQuery } from "./log-service.types";

export class LogService {
  private apiClient: ApiClient = apiClient;

  async findByProject(projectId: string, query?: FindLogsQuery) {
    return this.apiClient.get<Log[]>(`/logs/${projectId}`, query);
  }

  async findDetail(projectId: string, logId: string) {
    return this.apiClient.get<LogDetail>(`/logs/${projectId}/${logId}/detail`);
  }

  async findByTrace(projectId: string, traceId: string) {
    return this.apiClient.get<Log[]>(`/logs/${projectId}/trace/${traceId}`);
  }

  async findTraceGraph(projectId: string, traceId: string) {
    return this.apiClient.get<TraceGraph>(
      `/logs/${projectId}/trace/${traceId}/graph`,
    );
  }
}
