'use client';

import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import type { HoverCardTriggerProps } from './hover-card.types';

export function HoverCardTrigger({ ...props }: HoverCardTriggerProps) {
  return (
    <PreviewCardPrimitive.Trigger data-slot='hover-card-trigger' {...props} />
  );
}
