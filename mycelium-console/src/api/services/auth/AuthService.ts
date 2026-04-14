import { api } from '@/api/api-client';
import {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  ValidateEmailResponse,
} from '@/types/Auth.types';

export class AuthService {
  private readonly apiClient = api;

  async validateEmail(email: string): Promise<ValidateEmailResponse> {
    const encodedEmail = encodeURIComponent(email);
    return this.apiClient.get<ValidateEmailResponse>(
      `/authentication/validate?email=${encodedEmail}`,
    );
  }

  async login(loginPayload: LoginPayload): Promise<AuthResponse> {
    return this.apiClient.post('/authentication/login', loginPayload);
  }

  async signup(signupPayload: SignupPayload): Promise<AuthResponse> {
    return this.apiClient.post('/authentication/signup', signupPayload);
  }
}
