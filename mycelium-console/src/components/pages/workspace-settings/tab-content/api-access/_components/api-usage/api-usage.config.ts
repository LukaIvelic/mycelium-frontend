import { type ApiUsageItemConfig, ApiUsageValueKey } from './api-usage.types';

export const API_USAGE_LEARN_MORE_ROUTE = '/billing';
export const API_USAGE_EMPTY_COUNT = 0;
export const API_USAGE_LATENCY_UNIT = 'ms';
export const API_USAGE_UNKNOWN_COUNTRY = 'Unknown';

export const API_USAGE_ITEMS: ApiUsageItemConfig[] = [
  {
    includeSeparator: true,
    title: 'Total Requests',
    valueKey: ApiUsageValueKey.TotalRequests,
  },
  {
    includeSeparator: true,
    title: 'Average Latency',
    valueKey: ApiUsageValueKey.AverageLatency,
  },
  {
    includeSeparator: true,
    title: 'Unique IPs',
    valueKey: ApiUsageValueKey.UniqueIps,
  },
  {
    includeSeparator: false,
    title: "Last IP's Country",
    valueKey: ApiUsageValueKey.LastIpCountry,
  },
];
