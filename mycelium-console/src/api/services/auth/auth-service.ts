import { apiClient, ApiClient } from "../../api-client";
import {
  LoginPayload,
  SignUpPayload,
  TokenResponse,
  ValidateEmailResponse,
} from "./auth-service.types";

export class AuthService {
  private apiClient: ApiClient = apiClient;

  async signUp(payload: SignUpPayload) {
    return this.apiClient.post<TokenResponse>(
      "/authentication/signup",
      payload,
    );
  }

  async logIn(payload: LoginPayload) {
    return this.apiClient.post<TokenResponse>("/authentication/login", payload);
  }

  async validateEmail(email: string) {
    const encodedEmail = encodeURIComponent(email);
    return this.apiClient.get<ValidateEmailResponse>(
      `/authentication/validate?email=${encodedEmail}`,
    );
  }
}
