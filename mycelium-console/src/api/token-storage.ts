export const tokenStorage = {
  getToken: (): string | null => {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(
      new RegExp("(^| )access_token=([^;]+)"),
    );

    return match ? decodeURIComponent(match[2]) : null;
  },

  setToken: (token: string): void => {
    const sevenDays = 7 * 24 * 60 * 60;
    const expires = new Date(Date.now() + sevenDays * 1000).toUTCString();

    document.cookie = `access_token=${encodeURIComponent(
      token,
    )}; path=/; SameSite=Lax; expires=${expires}`;
  },

  removeToken: (): void => {
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },

  isAuthenticated: (): boolean => {
    return !!tokenStorage.getToken();
  },
};
