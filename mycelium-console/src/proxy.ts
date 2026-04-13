import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ProxyRoute, PublicRoutes, TokenKey } from './_proxy.utils';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TokenKey)?.value;
  const isPublicRoute = PublicRoutes.includes(pathname as ProxyRoute);

  if (!token && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = ProxyRoute.AUTH;
    return NextResponse.redirect(url);
  }

  if (token && isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = ProxyRoute.DEFAULT;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
