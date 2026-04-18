import { jwtVerify } from "jose";

export enum ProxyRoute {
  AUTH = "/auth",
  LOGIN = "/auth/login",
  SIGNUP = "/auth/signup",
  DEFAULT = "/",
}

export const TokenKey = "access_token";

export const PublicRoutes: ProxyRoute[] = [
  ProxyRoute.AUTH,
  ProxyRoute.LOGIN,
  ProxyRoute.SIGNUP,
];

export async function verifyJwt(token: string): Promise<boolean> {
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}
