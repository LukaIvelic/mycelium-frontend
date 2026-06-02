'use client';

import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import type { HoverCardProps } from './hover-card.types';

export function HoverCard({ ...props }: HoverCardProps) {
  return <PreviewCardPrimitive.Root data-slot='hover-card' {...props} />;
}
