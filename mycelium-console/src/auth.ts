import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const redirectProxyUrl = (() => {
  if (process.env.AUTH_REDIRECT_PROXY_URL) {
    return process.env.AUTH_REDIRECT_PROXY_URL;
  }

  const authUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (!authUrl) {
    return undefined;
  }

  try {
    const url = new URL(authUrl);
    url.pathname = '/console/api/auth';
    return url.toString().replace(/\/$/, '');
  } catch {
    return undefined;
  }
})();

export const { handlers, signIn, signOut, auth } = NextAuth({
  basePath: '/api/auth',
  redirectProxyUrl,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
