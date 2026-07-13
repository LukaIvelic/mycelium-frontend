export type ReactFlowLayout = {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
};

type ReactFlowNode = {
  id: string;
  data: {
    label: string;
  };
  position?: {
    x: number;
    y: number;
  };
};

type ReactFlowEdge = {
  data?: {
    communicationCount: number;
    communications: ReactFlowEdgeCommunication[];
    requests: ReactFlowEdgeRequestSummary[];
    sourceLabel: string;
    targetLabel: string;
  };
  id: string;
  source: string;
  target: string;
};

export type ReactFlowEdgeCommunication = {
  averageDurationMs: number;
  count: number;
  id: string;
  lastDurationMs: number;
  lastSeenAt: string;
  method: string;
  path: string;
  protocol: string;
  statusCode: number;
};

export type ReactFlowEdgeRequestSummary = {
  bodySizeKb: number;
  durationMs: number;
  hasBody: boolean;
  headerSizeBytes: number;
  id: string;
  method: string;
  path: string;
  protocol: string;
  spanId: string;
  statusCode: number;
  timestamp: string;
  traceId: string;
};
