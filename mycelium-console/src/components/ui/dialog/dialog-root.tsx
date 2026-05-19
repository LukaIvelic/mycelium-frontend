import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import type {
  DialogCloseProps,
  DialogPortalProps,
  DialogProps,
  DialogTriggerProps,
} from './dialog.types';

export function Dialog({ ...props }: DialogProps) {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />;
}

export function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
}

export function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

export function DialogClose({ ...props }: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
}
