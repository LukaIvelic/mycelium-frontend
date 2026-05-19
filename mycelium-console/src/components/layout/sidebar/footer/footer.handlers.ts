import { FOOTER_ESCAPE_KEY, FooterMenuAction } from './footer.constants';
import type {
  CreateFooterEntryClickHandlerParams,
  SidebarFooterOpenSetter,
  SidebarFooterRootRef,
} from './footer.types';

export function createClosePopupHandler(setOpen: SidebarFooterOpenSetter) {
  return function handleClosePopup(): void {
    setOpen(false);
  };
}

export function createTogglePopupHandler(setOpen: SidebarFooterOpenSetter) {
  return function handleTogglePopup(): void {
    setOpen((isOpen) => !isOpen);
  };
}

export function createFooterEntryClickHandler({
  action,
  onClick,
  onSelect,
  router,
  signOut,
}: CreateFooterEntryClickHandlerParams) {
  return function handleFooterEntryClick(): void {
    if (action === FooterMenuAction.SignOut) {
      signOut(router);
    }

    onClick?.(router);
    onSelect?.();
  };
}

export function createPopupPointerDownHandler(
  rootRef: SidebarFooterRootRef,
  onClose: () => void,
) {
  return function handlePointerDown(event: PointerEvent): void {
    const eventTarget = event.target as Node;
    const isInsidePopup = rootRef.current?.contains(eventTarget);

    if (isInsidePopup) {
      return;
    }

    onClose();
  };
}

export function createPopupEscapeHandler(onClose: () => void) {
  return function handleEscape(event: KeyboardEvent): void {
    if (event.key === FOOTER_ESCAPE_KEY) {
      onClose();
    }
  };
}
