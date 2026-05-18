import { TokenKey } from '@/_proxy.utils';

export const tokenStorage = {
  getToken: (): string | null => {
    if (typeof document === 'undefined') return null;

    const escapedTokenKey = TokenKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = document.cookie.match(
      new RegExp(`(^| )${escapedTokenKey}=([^;]+)`),
    );

    return match ? decodeURIComponent(match[2]) : null;
  },

  setToken: (token: string): void => {
    const sevenDays = 7 * 24 * 60 * 60;
    const expires = new Date(Date.now() + sevenDays * 1000).toUTCString();

    // biome-ignore lint/suspicious/noDocumentCookie: intentional JWT cookie management
    document.cookie = `${TokenKey}=${encodeURIComponent(
      token,
    )}; path=/; SameSite=Lax; expires=${expires}`;
  },

  removeToken: (): void => {
    // biome-ignore lint/suspicious/noDocumentCookie: intentional JWT cookie management
    document.cookie = `${TokenKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },

  isAuthenticated: (): boolean => {
    return !!tokenStorage.getToken();
  },
};
