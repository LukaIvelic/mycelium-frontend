export interface AuthSignupProps {
  initialEmail: string;
}

export enum AuthSignupActionType {
  UpdateField = 'updateField',
}

export enum AuthSignupField {
  ConfirmPassword = 'confirmPassword',
  Email = 'email',
  FirstName = 'firstName',
  LastName = 'lastName',
  Password = 'password',
}

export interface AuthSignupFormState {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UpdateAuthSignupFieldAction {
  field: AuthSignupField;
  type: AuthSignupActionType.UpdateField;
  value: string;
}

export type AuthSignupFormAction = UpdateAuthSignupFieldAction;
