import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ProxyRoute } from '@/_proxy.utils';
import { AuthService } from '@/api/services/auth/auth-service';
import type {
  LoginPayload,
  SignUpPayload,
} from '@/api/services/auth/auth-service.types';
import { tokenStorage } from '@/api/token-storage';
import { queryClient } from '@/components/features/providers';

export function useAuth() {
  const authService = new AuthService();

  const signUp = async (payload: SignUpPayload) => {
    const response = await authService.signUp(payload);
    tokenStorage.setToken(response.access_token);
  };

  const logIn = async (payload: LoginPayload) => {
    const response = await authService.logIn(payload);
    tokenStorage.setToken(response.access_token);
  };

  const validateEmail = (email: string) => authService.validateEmail(email);

  const signOut = (router?: AppRouterInstance) => {
    tokenStorage.removeToken();
    queryClient.clear();

    if (!router) return;
    router.push(ProxyRoute.DEFAULT);
  };

  return {
    signUp,
    logIn,
    validateEmail,
    signOut,
  };
}
