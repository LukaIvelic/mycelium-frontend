import type { LucideIcon } from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { ChangeEvent, FormEvent, TransitionStartFunction } from 'react';
import type { ProxyRoute } from '@/_proxy.utils';

export interface AuthAlternative {
  icon: LucideIcon | null;
  img: string | null;
  onClick?: () => void;
  route?: ProxyRoute;
  title: string;
}

export interface AuthAlternativeButtonProps {
  alternative: AuthAlternative;
}

export type AuthRouteSearchParams = Record<
  string,
  string | string[] | undefined
>;

export interface AuthRoutePageProps {
  searchParams?: Promise<AuthRouteSearchParams>;
}

export interface CreateContinueClickHandlerParams {
  email: string;
  router: AppRouterInstance;
  startLoadingTransition: TransitionStartFunction;
  validateEmail: (email: string) => Promise<{ exists: boolean }>;
}

export interface CreateLoginHandlerParams {
  email: string;
  logIn: (payload: { email: string; password: string }) => Promise<void>;
  password: string;
  router: AppRouterInstance;
  startLoadingTransition: TransitionStartFunction;
}

export interface CreateSignUpHandlerParams {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  router: AppRouterInstance;
  startLoadingTransition: TransitionStartFunction;
  signUp: (payload: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => Promise<void>;
}

export type AuthFieldChangeEvent = ChangeEvent<HTMLInputElement>;
export type AuthFormSubmitEvent = FormEvent<HTMLFormElement>;
