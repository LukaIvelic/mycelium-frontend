import { AuthService } from '@/api/services/auth/AuthService';
import { tokenStorage } from '@/api/token-storage';
import { LoginPayload, SignupPayload } from '@/types/Auth.types';

export function useMyceliumAuth() {
  const authService = new AuthService();

  const validateEmail = async (email: string) => {
    return await authService.validateEmail(email);
  };

  const logIn = async (loginPayload: LoginPayload) => {
    const response = await authService.login(loginPayload);
    tokenStorage.setToken(response.access_token);
    return response;
  };

  const signUp = async (signupPayload: SignupPayload) => {
    const response = await authService.signup(signupPayload);
    tokenStorage.setToken(response.access_token);
    return response;
  };

  const signOut = () => {
    tokenStorage.removeToken();
  };

  const isAuthenticated = () => {
    return !!tokenStorage.getToken();
  };

  return {
    validateEmail,
    logIn,
    signUp,
    signOut,
    isAuthenticated,
  };
}
