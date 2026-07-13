import type { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';

export type HoverCardProps = PreviewCardPrimitive.Root.Props;
export type HoverCardTriggerProps = PreviewCardPrimitive.Trigger.Props;

export interface HoverCardContentProps
  extends PreviewCardPrimitive.Popup.Props,
    Pick<
      PreviewCardPrimitive.Positioner.Props,
      'align' | 'alignOffset' | 'anchor' | 'side' | 'sideOffset'
    > {}
