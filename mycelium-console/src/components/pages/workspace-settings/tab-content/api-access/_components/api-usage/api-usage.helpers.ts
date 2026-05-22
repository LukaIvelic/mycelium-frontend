import type { ApiKeyIpStats, ApiKeyStats } from '@/lib/types/api-key-stats';
import {
  API_USAGE_EMPTY_COUNT,
  API_USAGE_ITEMS,
  API_USAGE_LATENCY_UNIT,
  API_USAGE_UNKNOWN_COUNTRY,
} from './api-usage.config';
import { type ApiUsageItemProps, ApiUsageValueKey } from './api-usage.types';

export function createApiUsageItems(
  apiKeyStats: ApiKeyStats[],
): ApiUsageItemProps[] {
  const totalRequests = getTotalRequests(apiKeyStats);
  const averageLatency = getAverageLatency(apiKeyStats, totalRequests);
  const uniqueIps = getUniqueIpCount(apiKeyStats);
  const lastIpCountry = getLastIpCountry(apiKeyStats);
  const usageValues: Record<ApiUsageValueKey, string> = {
    [ApiUsageValueKey.TotalRequests]: totalRequests.toLocaleString(),
    [ApiUsageValueKey.AverageLatency]: `${averageLatency.toLocaleString()} ${API_USAGE_LATENCY_UNIT}`,
    [ApiUsageValueKey.UniqueIps]: uniqueIps.toLocaleString(),
    [ApiUsageValueKey.LastIpCountry]: lastIpCountry,
  };

  return API_USAGE_ITEMS.map((item) => ({
    includeSeparator: item.includeSeparator,
    title: item.title,
    value: usageValues[item.valueKey],
  }));
}

function getTotalRequests(apiKeyStats: ApiKeyStats[]): number {
  return apiKeyStats.reduce(
    (total, stats) => total + stats.totalRequests,
    API_USAGE_EMPTY_COUNT,
  );
}

function getAverageLatency(
  apiKeyStats: ApiKeyStats[],
  totalRequests: number,
): number {
  if (totalRequests === API_USAGE_EMPTY_COUNT) return API_USAGE_EMPTY_COUNT;

  const totalLatency = apiKeyStats.reduce(
    (total, stats) => total + stats.averageLatencyMs * stats.totalRequests,
    API_USAGE_EMPTY_COUNT,
  );

  return Math.round(totalLatency / totalRequests);
}

function getUniqueIpCount(apiKeyStats: ApiKeyStats[]): number {
  const uniqueIps = new Set(
    apiKeyStats.flatMap((stats) => stats.ipStats.map((ipStats) => ipStats.ip)),
  );

  return uniqueIps.size;
}

function getLastIpCountry(apiKeyStats: ApiKeyStats[]): string {
  const ipStats = apiKeyStats.flatMap((stats) => stats.ipStats);

  if (ipStats.length === API_USAGE_EMPTY_COUNT)
    return API_USAGE_UNKNOWN_COUNTRY;

  const lastIpStats = ipStats.reduce(getLatestIpStats);

  return lastIpStats.country;
}

function getLatestIpStats(
  currentLatest: ApiKeyIpStats,
  candidate: ApiKeyIpStats,
): ApiKeyIpStats {
  const currentLastSeen = new Date(currentLatest.lastSeen).getTime();
  const candidateLastSeen = new Date(candidate.lastSeen).getTime();

  if (candidateLastSeen > currentLastSeen) return candidate;

  return currentLatest;
}
