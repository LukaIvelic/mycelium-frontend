import type { Metadata } from 'next';
import { generateMetadata } from '@/app/metadata';
import { AuthLayout } from '@/components/pages/auth/auth-layout/auth-layout';
import {
  AUTH_APP_DESCRIPTION,
  AUTH_APP_TITLE,
} from '@/components/pages/auth/auth-layout/auth-layout.config';
import type { AuthLayoutProps } from '@/components/pages/auth/auth-layout/auth-layout.types';

const AUTH_LAYOUT_PATHNAME = '/auth';

export const metadata: Metadata = generateMetadata({
  title: AUTH_APP_TITLE,
  description: AUTH_APP_DESCRIPTION,
  pathname: AUTH_LAYOUT_PATHNAME,
});

export default function AuthRouteLayout({ children }: AuthLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
