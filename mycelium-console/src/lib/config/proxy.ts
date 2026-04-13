export const AUTH_CONFIG = {
  tokenKey: 'access_token',
  loginPath: '/auth',
  defaultPath: '/dashboard',
  publicRoutes: ['/auth', '/auth/login', '/auth/signup'],
};

export const MIDDLEWARE_MATCHER = [
  '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
];
