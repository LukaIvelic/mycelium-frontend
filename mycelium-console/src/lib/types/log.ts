export type Log = {
  id: string;
  projectId: string;
  apiKeyId: string;
  traceId: string;
  spanId: string;
  parentSpanId: string | null;
  serviceKey: string | null;
  serviceName: string | null;
  serviceVersion: string | null;
  serviceDescription: string | null;
  serviceOrigin: string | null;
  method: string;
  path: string;
  origin: string;
  protocol: string;
  statusCode: number;
  durationMs: number;
  timestamp: string;
  createdAt: string;
};

export type LogDetail = {
  logId: string;
  bodySizeKb: number;
  contentLength: number;
  contentType: string;
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
