import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { cn } from '@/lib/utils';
import type { DialogContentProps, DialogOverlayProps } from './dialog.types';
import { DialogPortal } from './dialog-root';

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot='dialog-overlay'
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className,
      )}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot='dialog-content'
        className={cn(
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && <DialogCloseButton />}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogCloseButton() {
  return (
    <DialogPrimitive.Close
      data-slot='dialog-close'
      render={
        <Button
          variant='ghost'
          className='absolute top-2 right-2'
          size='icon-sm'
        />
      }
    >
      <XIcon />
      <span className='sr-only'>Close</span>
    </DialogPrimitive.Close>
  );
}
