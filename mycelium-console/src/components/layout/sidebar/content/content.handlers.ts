import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { SidebarEntry } from './content.types';

export function createSidebarRouteHandler(route: string) {
  return function handleSidebarRouteClick(appRouter?: AppRouterInstance): void {
    appRouter?.push(route);
  };
}

export function createSidebarEntryClickHandler(
  router: AppRouterInstance,
  onClick: SidebarEntry['onClick'],
) {
  return function handleSidebarEntryClick(): void {
    onClick?.(router);
  };
}
