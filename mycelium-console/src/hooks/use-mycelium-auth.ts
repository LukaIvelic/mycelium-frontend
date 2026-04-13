import { AuthService } from '@/api/services/auth/AuthService';

export function useMyceliumAuth() {
  const authService = new AuthService();

  const validateEmail = async (email: string) => {
    try {
      const response = await authService.validateEmail(email);
      return response.exists;
    } catch (error) {
      console.error('Error validating email:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return {
    validateEmail,
    login,
  };
}
