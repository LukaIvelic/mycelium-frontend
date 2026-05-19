import type { Metadata } from 'next';
import type { AuthLayoutProps } from '@/components/pages/auth/auth-layout';
import {
  AUTH_APP_DESCRIPTION,
  AUTH_APP_TITLE,
  AuthLayout,
} from '@/components/pages/auth/auth-layout';

export const metadata: Metadata = {
  title: AUTH_APP_TITLE,
  description: AUTH_APP_DESCRIPTION,
};

export default function AuthRouteLayout({ children }: AuthLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
