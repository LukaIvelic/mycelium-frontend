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
  title: string;
  value: string;
}
