import type { Dispatch } from 'react';
import type { AuthFieldChangeEvent } from '../auth.types';
import {
  AuthSignupActionType,
  AuthSignupField,
  type AuthSignupFormAction,
  type AuthSignupFormState,
} from './auth-signup.types';

export function createAuthSignupInitialState(
  initialEmail: string,
): AuthSignupFormState {
  return {
    confirmPassword: '',
    email: initialEmail,
    firstName: '',
    lastName: '',
    password: '',
  };
}

export function reduceAuthSignupFormState(
  state: AuthSignupFormState,
  action: AuthSignupFormAction,
): AuthSignupFormState {
  if (action.type === AuthSignupActionType.UpdateField) {
    return Object.assign({}, state, {
      [action.field]: action.value,
    });
  }

  return state;
}

export function createAuthSignupFieldChangeHandler(
  dispatchSignupForm: Dispatch<AuthSignupFormAction>,
  field: AuthSignupField,
) {
  return function updateAuthSignupField(event: AuthFieldChangeEvent): void {
    dispatchSignupForm({
      field,
      type: AuthSignupActionType.UpdateField,
      value: event.target.value,
    });
  };
}
