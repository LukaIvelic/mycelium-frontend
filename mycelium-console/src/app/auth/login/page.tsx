import { getAuthEmailSearchParam } from '@/components/pages/auth/auth.search-params';
import type { AuthRoutePageProps } from '@/components/pages/auth/auth.types';
import { AuthLogin } from '@/components/pages/auth/auth-login';

export default async function Page({ searchParams }: AuthRoutePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialEmail = getAuthEmailSearchParam(resolvedSearchParams);

  return <AuthLogin initialEmail={initialEmail} />;
}
