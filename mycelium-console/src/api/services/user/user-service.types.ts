export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UpdateUserPayload = Partial<CreateUserPayload>;
