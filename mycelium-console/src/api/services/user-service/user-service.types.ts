export type CreateUserPayload = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export type UpdateUserPayload = Partial<CreateUserPayload>;