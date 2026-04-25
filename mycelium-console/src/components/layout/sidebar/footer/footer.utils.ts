import { type RefObject, useEffect } from 'react';

export function getMenuItemClass(danger?: boolean): string {
  return danger
    ? 'h-10 text-sm text-[#ff8d8d] hover:bg-[#2a1a1a] hover:text-[#ffb1b1]'
    : 'h-10 text-sm text-[#d0d0d0] hover:bg-[#333333] hover:text-[#f5f5f5]';
}

export function usePopupDismiss(
  open: boolean,
  rootRef: RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onEscape);
    };
  }, [open, rootRef, onClose]);
}
