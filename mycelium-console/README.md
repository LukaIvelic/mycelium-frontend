# Mycelium Console

The web console for **Mycelium** — _Passive Trace & Microservice Dependency Mapping_.

Mycelium builds a live map of your services from the request traffic they emit.
You instrument your services (gateway or SDK), they forward request metadata to
the Mycelium backend, and this console turns that stream into an interactive
**service dependency graph** with per-request traces, logs, API-key analytics,
and workspace controls.

This package (`mycelium-console`) is the Next.js front end. It is one of three
repositories that make up the platform:

- **[Mycelium Backend](https://github.com/LukaIvelic/mycelium-backend)** — NestJS + Fastify API that ingests traces and serves the console.
- **[Mycelium Frontend](https://github.com/LukaIvelic/mycelium-frontend)** — this repository.
- **[Mycelium SDK (JS)](https://github.com/LukaIvelic/mycelium.js)** — the instrumentation library that emits trace metadata.

---

## Table of contents

- [What this app does](#what-this-app-does)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Architecture](#architecture)
  - [Routing & the app shell](#routing--the-app-shell)
  - [Authentication & route protection](#authentication--route-protection)
  - [Data layer](#data-layer)
  - [Backend API surface](#backend-api-surface)
  - [Client (UI) state](#client-ui-state)
- [Domain model](#domain-model)
- [Feature guide](#feature-guide)
- [Design system](#design-system)
- [Code conventions](#code-conventions)
- [Scripts](#scripts)
- [Tooling](#tooling)
- [Build & deploy](#build--deploy)
- [Troubleshooting](#troubleshooting)
- [Further reading](#further-reading)

---

## What this app does

The console is the operator surface for Mycelium. After signing in you work
inside a project:

1. **Create a project** — projects group API keys, service maps, and trace history.
2. **Generate an API key** — minted once from **Workspace → API Management**, shown a single time.
3. **Send traces** — your services forward request metadata (trace id, span id, parent span id, status, duration) to the backend.
4. **Operate from the graph** — the project view renders services as nodes and trace relationships as edges. Click a node to open its details sheet (logs, settings, policy); use the activity panels for live requests and notifications.

The console never ingests traffic itself — it is a read/operate UI over the
backend API. Ingestion is the SDK's and backend's job.

---

## Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router, RSC) | Served under `basePath: /console` |
| UI runtime | **React 19** | |
| Language | **TypeScript 5.9** (strict) | Path alias `@/*` → `src/*` |
| Server state | **TanStack Query 5** | One hook module per resource in `src/hooks` |
| Client state | **Zustand 5** | Ephemeral UI state (sheet, right sidebar) |
| Components | **Base UI** (`@base-ui/react`) + **shadcn** (`base-nova` style) | Primitives live in `src/components/ui` |
| Styling | **Tailwind CSS v4** + `tw-animate-css` | Theme tokens in `src/styles/*.css` |
| Icons | **lucide-react** | |
| Graph | **@xyflow/react** (React Flow) + **d3-force** | Force-directed service map |
| Command menu | **cmdk** | Create-project / create-key command dialogs |
| Animation | **motion** | |
| Auth (edge) | **jose** | JWT verification inside the proxy |
| Dates | **dateformat** | |
| Lint/format | **Biome 2.4** | Replaces ESLint + Prettier |
| Dead-code | **Knip** | |

> ⚠️ **This is not the Next.js most tooling was trained on.** Next.js 16 renames
> and reshapes several conventions (notably request middleware → `proxy.ts`).
> When changing framework-level code, consult the bundled guides in
> `node_modules/next/dist/docs/` rather than relying on older Next.js knowledge.
> See `AGENTS.md`.

---

## Quick start

### Prerequisites

- **Node.js 20+** and npm
- A running **Mycelium backend** (defaults to `http://localhost:8000`, API under `/api`)

### Install & run

```bash
npm install

# copy env template and fill in values (see below)
cp .env.example .env

npm run dev
```

The dev server runs on **port 3001** with a base path of `/console`, so open:

```
http://localhost:3001/console
```

(The repo's `next.config.ts` permanently redirects `/` → `/console`.)

### Run the whole stack

From the monorepo root, `start.sh` boots the backend (`start:dev`) and this
console (`dev`) together:

```bash
./start.sh
```

---

## Environment variables

Defined in `.env` (template: `.env.example`). Two variables drive the app:

| Variable | Used by | Purpose |
|---|---|---|
| `NEXT_PUBLIC_BASE_API_URL` | Browser + server | Base URL for every backend call. Falls back to `http://localhost:8000/api` (`src/lib/constants/routes.ts`). **Must include the `/api` prefix.** |
| `JWT_SECRET` | Proxy (edge), server only | HMAC secret used by `jose` to verify the session JWT in `src/_proxy.utils.ts`. **Must match the backend's signing secret**, or every request is treated as unauthenticated and bounced to `/auth`. |

Notes:

- `NEXT_PUBLIC_*` is exposed to the browser by Next.js — never put secrets there.
- `JWT_SECRET` is **not** prefixed, so it stays server-side. Keep it out of source control and rotate it together with the backend.
- The backend's CORS allow-list (`allowedOrigins`) includes `http://localhost:3001` and `https://www.myceliums.dev`; keep the console's origin in sync when deploying.

---

## Project structure

```
mycelium-console/
├── public/                      # Static assets (Satoshi fonts, metadata images)
├── src/
│   ├── proxy.ts                 # Edge request interception — auth gating (Next.js "middleware")
│   ├── _proxy.utils.ts          # JWT verify, public-route list, token cookie key
│   │
│   ├── api/                     # HTTP transport + typed service clients
│   │   ├── api-client.ts        # fetch wrapper: URL building, auth header, (de)serialization
│   │   ├── token-storage.ts     # read/write the session JWT cookie
│   │   └── services/            # one class per backend resource (+ *.types.ts)
│   │       ├── auth/  project/  log/  user/  user-profile/
│   │       └── api-key/  api-key-stats/  react-flow/  services/
│   │
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout: fonts, <Providers>, global CSS
│   │   ├── metadata.ts          # generateMetadata() helper (OG/Twitter)
│   │   ├── globals.css          # CSS entry — imports everything in styles/
│   │   ├── (app)/               # Authenticated shell (sidebar + header + right sidebar)
│   │   │   ├── page.tsx         # redirects → /projects
│   │   │   ├── projects/        # project list + /projects/[id] graph view
│   │   │   ├── account/         # account settings (tabs)
│   │   │   ├── workspace/settings/  # workspace settings (tabs)
│   │   │   └── documentation/   # in-app docs page
│   │   └── auth/                # Public auth routes
│   │       ├── page.tsx         # email-first entry
│   │       ├── login/  signup/
│   │
│   ├── components/
│   │   ├── ui/                  # Primitives (Base UI + shadcn base-nova): button, dialog,
│   │   │                        #   combobox, command, sidebar, sheet, tooltip, switch, …
│   │   ├── features/            # Reusable feature blocks: project-graph, react-flow nodes/edges,
│   │   │                        #   tabs, input, button, mushroom-carousel, providers, truncate
│   │   ├── layout/              # App chrome: header, sidebar, right-sidebar, sheet (+ logs)
│   │   └── pages/               # Page-level compositions: auth, create-project,
│   │                            #   documentation, account-settings, workspace-settings
│   │
│   ├── hooks/                   # TanStack Query hooks + UI hooks (use-*.hook.ts / use-*.ts)
│   ├── lib/                     # constants, domain types, config (fonts), helpers
│   └── styles/                  # Theme tokens + component CSS (imported by globals.css)
│
├── next.config.ts              # basePath /console + redirects
├── biome.json                  # lint/format config
├── components.json             # shadcn config (style: base-nova)
├── knip.json  doctor.config.json
└── tsconfig.json               # strict; @/* → src/*
```

---

## Architecture

### Routing & the app shell

The App Router uses two top-level segments:

- **`(app)`** — a [route group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) (parentheses ⇒ it does **not** appear in the URL). Everything here renders inside the authenticated shell defined in `app/(app)/layout.tsx`: left `AppSidebar`, top `AppHeader`, the page, and a collapsible `RightSidebar`. Routes: `/projects`, `/projects/[id]`, `/account`, `/workspace/settings`, `/documentation`. The bare `/` redirects to `/projects`.
- **`auth`** — public routes for sign-in/sign-up: `/auth` (email entry), `/auth/login`, `/auth/signup`.

The whole app is mounted under **`/console`** (`basePath` in `next.config.ts`),
and `/` is permanently redirected there.

The right sidebar auto-closes whenever you navigate away from a project detail
route — see `shouldCloseRightSidebar()` in `app/(app)/layout.config.ts`, which
matches only `^/projects/[^/]+$`.

### Authentication & route protection

Auth is JWT-based and enforced in two layers.

**1. Edge gate (`src/proxy.ts`).** Next.js runs this on every matched request
(its matcher skips `api`, `_next/*`, `favicon.ico`, and any path with a file
extension). It reads the `mycelium_access_token` cookie and verifies it with
`jose` against `JWT_SECRET`:

- Unauthenticated request to a **protected** route → redirect to `/auth`.
- Authenticated request to a **public** auth route → redirect to `/` (i.e. into the app).

Public routes are `['/auth', '/auth/login', '/auth/signup']`
(`src/_proxy.utils.ts`).

**2. Request auth (`src/api/api-client.ts` + `token-storage.ts`).** On the
client, `tokenStorage` stores the JWT in the `mycelium_access_token` cookie
(`path=/`, `SameSite=Lax`, 7-day expiry) and reads it back out. `ApiClient`
attaches it as `Authorization: Bearer <token>` on every call. Header injection
is SSR-safe — on the server (`typeof window === 'undefined'`) it sends only the
base headers and no token.

**Auth flow** (`src/components/pages/auth`, handlers in `auth.handlers.ts`):

```
/auth  ──(enter email)──▶  GET /authentication/validate?email
                                    │
                exists? ──true──▶ /auth/login   ──▶ POST /authentication/login
                        └─false─▶ /auth/signup  ──▶ POST /authentication/signup
                                    │
                            { accessToken } ──▶ tokenStorage.setToken() ──▶ router.push('/')
```

Sign-out (`useAuth().signOut`) clears the cookie, clears the TanStack Query
cache, and routes home.

### Data layer

Three layers, strictly separated. Components never call `fetch` directly.

```
React components / pages
        │  call hooks
        ▼
src/hooks/use-*.hook.ts      ── TanStack Query (cache keys, staleness, invalidation)
        │  call service methods
        ▼
src/api/services/<resource>/ ── typed methods → endpoint strings (one class per resource)
        │  delegate transport
        ▼
src/api/api-client.ts        ── fetch(): URL + query, Bearer auth, JSON (de)serialize, error throw
        │
        ▼
   Mycelium backend  (NEXT_PUBLIC_BASE_API_URL, e.g. http://localhost:8000/api)
```

- **`ApiClient`** exposes `get / post / patch / delete`. It builds URLs with the
  `URL` API (skipping `null`/`undefined` query params), reads responses as text
  then `JSON.parse` (so empty `204` bodies don't throw), and throws
  `HTTP <status>: <body>` on non-2xx. A singleton `apiClient` is shared.
- **Service classes** (e.g. `ProjectService`, `LogService`) are thin, typed
  wrappers that own endpoint paths and request/response types. Each lives beside
  its `*.types.ts`.
- **Query hooks** wrap services in `useQuery`/`useMutation`, define hierarchical
  query keys, and handle cache invalidation on mutation. Examples: `useProjects`,
  `useLogs`, `useApiKeys`, `useUserProfile`, `useReactFlowLayout`,
  `useApiKeyStats`, `useServices`. The `QueryClient` uses library defaults; a few
  hooks opt into `staleTime` (e.g. 5 min for `users/me` and `user-profiles/me`).

> Note: the older `docs/front-api-client.md` describes a `localStorage`-based
> token and a `put()` method. The current `ApiClient` uses the **cookie**
> (`tokenStorage`) and has no `put()` — trust the code in `src/api/`.

### Backend API surface

Every path below is **relative to `NEXT_PUBLIC_BASE_API_URL`** (which already
ends in `/api`). The backend mounts all routes under the `api` global prefix and
listens on `:8000` by default.

| Method | Path | Purpose | Console caller |
|---|---|---|---|
| `POST` | `/authentication/signup` | Create account → `{ accessToken }` | `AuthService.signUp` |
| `POST` | `/authentication/login` | Sign in → `{ accessToken }` | `AuthService.logIn` |
| `GET` | `/authentication/validate?email` | Does this email exist? | `AuthService.validateEmail` |
| `GET` | `/users/me` · `/users/:id` | Current / specific user | `UsersService` |
| `POST`/`PATCH`/`DELETE` | `/users` · `/users/:id` | Manage users | `UsersService` |
| `GET` | `/user-profiles/me` · `/user-profiles/:id` | Profile read | `UserProfileService` |
| `PATCH` | `/user-profiles/:id` | Update profile | `UserProfileService` |
| `GET` | `/projects` | List projects (supports `hasApiKey`, sort params) | `ProjectService.findAll/findByUserId` |
| `GET` | `/projects/:id` | One project | `ProjectService.findOne` |
| `POST` | `/projects` | Create | `ProjectService.create` |
| `PATCH` | `/projects/:id` | Update | `ProjectService.update` |
| `DELETE` | `/projects/:id` | Invalidate (soft delete) | `ProjectService.invalidate` |
| `POST` | `/projects/:id/api-key` | Mint a key for a project | `ProjectService.addApiKey` |
| `GET` | `/projects/:id/has-api-key` | Does it have an active key? | `ProjectService.hasApiKey` |
| `GET` | `/projects/by-api-key?apiKeyId` | Resolve project from key | `ApiKeyService.getProjectByApiKeyId` |
| `GET` | `/api-keys` | List my keys | `ApiKeyService.findMine` |
| `DELETE` | `/api-keys/:id` | Revoke a key | `ApiKeyService.revoke` |
| `GET` | `/api-key-stats/:apiKeyId` | Usage + IP geolocation stats | `ApiKeyStatsService` |
| `GET` | `/logs?projectId&limit&offset` | Request/trace logs for a project | `LogService.findByProject` |
| `GET` | `/logs/integration/:integrationId` | Logs for one service | `LogService.findByIntegration` |
| `GET` | `/log-details/:logId` | Body, headers, sizes for one log | `LogService.findDetail` |
| `GET` | `/flows/:projectId` | React Flow nodes/edges for the graph | `ReactFlowService` |
| `GET` | `/integrations/:id` | Service (integration) metadata | `ServicesService.findById` |

Default ingestion endpoint (SDK → backend, **not** called by the console):
`POST /api/logs` with `Authorization: Bearer <mycelium_api_key>`.

### Client (UI) state

Two tiny Zustand stores hold ephemeral UI state that doesn't belong in the
server cache:

- **`useRightSidebar`** (`hooks/use-right-sidebar.ts`) — open/closed flag plus the
  React node currently rendered in the right sidebar (notifications, requests,
  assistant).
- **`useSheet`** (`hooks/use-sheet.hook.ts`) — open/closed flag plus the payload
  (a service/integration id) for the slide-over service-details sheet.

Everything else — projects, logs, keys, profiles, the graph layout — is **server
state** owned by TanStack Query, not Zustand.

---

## Domain model

Core types live in `src/lib/types`:

- **`Project`** — `id`, `name`, `description`, `userId`, validity window (`validFrom`/`validTo`), timestamps.
- **`ApiKey`** — `id`, `name`, `projectId`, `keyPrefix` (only the prefix is stored client-side), validity window, `revokedAt`.
- **`Log`** — one observed request: trace correlation (`traceId`, `spanId`, `parentSpanId`), `integration*` metadata, `method`/`path`/`origin`/`protocol`, `statusCode`, `durationMs`, timestamps.
- **`LogDetail`** — heavyweight per-log payload: `body`, `headers`, `contentType`, sizes, and `completed`/`aborted`/`idempotent` flags.
- **`TraceGraph` / `TraceGraphNode` / `TraceGraphEdge`** — trace-derived call graph (nodes = services, edges = call relationships with per-call detail).
- **`ApiKeyStats`** — `totalRequests`, `averageLatencyMs`, and `ipStats[]` (per-IP request counts with `ip-api.com` geolocation: country, city, ISP, lat/lon, …).
- **`User`** / **`UserProfile`** — identity and the richer profile (name, initials, bio, job title, company, location, avatar, generated profile color).
- **`Service`** (integration) — `origin`, `key`, `name`, `version`, `description`, `repository`.

The graph distinguishes **registered** services (node id `service:<uuid>`) from
not-yet-registered sources/targets (e.g. `origin:http://localhost:3002`). The
project view tolerates both — see [Troubleshooting](#troubleshooting).

---

## Feature guide

| Area | Where | What it does |
|---|---|---|
| **Email-first auth** | `components/pages/auth` | One field → backend decides login vs signup → token stored → into the app. |
| **Projects list** | `components/pages/create-project` | Cards with create dialog (cmdk command), sort dropdown (name / recent activity / registration date), and delete confirmation. |
| **Project graph** | `components/features/project-graph` | The centerpiece. Fetches `/flows/:projectId`, enriches nodes via `/integrations/:id`, lays them out with d3-force, and renders with React Flow. Custom nodes + animated "magic beam" edges. Toggle "All edges" vs. only-selected. Click a node → details sheet. |
| **Service details sheet** | `components/layout/sheet` | Slide-over with tabbed content (overview, logs, settings/policy) for the selected service. |
| **Log / trace inspection** | `components/layout/sheet/logs` | Rich log table + detail dropdowns: status-coded rows, JSON body/header viewers, size/duration formatters, state summaries. |
| **Activity panels** | `components/layout/header/project-activities` + `layout/right-sidebar` | Header toggles for **Requests**, **Notifications**, and **AI Assistant**, rendered into the right sidebar on project routes. |
| **Workspace settings** | `components/pages/workspace-settings` | Tabs: **API Management** (generate/list/revoke keys, usage analytics with an IP map), **Region & Localization**, **Alert Configuration**, **Tracing Customization**, **Integrations**. |
| **Account settings** | `components/pages/account-settings` | Tabs: **Profile**, **Notifications**, **Experimental features**, **Accessibility**. |
| **In-app docs** | `components/pages/documentation` | A self-contained docs page (overview, quickstart, instrumentation example, operations, configuration) rendered at `/documentation`. |

### The project graph in detail

`ProjectGraph` (`project-graph.tsx`) is a client component that:

1. Reads the route's `projectId` and calls `useReactFlowLayout().useFindByProjectId` → `GET /flows/:projectId` for raw `{ nodes, edges }`.
2. Runs `useProjectGraphLayoutSync`, which enriches each node (resolving `service:<uuid>` ids through `useServices().findById`) and positions them with a **d3-force** simulation. Tunables live in `force-layout/force-layout.config.ts` (collision radius, link distance/strength, many-body charge, tick count).
3. Renders `<ReactFlow>` with a **custom node type** (`project-node`) and a **custom edge type** (`magic` — the animated beam edge under `features/react-flow/magic-ui-beam-edge`). Zoom is clamped to `0.75–1`, snap-to-grid on, attribution hidden.
4. Wires interactions: clicking a node selects it and opens the sheet; clicking the pane clears selection and closes the sheet; an edge-visibility switch flips between "all edges" and "edges touching the selected node" (`project-graph.helpers.ts`).

---

## Design system

- **Font** — Satoshi, loaded locally via `next/font/local` (`lib/config/satoshi.ts`) with light/regular/medium weights in normal + italic, exposed as `--font-satoshi`.
- **Theme** — Dark by default. Tokens are CSS variables in `src/styles/root-theme.css` / `dark-theme.css` (background `#252525`, foreground/alabaster `#f5f5f5`, radius `0.625rem`). `globals.css` imports Tailwind, `tw-animate-css`, the shadcn layer, then the project's own style sheets.
- **Components** — Two tiers:
  - `components/ui/*` — low-level primitives built on **Base UI** and the shadcn **`base-nova`** style (configured in `components.json`, lucide icon set). Each primitive folder has an `index.ts` barrel and co-located `*.types.ts` / `*.variants.ts` / `*.config.ts`.
  - `components/features/*` and `components/pages/*` — composed, app-specific blocks.
- **Status colors** — `lib/status-code.ts` maps HTTP status ranges to Tailwind text colors (2xx green, 3xx yellow, 4xx orange, 5xx red), used throughout the log views.
- **Class composition** — `cn()` (`lib/utils.ts`) = `clsx` + `tailwind-merge`.

---

## Code conventions

A consistent **file co-location** pattern keeps each unit small and predictable.
For a component `foo`:

| File | Holds |
|---|---|
| `foo.tsx` | The component (JSX, wiring) |
| `foo.types.ts` | Props and local types |
| `foo.config.ts` | Constants, static config, lookup tables |
| `foo.handlers.ts` | Event-handler factories (pure functions returning handlers) |
| `foo.constants.ts` | Enums / route constants |
| `foo.variants.ts` | `class-variance-authority` variants (UI primitives) |
| `index.ts` | Barrel re-export (UI primitives) |

Other conventions:

- **Imports** use the `@/*` alias for `src/*` (configured in `tsconfig.json`).
- **Hooks** are grouped per resource and return an object of named sub-hooks (e.g. `useProjects().useAllProjects`). Query keys are hierarchical const builders so invalidation is precise.
- **Handlers as factories** — interaction logic is extracted into `create…Handler(...)` functions that take their dependencies and return the event handler, keeping components declarative and the logic unit-testable.
- **Server vs. client state** — server data → TanStack Query; ephemeral UI → Zustand or local `useState`. Don't duplicate server data into Zustand.
- **Formatting/linting** is **Biome** (single quotes, 2-space indent, 80 cols, organized imports). Run it before committing.

---

## Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev -p 3001` | Dev server at `http://localhost:3001/console` |
| `build` | `next build` | Production build |
| `start` | `next start -p 3001` | Serve the production build |
| `lint` | `biome lint .` | Lint |
| `check` | `biome check .` | Lint + format + import checks |
| `format` | `biome format --write .` | Apply formatting |
| `format:check` | `biome format .` | Verify formatting (CI) |
| `knip` | `knip` | Report unused files / exports / deps |

---

## Tooling

- **Biome** (`biome.json`) — single linter+formatter. Notable rules: `useImportType` off, `useLiteralKeys` off, organize-imports on, respects the repo `.gitignore`.
- **Knip** (`knip.json`) — finds dead files, exports, and dependencies.
- **react.doctor** (`doctor.config.json`) — ignores the `deslop/unused-file` rule.
- **shadcn** (`components.json`) — `base-nova` style, RSC on, `@magicui` registry wired for beam components.

---

## Build & deploy

- The app is a standard Next.js 16 build (`npm run build` → `npm run start`), served under `basePath: /console`.
- Provide `NEXT_PUBLIC_BASE_API_URL` (pointing at the deployed backend's `/api`) and a `JWT_SECRET` that **matches the backend**.
- Ensure the deployed origin is in the backend's CORS allow-list (`allowedOrigins`).
- The `.next/`, `node_modules/`, and `tsconfig.tsbuildinfo` artifacts are build outputs — they are not the source of truth.

---

## Troubleshooting

**Everything redirects to `/auth`, even after signing in.**
The proxy can't verify your JWT. Confirm `JWT_SECRET` in `.env` is identical to
the backend's signing secret and that the `mycelium_access_token` cookie is being
set (check DevTools → Application → Cookies).

**All API calls fail with CORS errors.**
The console origin isn't in the backend's `allowedOrigins`, or
`NEXT_PUBLIC_BASE_API_URL` points somewhere the backend isn't. The backend ships
allowing `http://localhost:3001`.

**The project graph renders empty / throws on some nodes.**
Node ids come in two shapes: `service:<uuid>` for registered services and
`origin:<url>` (or a bare name) for services that logged before registering. Only
`service:`-prefixed ids should be resolved via `GET /integrations/:id`; others
render from their label. If you add graph code, don't blindly strip the
`service:` prefix and call `findById` — a non-UUID id is rejected `400` by the
backend and can blank the whole graph. (See `docs/readme.md` for the historical
incident.)

**404s at `http://localhost:3001/`.**
Use `http://localhost:3001/console` — the app lives under `basePath: /console`
(`/` redirects there).

**Empty `200` responses look like errors.**
They aren't — `ApiClient` parses an empty body to `{}`. Non-2xx responses throw
`HTTP <status>: <body>`.

---

## Further reading

Repo-level notes and adjacent docs:

- `AGENTS.md` — Next.js 16 caveats for code changes.
- `docs/front-api-client.md` — `ApiClient` walkthrough _(predates the cookie-based token; treat `src/api/` as authoritative)_.
- `docs/mycelium-frontend-generate-api-key.md` — deep dive on the Generate API Key feature.
- `docs/sdk-distributed-tracing.md` — how trace ids/spans flow from the SDK.
- `docs/readme.md` — postmortem on the connection-pool deadlock and the graph node-id fix.

### Repository links

- [Mycelium Backend](https://github.com/LukaIvelic/mycelium-backend)
- [Mycelium Frontend](https://github.com/LukaIvelic/mycelium-frontend)
- [Mycelium SDK (JS)](https://github.com/LukaIvelic/mycelium.js)
