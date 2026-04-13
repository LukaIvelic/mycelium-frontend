import { api } from '@/api/api-client';
import { ValidateEmailResponse } from '@/types/Auth.types';

export class AuthService {
  private readonly apiClient = api;

  async validateEmail(email: string) {
    const encodedEmail = encodeURIComponent(email);
    return this.apiClient.get<ValidateEmailResponse>(
      `/auth/validate?email=${encodedEmail}`,
    );
  }

  async login(email: string, password: string) {
    return this.apiClient.post('/auth/login', { email, password });
  }
}
