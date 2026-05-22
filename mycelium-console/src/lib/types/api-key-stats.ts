export interface ApiKeyIpDetails {
  as?: string;
  city?: string;
  country?: string;
  countryCode?: string;
  isp?: string;
  lat?: number;
  lon?: number;
  org?: string;
  query: string;
  region?: string;
  regionName?: string;
  status: string;
  timezone?: string;
  zip?: string;
}

export interface ApiKeyIpStats {
  apiKeyId: string;
  country: string;
  detailed: ApiKeyIpDetails | null;
  firstSeen: string;
  ip: string;
  lastSeen: string;
  requestCount: number;
}

export interface ApiKeyStats {
  apiKeyId: string;
  averageLatencyMs: number;
  ipStats: ApiKeyIpStats[];
  projectId: string;
  totalRequests: number;
}
