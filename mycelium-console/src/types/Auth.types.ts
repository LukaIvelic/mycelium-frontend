export type ValidateEmailResponse = {
  exists: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
};
