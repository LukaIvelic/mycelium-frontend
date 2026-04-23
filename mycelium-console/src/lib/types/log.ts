export type Log = {
  id: string;
  project_id: string;
  api_key_id: string;
  trace_id: string;
  span_id: string;
  parent_span_id: string | null;
  source_service_key: string | null;
  source_service_name: string | null;
  source_service_version: string | null;
  source_origin: string | null;
  method: string;
  path: string;
  origin: string;
  protocol: string;
  status_code: number;
  duration_ms: number;
  timestamp: string;
  created_at: string;
};

export type LogDetail = {
  log_id: string;
  body_size_kb: number;
  content_length: number;
  content_type: string;
  body: string | null;
  headers: Record<string, string>;
  completed: boolean;
  aborted: boolean;
  idempotent: boolean;
};

export type TraceGraphCall = {
  logId: string;
  spanId: string;
  parentSpanId: string | null;
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  timestamp: string;
};

export type TraceGraphNode = {
  id: string;
  label: string;
  origin: string;
  requestCount: number;
  rootRequestCount: number;
};

export type TraceGraphEdge = {
  id: string;
  source: string;
  target: string;
  callCount: number;
  calls: TraceGraphCall[];
};

export type TraceGraph = {
  nodes: TraceGraphNode[];
  edges: TraceGraphEdge[];
};

export type ProjectTopologyNode = {
  id: string;
  label: string;
  origin: string | null;
  serviceKey: string | null;
  serviceName: string | null;
  serviceVersion: string | null;
  observedCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
};

export type ProjectTopologyEdge = {
  id: string;
  source: string;
  target: string;
  callCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
  latestTraceId: string | null;
};
