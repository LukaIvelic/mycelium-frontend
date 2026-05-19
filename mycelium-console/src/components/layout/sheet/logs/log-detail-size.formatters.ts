import type { LogDetail } from '@/lib/types/log';
import { LOG_BYTES_PER_KILOBYTE, LOG_SIZE_PRECISION } from './logs.config';

export function formatLogContentTypeLabel(contentType: string): string {
  const [type, subtype] = contentType.split('/');

  if (!subtype) {
    return contentType;
  }

  if (subtype.includes('json')) {
    return 'json';
  }

  if (type === 'text') {
    return subtype;
  }

  return subtype;
}

export function formatLogDetailSize(detail: LogDetail): string | null {
  if (detail.contentLength && detail.contentLength > 0) {
    return formatBytes(detail.contentLength);
  }

  if (detail.bodySizeKb > 0) {
    return formatKilobytes(detail.bodySizeKb);
  }

  return null;
}

function formatKilobytes(kilobytes: number): string {
  if (kilobytes >= LOG_BYTES_PER_KILOBYTE) {
    const megabytes = kilobytes / LOG_BYTES_PER_KILOBYTE;
    return `${trimTrailingZero(megabytes.toFixed(LOG_SIZE_PRECISION))} MB`;
  }

  return `${trimTrailingZero(kilobytes.toFixed(LOG_SIZE_PRECISION))} KB`;
}

function formatBytes(bytes: number): string {
  const bytesPerMegabyte = LOG_BYTES_PER_KILOBYTE * LOG_BYTES_PER_KILOBYTE;

  if (bytes >= bytesPerMegabyte) {
    const megabytes = bytes / bytesPerMegabyte;
    return `${trimTrailingZero(megabytes.toFixed(LOG_SIZE_PRECISION))} MB`;
  }

  if (bytes >= LOG_BYTES_PER_KILOBYTE) {
    const kilobytes = bytes / LOG_BYTES_PER_KILOBYTE;
    return `${trimTrailingZero(kilobytes.toFixed(LOG_SIZE_PRECISION))} KB`;
  }

  return `${bytes} B`;
}

function trimTrailingZero(value: string): string {
  return value.replace(/\.0$/, '');
}
