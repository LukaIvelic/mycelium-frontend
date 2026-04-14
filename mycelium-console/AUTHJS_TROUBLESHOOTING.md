# Auth.js Troubleshooting Notes

## Initial Issues

1. Auth endpoints returned 404
- Requests like `/api/auth/providers` failed while app was mounted under `/console`.
- Root cause: Next.js `basePath` and Auth.js client/server path usage were misaligned.

2. Google OAuth failed with `redirect_uri_mismatch`
- Google returned `Error 400: redirect_uri_mismatch`.
- Root cause: generated callback URL did not exactly match authorized redirect URIs in Google Cloud.

## Fixes Applied

### 1) Keep app mounted at `/console`
- `next.config.ts` uses `basePath: "/console"`.

### 2) Add auth alias redirect
- Redirect `/api/auth/:path*` -> `/console/api/auth/:path*` in `next.config.ts`.
- This allows Auth.js-generated `/api/auth/*` URLs to still resolve under `/console`.

### 3) Auth.js server configuration
- `src/auth.ts` uses:
  - `basePath: "/api/auth"`
  - Google provider credentials from:
    - `AUTH_GOOGLE_ID`
    - `AUTH_GOOGLE_SECRET`

### 4) Auth.js client configuration
- `src/app/providers.tsx` wraps app in:
  - `<SessionProvider basePath="/console/api/auth">`
- `src/app/layout.tsx` wraps children in `Providers`.

### 5) Google sign-in action
- `src/app/auth/_page.config.ts` triggers Google with `signIn("google")`.

## Required Environment Variables

```env
AUTH_SECRET=...
AUTH_URL=http://localhost:3001/api/auth
NEXTAUTH_URL=http://localhost:3001/api/auth
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

Production values should use your live domain:

```env
AUTH_URL=https://www.myceliums.dev/api/auth
NEXTAUTH_URL=https://www.myceliums.dev/api/auth
```

## Google OAuth Console Values

### Authorized JavaScript origins
- `http://localhost:3001`
- `https://www.myceliums.dev`

### Authorized redirect URIs
- `http://localhost:3001/api/auth/callback/google`
- `https://www.myceliums.dev/api/auth/callback/google`

URI matching is exact (protocol, domain, path).

## Quick Verification

1. Open local app at `/console/auth`.
2. Click "Continue with Google".
3. If mismatch persists, inspect Google error details and compare exact `redirect_uri` to authorized list.
4. After changing OAuth client settings, wait a few minutes and retry.
