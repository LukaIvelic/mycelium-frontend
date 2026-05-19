import type { Dispatch, SetStateAction } from 'react';

export function createOpenCreateProjectDialogHandler(
  setCreateOpen: Dispatch<SetStateAction<boolean>>,
) {
  return function handleOpenCreateProjectDialog(): void {
    setCreateOpen(true);
  };
}
