import { ProxyRoute } from "@/_proxy.utils";
import { AuthService } from "@/api/services/auth-service/auth-service";
import { LoginPayload, SignUpPayload } from "@/api/services/auth-service/auth-service.types";
import { tokenStorage } from "@/api/token-storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useAuth() {
    const authService = new AuthService();

    const signUp = async (payload: SignUpPayload) => {
        const response = await authService.signUp(payload)
        tokenStorage.setToken(response.access_token);
    };

    const logIn = async (payload: LoginPayload) => {
        const response = await authService.logIn(payload);
        tokenStorage.setToken(response.access_token);
    };
    
    const validateEmail = (email: string) => authService.validateEmail(email);

    const signOut = (router?: AppRouterInstance) => {
        tokenStorage.removeToken();

        if(!router) return;
        router.push(ProxyRoute.DEFAULT);
    };

    return {
        signUp,
        logIn,
        validateEmail,
        signOut,
    }
}