import { AUTH_EMAIL_QUERY_PARAM } from './auth.config';
import type { AuthRouteSearchParams } from './auth.types';

export function getAuthEmailSearchParam(
  searchParams?: AuthRouteSearchParams,
): string {
  const emailSearchParam = searchParams?.[AUTH_EMAIL_QUERY_PARAM];

  if (Array.isArray(emailSearchParam)) {
    return emailSearchParam[0] ?? '';
  }

  return emailSearchParam ?? '';
}
