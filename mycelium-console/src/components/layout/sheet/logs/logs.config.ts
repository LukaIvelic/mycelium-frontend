import type { Log } from '@/lib/types/log';

export enum LogDetailLabel {
  Aborted = 'aborted',
  Body = 'body',
  Completed = 'completed',
  Headers = 'headers',
  Idempotent = 'idempotent',
  Loading = 'loading',
  NoBody = 'no body',
  NoHeaders = 'no headers',
  Unavailable = 'unavailable',
}

export enum LogQueryKey {
  Logs = 'logs',
  Services = 'services',
}

export const MANUAL_REFRESH_QUERY_OPTIONS = {
  staleTime: Number.POSITIVE_INFINITY,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
} as const;

export const LOG_DETAIL_ICON_SIZE = 14;
export const LOG_DETAIL_ANIMATION_DURATION_CLASS = 'duration-200';
export const LOG_BYTES_PER_KILOBYTE = 1024;
export const LOG_SIZE_PRECISION = 1;
export const EMPTY_LOGS: Log[] = [];
