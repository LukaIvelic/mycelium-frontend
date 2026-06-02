import { generateMetadata } from '@/app/metadata';
import { getAuthEmailSearchParam } from '@/components/pages/auth/auth.search-params';
import type { AuthRoutePageProps } from '@/components/pages/auth/auth.types';
import { AuthLogin } from '@/components/pages/auth/auth-login/auth-login';

const AUTH_LOGIN_DESCRIPTION = 'Log in to your Mycelium workspace.';
const AUTH_LOGIN_PATHNAME = '/auth/login';
const AUTH_LOGIN_TITLE = 'Log in to Mycelium';

export const metadata = generateMetadata({
  title: AUTH_LOGIN_TITLE,
  description: AUTH_LOGIN_DESCRIPTION,
  pathname: AUTH_LOGIN_PATHNAME,
});

export default async function Page({ searchParams }: AuthRoutePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialEmail = getAuthEmailSearchParam(resolvedSearchParams);

  return <AuthLogin initialEmail={initialEmail} />;
}
