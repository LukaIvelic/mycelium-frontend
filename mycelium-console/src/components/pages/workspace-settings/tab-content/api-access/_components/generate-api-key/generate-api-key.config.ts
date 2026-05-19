import type { CSSProperties } from 'react';

export const API_KEY_EMPTY_LIST_LENGTH = 0;
export const API_KEY_COPY_RESET_DELAY_MS = 1500;
export const API_KEY_FIELD_GRID_OFFSET = 1;
export const API_KEY_FIELD_LABEL_ROW = 1;
export const API_KEY_FIELD_VALUE_ROW = 2;
export const API_KEY_PROJECT_NAME_MAX_LENGTH = 20;
export const API_KEY_UNAVAILABLE_LABEL = '-';
export const API_KEY_KEY_ICON_SIZE = 18;
export const API_KEY_ACTION_ICON_SIZE = 20;
export const API_KEY_ACTION_STROKE_WIDTH = 1.5;
export const API_KEY_COPIED_LABEL = 'Copied';
export const API_KEY_COPY_LABEL = 'Copy';

export function getApiKeyFieldStyle(index: number, row: number): CSSProperties {
  const gridColumn = index + API_KEY_FIELD_GRID_OFFSET;

  return {
    gridColumn,
    gridRow: row,
  };
}
