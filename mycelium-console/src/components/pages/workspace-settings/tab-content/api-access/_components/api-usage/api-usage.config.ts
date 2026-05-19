import type { ApiUsageItemProps } from './api-usage.types';

export const API_USAGE_LEARN_MORE_ROUTE = '/billing';

export const API_USAGE_ITEMS: ApiUsageItemProps[] = [
  {
    includeSeparator: true,
    title: 'Total Requests',
    value: '10,000',
  },
  {
    includeSeparator: true,
    title: 'Error Rate',
    value: '0.5%',
  },
  {
    includeSeparator: true,
    title: 'Average Latency',
    value: '120 ms',
  },
  {
    includeSeparator: false,
    title: 'Unique IPs',
    value: '1',
  },
];
