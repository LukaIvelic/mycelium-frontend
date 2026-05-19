import { getAuthEmailSearchParam } from '@/components/pages/auth/auth.search-params';
import type { AuthRoutePageProps } from '@/components/pages/auth/auth.types';
import { AuthSignup } from '@/components/pages/auth/auth-signup';

export default async function Page({ searchParams }: AuthRoutePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialEmail = getAuthEmailSearchParam(resolvedSearchParams);

  return <AuthSignup initialEmail={initialEmail} />;
}
