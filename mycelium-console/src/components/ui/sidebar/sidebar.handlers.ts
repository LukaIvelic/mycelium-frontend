import type * as React from 'react';
import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
} from './sidebar.constants';

export function persistSidebarOpenState(openState: boolean): void {
  const sidebarCookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  setDocumentCookie(sidebarCookie);
}

function setDocumentCookie(cookie: string): void {
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API is not available in all supported browsers.
  document.cookie = cookie;
}

export function createSidebarKeyboardHandler(toggleSidebar: () => void) {
  return function handleKeyDown(event: KeyboardEvent): void {
    if (!isSidebarShortcut(event)) {
      return;
    }

    event.preventDefault();
    toggleSidebar();
  };
}

export function createSidebarTriggerClickHandler(
  onClick: React.ComponentProps<'button'>['onClick'],
  toggleSidebar: () => void,
) {
  return function handleSidebarTriggerClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    onClick?.(event);
    toggleSidebar();
  };
}

function isSidebarShortcut(event: KeyboardEvent): boolean {
  return (
    event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)
  );
}
