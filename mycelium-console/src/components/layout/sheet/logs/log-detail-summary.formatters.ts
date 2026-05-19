import type { LogDetail } from '@/lib/types/log';
import {
  formatLogContentTypeLabel,
  formatLogDetailSize,
} from './log-detail-size.formatters';
import { appendStateSummaryItem } from './log-detail-state-summary.formatters';
import { LogDetailLabel } from './logs.config';
import type { LogDetailSummaryItem } from './logs.types';

export function getLogDetailSummaryItems(
  detail: LogDetail | undefined,
  isLoading: boolean,
): LogDetailSummaryItem[] {
  if (isLoading && !detail) {
    return [
      createSummaryItem(
        'loading',
        LogDetailLabel.Loading,
        'text-foreground/40',
      ),
    ];
  }

  if (!detail) {
    return [
      createSummaryItem(
        'unavailable',
        LogDetailLabel.Unavailable,
        'text-foreground/40',
      ),
    ];
  }

  const items = createBaseDetailSummaryItems(detail);
  appendOptionalDetailSummaryItems(items, detail);

  return items;
}

function createBaseDetailSummaryItems(
  detail: LogDetail,
): LogDetailSummaryItem[] {
  const headerCount = Object.keys(detail.headers).length;
  const headersLabel = formatHeaderCountLabel(headerCount);
  const headersClassName =
    headerCount > 0 ? 'text-sky-300' : 'text-foreground/40';
  const bodyLabel = detail.body ? LogDetailLabel.Body : LogDetailLabel.NoBody;
  const bodyClassName = detail.body ? 'text-emerald-300' : 'text-foreground/40';

  return [
    createSummaryItem('headers', headersLabel, headersClassName),
    createSummaryItem('body', bodyLabel, bodyClassName),
  ];
}

function appendOptionalDetailSummaryItems(
  items: LogDetailSummaryItem[],
  detail: LogDetail,
): void {
  if (detail.contentType) {
    items.push(
      createSummaryItem(
        'content-type',
        formatLogContentTypeLabel(detail.contentType),
        'text-foreground/60',
      ),
    );
  }

  const sizeLabel = formatLogDetailSize(detail);

  if (sizeLabel) {
    items.push(createSummaryItem('size', sizeLabel, 'text-foreground/60'));
  }

  appendStateSummaryItem(items, detail, createSummaryItem);
}

function formatHeaderCountLabel(headerCount: number): string {
  if (headerCount === 0) {
    return LogDetailLabel.NoHeaders;
  }

  const suffix = headerCount === 1 ? '' : 's';
  return `${headerCount} header${suffix}`;
}

function createSummaryItem(
  key: string,
  label: string,
  className: string,
): LogDetailSummaryItem {
  return { key, label, className };
}
