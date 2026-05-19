import type { CSSProperties } from 'react';

export const PROJECT_CARD_NO_DESCRIPTION = 'No description';
export const PROJECT_CARD_DESCRIPTION_MAX_LENGTH = 40;
export const PROJECT_CARD_API_KEY_GENERATED_LABEL = 'Api key generated';
export const PROJECT_CARD_API_KEY_NOT_GENERATED_LABEL = 'Api key not generated';
export const PROJECT_CARD_API_KEY_GENERATED_COLOR = '#57E244';
export const PROJECT_CARD_API_KEY_MISSING_COLOR = 'orange';
export const PROJECT_CARD_SERVICE_COUNT_LABEL = '4 services mapped';
export const PROJECT_CARD_API_KEY_ICON_SIZE = 10;
export const PROJECT_CARD_SERVICE_COUNT_ICON_SIZE = 8;

const PROJECT_CARD_PATTERN_DOT_SIZE = '1px';
const PROJECT_CARD_PATTERN_GRID_SIZE = '12px';

export const PROJECT_CARD_PREVIEW_STYLE = {
  backgroundImage: `radial-gradient(circle, color-mix(in srgb, var(--foreground) 8%, transparent) ${PROJECT_CARD_PATTERN_DOT_SIZE}, transparent ${PROJECT_CARD_PATTERN_DOT_SIZE})`,
  backgroundSize: `${PROJECT_CARD_PATTERN_GRID_SIZE} ${PROJECT_CARD_PATTERN_GRID_SIZE}`,
} satisfies CSSProperties;
