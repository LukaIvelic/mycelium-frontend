import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import type {
  SheetCloseProps,
  SheetPortalProps,
  SheetProps,
  SheetTriggerProps,
} from './sheet.types';

export function Sheet({ ...props }: SheetProps) {
  return <SheetPrimitive.Root data-slot='sheet' {...props} />;
}

export function SheetTrigger({ ...props }: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />;
}

export function SheetClose({ ...props }: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />;
}

export function SheetPortal({ ...props }: SheetPortalProps) {
  return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />;
}
