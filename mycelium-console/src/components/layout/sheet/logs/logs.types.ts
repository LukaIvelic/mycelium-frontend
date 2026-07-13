import type { ReactNode } from 'react';
import type { Log, LogDetail } from '@/lib/types/log';

export interface LogsProps {
  focusedLogId?: string | null;
  integrationId: string;
  onDismissFocusedLog?: () => void;
}

export interface LogsControlsProps {
  areAllExpanded: boolean;
  canToggleAll: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onToggleAll: () => void;
}

export interface LogMetaRowProps {
  log: Log;
}

export interface LogRowProps {
  isFocused?: boolean;
  isOpen: boolean;
  log: Log;
  onToggleLog: (logId: string) => void;
}

export interface LogDetailsDropdownProps {
  isOpen: boolean;
  log: Log;
  onToggle: () => void;
}

export interface LogDetailSectionProps {
  children: ReactNode;
  contentId: string;
  title: string;
}

export interface LogDetailKeyValueRowProps {
  children: ReactNode;
  label: string;
}

export interface LogDetailBodyContentProps {
  body: string;
}

export interface LogDetailJsonValueProps {
  value: JsonValue;
}

export interface LogDetailPrimitiveValueProps {
  value: JsonPrimitive;
}

export interface AnimatedCollapseProps {
  children: ReactNode;
  id: string;
  isOpen: boolean;
}

export interface LogDetailContentProps {
  detail: LogDetail | undefined;
  isLoading: boolean;
  logId: string;
}

export interface LogDetailSummaryItem {
  className: string;
  key: string;
  label: string;
}

export interface LogMetaItem {
  className: string;
  content: string;
  key: string;
  title?: string;
}

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };
