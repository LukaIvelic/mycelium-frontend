import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import type * as React from 'react';

export type SheetProps = SheetPrimitive.Root.Props;
export type SheetTriggerProps = SheetPrimitive.Trigger.Props;
export type SheetCloseProps = SheetPrimitive.Close.Props;
export type SheetPortalProps = SheetPrimitive.Portal.Props;
export type SheetOverlayProps = SheetPrimitive.Backdrop.Props;
export type SheetTitleProps = SheetPrimitive.Title.Props;
export type SheetDescriptionProps = SheetPrimitive.Description.Props;
export type SheetHeaderProps = React.ComponentProps<'div'>;
export type SheetFooterProps = React.ComponentProps<'div'>;

export interface SheetContentProps extends SheetPrimitive.Popup.Props {
  showCloseButton?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
}
