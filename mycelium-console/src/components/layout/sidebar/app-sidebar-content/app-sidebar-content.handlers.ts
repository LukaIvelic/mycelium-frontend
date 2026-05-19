import type { Dispatch, SetStateAction } from 'react';

export function createToggleSettingsHandler(
  setSettingsOpen: Dispatch<SetStateAction<boolean>>,
) {
  return function handleToggleSettings(): void {
    setSettingsOpen((isOpen) => !isOpen);
  };
}
