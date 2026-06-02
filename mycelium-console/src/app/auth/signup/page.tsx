import { generateMetadata } from '@/app/metadata';
import { getAuthEmailSearchParam } from '@/components/pages/auth/auth.search-params';
import type { AuthRoutePageProps } from '@/components/pages/auth/auth.types';
import { AuthSignup } from '@/components/pages/auth/auth-signup/auth-signup';

const AUTH_SIGNUP_DESCRIPTION = 'Create your Mycelium account.';
const AUTH_SIGNUP_PATHNAME = '/auth/signup';
const AUTH_SIGNUP_TITLE = 'Create a Mycelium account';

export const metadata = generateMetadata({
  title: AUTH_SIGNUP_TITLE,
  description: AUTH_SIGNUP_DESCRIPTION,
  pathname: AUTH_SIGNUP_PATHNAME,
});

export default async function Page({ searchParams }: AuthRoutePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialEmail = getAuthEmailSearchParam(resolvedSearchParams);

  return <AuthSignup initialEmail={initialEmail} />;
}
