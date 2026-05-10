export type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ValidateEmailResponse = {
  exists: boolean;
};

export type TokenResponse = {
  accessToken: string;
};
