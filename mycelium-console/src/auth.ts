import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const isProduction = process.env.NODE_ENV === 'production';

const redirectProxyUrl = (() => {
  if (!isProduction && process.env.AUTH_REDIRECT_PROXY_URL) {
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
  trustHost: true,
  redirectProxyUrl,
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/console`;
      }

      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }

      if (url.startsWith(baseUrl)) {
        return url;
      }

      return `${baseUrl}/console`;
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
