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
  startLoadingTransition,
  validateEmail,
}: CreateContinueClickHandlerParams) {
  return function continueWithEmail(): void {
    if (!email) {
      return;
    }

    startLoadingTransition(async () => {
      const validationResult = await validateEmail(email);
      let nextRoute = ProxyRoute.SIGNUP;
      if (validationResult.exists) {
        nextRoute = ProxyRoute.LOGIN;
      }

      router.push(createAuthEmailRoute(nextRoute, email));
    });
  };
}

export function createContinueSubmitHandler(continueWithEmail: () => void) {
  return function submitEmailContinuation(event: AuthFormSubmitEvent): void {
    event.preventDefault();
    continueWithEmail();
  };
}

export function createLoginHandler({
  email,
  logIn,
  password,
  router,
  startLoadingTransition,
}: CreateLoginHandlerParams) {
  return function logInWithEmail(): void {
    startLoadingTransition(async () => {
      const loginPayload = {
        email,
        password,
      };

      await logIn(loginPayload);
      router.push(ProxyRoute.DEFAULT);
    });
  };
}

export function createSignUpHandler({
  email,
  firstName,
  lastName,
  password,
  router,
  startLoadingTransition,
  signUp,
}: CreateSignUpHandlerParams) {
  return function submitSignUp(): void {
    startLoadingTransition(async () => {
      const signUpPayload = {
        email,
        firstName,
        lastName,
        password,
      };

      await signUp(signUpPayload);
      router.push(ProxyRoute.DEFAULT);
    });
  };
}

export function createAuthFieldChangeHandler(
  setValue: (value: string) => void,
) {
  return function updateAuthField(event: AuthFieldChangeEvent): void {
    setValue(event.target.value);
  };
}

function createAuthEmailRoute(route: ProxyRoute, email: string): string {
  const searchParams = new URLSearchParams();
  searchParams.set(AUTH_EMAIL_QUERY_PARAM, email);

  return `${route}?${searchParams.toString()}`;
}
