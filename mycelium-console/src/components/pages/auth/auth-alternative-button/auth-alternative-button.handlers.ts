import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { AuthAlternative } from '../auth.types';

export function createAlternativeClickHandler(
  router: AppRouterInstance,
  alternative: AuthAlternative,
) {
  return function handleAlternativeClick(): void {
    if (alternative.route) {
      router.push(alternative.route);
      return;
    }

    alternative.onClick?.();
  };
}
