import { generateMetadata } from '@/app/metadata';
import { AuthEntry } from '@/components/pages/auth/auth-entry/auth-entry';

const AUTH_ENTRY_DESCRIPTION = 'Continue to Mycelium with your email address.';
const AUTH_ENTRY_PATHNAME = '/auth';
const AUTH_ENTRY_TITLE = 'Sign in to Mycelium';

export const metadata = generateMetadata({
  title: AUTH_ENTRY_TITLE,
  description: AUTH_ENTRY_DESCRIPTION,
  pathname: AUTH_ENTRY_PATHNAME,
});

export default function Page() {
  return <AuthEntry />;
}
