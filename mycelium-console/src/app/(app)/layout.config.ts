export const APP_PROJECT_DETAIL_PATTERN = /^\/projects\/[^/]+$/;

export function shouldCloseRightSidebar(pathname: string): boolean {
  return !APP_PROJECT_DETAIL_PATTERN.test(pathname);
}
