import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import type * as React from 'react';

export type DialogProps = DialogPrimitive.Root.Props;
export type DialogTriggerProps = DialogPrimitive.Trigger.Props;
export type DialogPortalProps = DialogPrimitive.Portal.Props;
export type DialogCloseProps = DialogPrimitive.Close.Props;
export type DialogOverlayProps = DialogPrimitive.Backdrop.Props;
export type DialogTitleProps = DialogPrimitive.Title.Props;
export type DialogDescriptionProps = DialogPrimitive.Description.Props;
export type DialogHeaderProps = React.ComponentProps<'div'>;

export interface DialogContentProps extends DialogPrimitive.Popup.Props {
  showCloseButton?: boolean;
}

export interface DialogFooterProps extends React.ComponentProps<'div'> {
  showCloseButton?: boolean;
}
