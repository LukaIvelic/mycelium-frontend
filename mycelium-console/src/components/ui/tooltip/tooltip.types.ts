import type { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

export type TooltipProviderProps = TooltipPrimitive.Provider.Props;
export type TooltipProps = TooltipPrimitive.Root.Props;
export type TooltipTriggerProps = TooltipPrimitive.Trigger.Props;

export interface TooltipContentProps
  extends TooltipPrimitive.Popup.Props,
    Pick<
      TooltipPrimitive.Positioner.Props,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    > {}
