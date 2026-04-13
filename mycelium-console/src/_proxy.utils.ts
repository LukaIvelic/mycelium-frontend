export enum ProxyRoute {
  AUTH = '/auth',
  LOGIN = '/auth/login',
  SIGNUP = '/auth/signup',
  DEFAULT = '/dashboard',
}

export const TokenKey = 'access_token';

export const PublicRoutes: ProxyRoute[] = [
  ProxyRoute.AUTH,
  ProxyRoute.LOGIN,
  ProxyRoute.SIGNUP,
];

export function getProxyUrl(path: string, requestUrl: string): URL {
  return new URL(path, requestUrl);
}
