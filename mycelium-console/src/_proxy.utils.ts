export enum ProxyRoute {
  AUTH = '/auth',
  LOGIN = '/auth/login',
  SIGNUP = '/auth/signup',
  DEFAULT = '/',
}

export const TokenKey = 'access_token';
export const AuthJsSessionToken = 'authjs.session-token';
export const SecureAuthJsSessionToken = '__Secure-authjs.session-token';

export const PublicRoutes: ProxyRoute[] = [
  ProxyRoute.AUTH,
  ProxyRoute.LOGIN,
  ProxyRoute.SIGNUP,
];
