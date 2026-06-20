import {
  Activity,
  Bell,
  Boxes,
  Code2,
  Eye,
  FileText,
  Gauge,
  GitBranch,
  KeyRound,
  MapPin,
  Network,
  Radar,
  Route,
  Share2,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserRound,
  Workflow,
} from 'lucide-react';

export const documentationNav = [
  {
    title: 'Getting started',
    items: [
      { href: '#overview', label: 'Overview' },
      { href: '#quickstart', label: 'Quickstart' },
      { href: '#concepts', label: 'Core concepts' },
    ],
  },
  {
    title: 'Instrument',
    items: [
      { href: '#instrumentation', label: 'Trace ingestion' },
      { href: '#trace-context', label: 'Trace context' },
      { href: '#log-schema', label: 'Log schema' },
    ],
  },
  {
    title: 'Operate',
    items: [
      { href: '#operations', label: 'Service map' },
      { href: '#activity', label: 'Requests & alerts' },
      { href: '#service-details', label: 'Service details' },
    ],
  },
  {
    title: 'Configure',
    items: [
      { href: '#api-keys', label: 'API keys & usage' },
      { href: '#configuration', label: 'Workspace settings' },
      { href: '#account', label: 'Account settings' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { href: '#api-reference', label: 'API endpoints' },
      { href: '#rate-limits', label: 'Rate limits' },
      { href: '#troubleshooting', label: 'Troubleshooting' },
    ],
  },
];

export const documentationToc = [
  { href: '#overview', label: 'Overview' },
  { href: '#quickstart', label: 'Quickstart' },
  { href: '#concepts', label: 'Core concepts' },
  { href: '#instrumentation', label: 'Trace ingestion' },
  { href: '#trace-context', label: 'Trace context' },
  { href: '#log-schema', label: 'Log schema' },
  { href: '#operations', label: 'Service map' },
  { href: '#activity', label: 'Requests & alerts' },
  { href: '#service-details', label: 'Service details' },
  { href: '#api-keys', label: 'API keys & usage' },
  { href: '#configuration', label: 'Workspace settings' },
  { href: '#account', label: 'Account settings' },
  { href: '#api-reference', label: 'API endpoints' },
  { href: '#rate-limits', label: 'Rate limits' },
  { href: '#troubleshooting', label: 'Troubleshooting' },
];

export const documentationFeatureCards = [
  {
    icon: Radar,
    title: 'Passive discovery',
    description:
      'Services appear on the map as their traffic is observed — no manual registration required.',
  },
  {
    icon: Network,
    title: 'Dependency graph',
    description:
      'Edges are derived from trace relationships (span → parent span) between services.',
  },
  {
    icon: Bell,
    title: 'Operational signals',
    description:
      'Requests, warnings, and incidents stay one click away from the graph.',
  },
];

export const documentationSteps = [
  {
    icon: GitBranch,
    title: 'Create a project',
    description:
      'Projects group API keys, service maps, and trace history. Create one from the Projects page.',
  },
  {
    icon: KeyRound,
    title: 'Generate an API key',
    description:
      'Open Workspace → API Management and mint a key. The secret is shown once — store it safely.',
  },
  {
    icon: Code2,
    title: 'Send traces',
    description:
      'Forward request metadata from your gateway or the Mycelium SDK, authenticated with the key.',
  },
  {
    icon: Workflow,
    title: 'Open the service map',
    description:
      'Visit the project to watch services and their dependencies render as traffic arrives.',
  },
];

export const documentationConcepts = [
  {
    icon: GitBranch,
    title: 'Project',
    description:
      'The top-level container. Groups API keys, the service map, and trace history for one system.',
  },
  {
    icon: KeyRound,
    title: 'API key',
    description:
      'Authenticates trace ingestion for a project. Only its prefix is stored; revoke any key anytime.',
  },
  {
    icon: Boxes,
    title: 'Service / integration',
    description:
      'A node on the map. Created automatically the first time traffic is attributed to an origin.',
  },
  {
    icon: Share2,
    title: 'Trace & span',
    description:
      'A trace follows one action across services. Each hop is a span; parent spans chain them together.',
  },
  {
    icon: FileText,
    title: 'Log & log detail',
    description:
      'Every observed request becomes a log; its body, headers, and sizes load on demand as a detail.',
  },
];

export const documentationOperations = [
  {
    icon: Activity,
    title: 'Requests panel',
    description: 'Inspect recent requests without leaving the project map.',
  },
  {
    icon: Route,
    title: 'Service details',
    description: 'Review logs, settings, budgets, and communication policy.',
  },
  {
    icon: ShieldCheck,
    title: 'Workspace controls',
    description: 'Tune API access, regions, alerts, tracing, and integrations.',
  },
];

export const documentationActivityPanels = [
  {
    icon: Activity,
    title: 'Requests',
    description:
      'Live feed of recent requests for the project, inspectable in place.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Warnings and incidents surfaced right next to the graph.',
  },
  {
    icon: Sparkles,
    title: 'AI assistant',
    description: "Ask questions about the project's traffic and topology.",
  },
];

export const documentationLogFields = [
  {
    name: 'traceId',
    type: 'string',
    description: 'Identifies the whole journey; constant across every hop.',
  },
  {
    name: 'spanId',
    type: 'string',
    description: 'Identifies this single hop. New on every service.',
  },
  {
    name: 'parentSpanId',
    type: 'string | null',
    description: 'The calling span. Null on the first hop.',
  },
  {
    name: 'method',
    type: 'string',
    description: 'HTTP method of the observed request.',
  },
  { name: 'path', type: 'string', description: 'Request path.' },
  {
    name: 'origin',
    type: 'string',
    description: 'Originating service address.',
  },
  {
    name: 'protocol',
    type: 'string',
    description: 'Request protocol (http / https).',
  },
  {
    name: 'statusCode',
    type: 'number',
    description: 'HTTP response status. Color-coded throughout the UI.',
  },
  {
    name: 'durationMs',
    type: 'number',
    description: 'Round-trip duration in milliseconds.',
  },
  {
    name: 'integrationName',
    type: 'string | null',
    description: 'Resolved service name, once the service has registered.',
  },
  {
    name: 'timestamp',
    type: 'string',
    description: 'When the request occurred (ISO 8601).',
  },
];

export const documentationLogDetailFields = [
  {
    name: 'body',
    type: 'string | null',
    description: 'Captured request / response body.',
  },
  {
    name: 'headers',
    type: 'Record<string, string>',
    description: 'Captured headers.',
  },
  { name: 'contentType', type: 'string', description: 'Body content type.' },
  {
    name: 'contentLength',
    type: 'number',
    description: 'Declared content length.',
  },
  {
    name: 'bodySizeKb',
    type: 'number',
    description: 'Body size in kilobytes.',
  },
  {
    name: 'completed',
    type: 'boolean',
    description: 'Whether the request completed.',
  },
  {
    name: 'aborted',
    type: 'boolean',
    description: 'Whether the request was aborted.',
  },
  {
    name: 'idempotent',
    type: 'boolean',
    description: 'Whether the request method is idempotent.',
  },
];

export const documentationWorkspaceTabs = [
  {
    name: 'API Management',
    description: 'Generate, list, and revoke keys; review per-key usage.',
  },
  {
    name: 'Region & Localization',
    description: 'Default region and timezone for the workspace.',
  },
  {
    name: 'Alert Configuration',
    description: 'Routing and escalation windows for notifications.',
  },
  {
    name: 'Tracing Customization',
    description: 'Sampling and which fields are retained on ingested traces.',
  },
  {
    name: 'Integrations',
    description: 'Connect external systems to the workspace.',
  },
];

export const documentationAccountTabs = [
  {
    icon: UserRound,
    title: 'Profile',
    description: 'Name, bio, job title, company, location, and avatar.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Choose what you are notified about and how.',
  },
  {
    icon: Sparkles,
    title: 'Experimental features',
    description: 'Opt into in-progress capabilities.',
  },
  {
    icon: Eye,
    title: 'Accessibility',
    description: 'Motion, contrast, and related display preferences.',
  },
];

export const documentationApiKeyLifecycle = [
  {
    icon: KeyRound,
    title: 'Generate',
    description: 'Mint a key scoped to a project from API Management.',
  },
  {
    icon: TriangleAlert,
    title: 'Reveal once',
    description:
      'The plaintext secret is shown a single time at creation — copy it immediately.',
  },
  {
    icon: Gauge,
    title: 'Monitor usage',
    description: 'Track total requests and average latency per key.',
  },
  {
    icon: MapPin,
    title: 'See traffic origins',
    description:
      'Per-IP request counts are enriched with geolocation (country, city, ISP).',
  },
];

export const documentationApiEndpoints = [
  {
    group: 'Authentication',
    items: [
      {
        method: 'POST',
        path: '/authentication/signup',
        description: 'Create an account; returns an access token.',
      },
      {
        method: 'POST',
        path: '/authentication/login',
        description: 'Sign in; returns an access token.',
      },
      {
        method: 'GET',
        path: '/authentication/validate',
        description: 'Check whether an email already exists.',
      },
    ],
  },
  {
    group: 'Projects',
    items: [
      {
        method: 'GET',
        path: '/projects',
        description: 'List projects (supports filtering and sort).',
      },
      {
        method: 'POST',
        path: '/projects',
        description: 'Create a project.',
      },
      {
        method: 'PATCH',
        path: '/projects/:id',
        description: 'Update a project.',
      },
      {
        method: 'DELETE',
        path: '/projects/:id',
        description: 'Invalidate a project.',
      },
      {
        method: 'POST',
        path: '/projects/:id/api-key',
        description: 'Mint a key for the project.',
      },
    ],
  },
  {
    group: 'Keys & usage',
    items: [
      {
        method: 'GET',
        path: '/api-keys',
        description: "List the current user's keys.",
      },
      {
        method: 'DELETE',
        path: '/api-keys/:id',
        description: 'Revoke a key.',
      },
      {
        method: 'GET',
        path: '/api-key-stats/:apiKeyId',
        description: 'Usage and IP analytics for a key.',
      },
    ],
  },
  {
    group: 'Telemetry',
    items: [
      {
        method: 'POST',
        path: '/logs',
        description: 'Ingest a request log (SDK → backend).',
      },
      {
        method: 'GET',
        path: '/logs',
        description: 'List logs for a project.',
      },
      {
        method: 'GET',
        path: '/log-details/:logId',
        description: 'Full body and headers for one log.',
      },
      {
        method: 'GET',
        path: '/flows/:projectId',
        description: 'Graph nodes and edges for the service map.',
      },
      {
        method: 'GET',
        path: '/integrations/:id',
        description: 'Metadata for a single service.',
      },
    ],
  },
];

export const documentationTroubleshooting = [
  {
    title: 'Everything redirects to sign-in',
    description:
      "The session token cannot be verified. Confirm the console's JWT secret matches the backend and that the access-token cookie is set.",
  },
  {
    title: 'Requests fail with CORS errors',
    description:
      'The console origin is not in the backend allow-list, or the API base URL is wrong. The backend ships allowing http://localhost:3001.',
  },
  {
    title: 'The service map looks empty',
    description:
      'Nodes can arrive before a service registers. Registered nodes use a service: id; others render from their label and should not be resolved against the integrations endpoint.',
  },
  {
    title: 'A page 404s at the root',
    description:
      'The console is served under /console. Open http://localhost:3001/console.',
  },
];
