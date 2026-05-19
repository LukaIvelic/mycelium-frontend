import { type RefObject, useEffect } from 'react';
import {
  FOOTER_DANGER_MENU_ITEM_CLASS,
  FOOTER_DEFAULT_MENU_ITEM_CLASS,
} from './footer.constants';
import {
  createPopupEscapeHandler,
  createPopupPointerDownHandler,
} from './footer.handlers';

export function getMenuItemClass(danger?: boolean): string {
  if (danger) {
    return FOOTER_DANGER_MENU_ITEM_CLASS;
  }

  return FOOTER_DEFAULT_MENU_ITEM_CLASS;
}

export function usePopupDismiss(
  open: boolean,
  rootRef: RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;

    const onPointerDown = createPopupPointerDownHandler(rootRef, onClose);
    const onEscape = createPopupEscapeHandler(onClose);

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onEscape);
    };
  }, [open, rootRef, onClose]);
}
