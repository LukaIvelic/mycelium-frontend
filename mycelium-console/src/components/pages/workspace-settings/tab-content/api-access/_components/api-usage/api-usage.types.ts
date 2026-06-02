import type { ReactNode } from 'react';

export enum ApiUsageValueKey {
  AverageLatency = 'averageLatency',
  LastIpCountry = 'lastIpCountry',
  TotalRequests = 'totalRequests',
  UniqueIps = 'uniqueIps',
}

export interface ApiUsageItemConfig {
  includeSeparator?: boolean;
  title: string;
  valueKey: ApiUsageValueKey;
}

export interface ApiUsageItemProps {
  includeSeparator?: boolean;
  isLoading?: boolean;
  title: string;
  value: ReactNode;
}
