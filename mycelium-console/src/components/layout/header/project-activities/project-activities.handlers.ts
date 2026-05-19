import type { CreateProjectActivityToggleHandlerParams } from './project-activities.types';

export function createProjectActivityToggleHandler({
  active,
  closeRightSidebar,
  content,
  openRightSidebar,
  panel,
  setActive,
  state,
}: CreateProjectActivityToggleHandlerParams) {
  return function handleProjectActivityToggle(): void {
    if (state && active === panel) {
      closeRightSidebar();
      setActive(null);
      return;
    }

    openRightSidebar(content);
    setActive(panel);
  };
}
