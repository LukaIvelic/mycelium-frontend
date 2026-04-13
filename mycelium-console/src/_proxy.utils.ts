export enum ProxyRoute {
  AUTH = '/auth',
  LOGIN = '/auth/login',
  SIGNUP = '/auth/signup',
  DEFAULT = '/',
}

export const TokenKey = 'access_token';

export const PublicRoutes: ProxyRoute[] = [
  ProxyRoute.AUTH,
  ProxyRoute.LOGIN,
  ProxyRoute.SIGNUP,
];