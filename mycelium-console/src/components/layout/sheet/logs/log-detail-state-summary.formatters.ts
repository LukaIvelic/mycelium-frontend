import type { LogDetail } from '@/lib/types/log';
import { LogDetailLabel } from './logs.config';
import type { LogDetailSummaryItem } from './logs.types';

export function appendStateSummaryItem(
  items: LogDetailSummaryItem[],
  detail: LogDetail,
  createSummaryItem: (
    key: string,
    label: string,
    className: string,
  ) => LogDetailSummaryItem,
): void {
  if (detail.aborted) {
    items.push(
      createSummaryItem('aborted', LogDetailLabel.Aborted, 'text-rose-300'),
    );
    return;
  }

  if (detail.completed) {
    items.push(
      createSummaryItem(
        'completed',
        LogDetailLabel.Completed,
        'text-foreground/60',
      ),
    );
  }

  if (detail.idempotent) {
    items.push(
      createSummaryItem(
        'idempotent',
        LogDetailLabel.Idempotent,
        'text-violet-300',
      ),
    );
  }
}
