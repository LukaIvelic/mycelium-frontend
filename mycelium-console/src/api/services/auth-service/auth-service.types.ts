export type SignUpPayload = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type ValidateEmailResponse = {
    exists: boolean;
}

export type TokenResponse = {
    access_token: string;
}
