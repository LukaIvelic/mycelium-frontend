import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getProxyUrl,
  ProxyRoute,
  PublicRoutes,
  TokenKey,
} from './_proxy.utils';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestUrl = request.url;
  const token = request.cookies.get(TokenKey)?.value;
  const isPublicRoute = PublicRoutes.includes(pathname as ProxyRoute);

  if (pathname === '/' && token) {
    return NextResponse.redirect(getProxyUrl(ProxyRoute.DEFAULT, requestUrl));
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(getProxyUrl(ProxyRoute.AUTH, requestUrl));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(getProxyUrl(ProxyRoute.DEFAULT, requestUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
