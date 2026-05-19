import { ProxyRoute } from '@/_proxy.utils';
import { AUTH_EMAIL_QUERY_PARAM } from './auth.config';
import type {
  AuthFieldChangeEvent,
  AuthFormSubmitEvent,
  CreateContinueClickHandlerParams,
  CreateLoginHandlerParams,
  CreateSignUpHandlerParams,
} from './auth.types';

export function createContinueClickHandler({
  email,
  router,
  setIsLoading,
  validateEmail,
}: CreateContinueClickHandlerParams) {
  return async function handleContinueClick(): Promise<void> {
    if (!email) {
      return;
    }

    setIsLoading(true);
    const validationResult = await validateEmail(email);
    setIsLoading(false);

    let nextRoute = ProxyRoute.SIGNUP;
    if (validationResult.exists) {
      nextRoute = ProxyRoute.LOGIN;
    }

    router.push(createAuthEmailRoute(nextRoute, email));
  };
}

export function createContinueSubmitHandler(
  handleContinueClick: () => Promise<void>,
) {
  return function handleContinueSubmit(event: AuthFormSubmitEvent): void {
    event.preventDefault();
    void handleContinueClick();
  };
}

export function createLoginHandler({
  email,
  logIn,
  password,
  router,
  setIsLoading,
}: CreateLoginHandlerParams) {
  return async function handleLogin(): Promise<void> {
    const loginPayload = {
      email,
      password,
    };

    setIsLoading(true);
    await logIn(loginPayload);
    setIsLoading(false);
    router.push(ProxyRoute.DEFAULT);
  };
}

export function createSignUpHandler({
  email,
  firstName,
  lastName,
  password,
  router,
  setIsLoading,
  signUp,
}: CreateSignUpHandlerParams) {
  return async function handleSignUp(): Promise<void> {
    const signUpPayload = {
      email,
      firstName,
      lastName,
      password,
    };

    setIsLoading(true);
    await signUp(signUpPayload);
    setIsLoading(false);
    router.push(ProxyRoute.DEFAULT);
  };
}

export function createAuthFieldChangeHandler(
  setValue: (value: string) => void,
) {
  return function handleAuthFieldChange(event: AuthFieldChangeEvent): void {
    setValue(event.target.value);
  };
}

function createAuthEmailRoute(route: ProxyRoute, email: string): string {
  const searchParams = new URLSearchParams();
  searchParams.set(AUTH_EMAIL_QUERY_PARAM, email);

  return `${route}?${searchParams.toString()}`;
}
