import { type LucideIcon, Search } from 'lucide-react';
import type { ReactNode } from 'react';
import { Centered } from '@/components/features/centered/centered';
import { cn } from '@/lib/utils';
import {
  documentationAccountTabs,
  documentationActivityPanels,
  documentationApiEndpoints,
  documentationApiKeyLifecycle,
  documentationConcepts,
  documentationFeatureCards,
  documentationLogDetailFields,
  documentationLogFields,
  documentationNav,
  documentationOperations,
  documentationSteps,
  documentationToc,
  documentationTroubleshooting,
  documentationWorkspaceTabs,
} from './documentation.config';

type IconCard = {
  description: string;
  icon: LucideIcon;
  title: string;
};

type FieldRow = {
  description: string;
  name: string;
  type: string;
};

const INGESTION_EXAMPLE = `POST /api/logs
Authorization: Bearer <mycelium_api_key>

{
  "service": "checkout-api",
  "method": "POST",
  "path": "/orders",
  "traceId": "trace_01",
  "spanId": "span_01",
  "parentSpanId": null,
  "statusCode": 201,
  "durationMs": 142
}`;

const TRACE_CONTEXT_EXAMPLE = `Service A (entry)   traceId=trace_01  spanId=span_a  parentSpanId=null
   │  calls B  →  injects x-trace-id: trace_01
   ▼
Service B           traceId=trace_01  spanId=span_b  parentSpanId=span_a
   │  calls C
   ▼
Service C           traceId=trace_01  spanId=span_c  parentSpanId=span_b`;

export function DocumentationPage() {
  return (
    <Centered className='h-auto min-h-full w-full max-w-[1400px] pb-24'>
      <div className='grid gap-8'>
        <header className='grid gap-4 border-b border-foreground/10 pb-8'>
          <div>
            <h1 className='text-[32px] font-medium'>Documentation</h1>
            <p className='mt-2 max-w-2xl text-foreground/50'>
              Build, instrument, and operate service maps in Mycelium.
            </p>
          </div>

          <label className='flex h-10 max-w-xl items-center gap-2 rounded-[8px] border border-foreground/10 bg-[#161616] px-3 text-sm text-foreground/45'>
            <Search size={16} />
            <input
              type='search'
              placeholder='Search documentation'
              className='h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/35'
            />
          </label>
        </header>

        <div className='grid grid-cols-[220px_minmax(0,1fr)_220px] gap-8 max-xl:grid-cols-[200px_minmax(0,1fr)] max-lg:grid-cols-1'>
          <DocsNav />

          <article className='min-w-0'>
            <section id='overview' className='scroll-mt-8'>
              <p className='text-sm font-medium text-foreground/45'>
                Mycelium Docs
              </p>
              <h2 className='mt-3 text-2xl font-medium'>
                Trace-first service operations
              </h2>
              <p className='mt-3 max-w-3xl text-sm leading-6 text-foreground/60'>
                Mycelium maps your services from the request traffic they emit.
                Start with a project and an API key, send traces from your
                gateway or SDK, then use the project graph to inspect requests,
                logs, notifications, and service-level controls.
              </p>

              <IconCardGrid
                items={documentationFeatureCards}
                className='grid-cols-3 max-md:grid-cols-1'
              />
            </section>

            <DocsSection
              id='quickstart'
              eyebrow='Quickstart'
              title='Connect a project'
            >
              <StepList items={documentationSteps} />
            </DocsSection>

            <DocsSection
              id='concepts'
              eyebrow='Concepts'
              title='The core objects'
            >
              <p className='text-sm leading-6 text-foreground/60'>
                Five objects make up everything you see in the console.
              </p>
              <IconCardGrid
                items={documentationConcepts}
                className='grid-cols-2 max-md:grid-cols-1'
              />
            </DocsSection>

            <DocsSection
              id='instrumentation'
              eyebrow='Instrumentation'
              title='Send request metadata'
            >
              <p className='text-sm leading-6 text-foreground/60'>
                Emit one event for each inbound request and include trace ids
                for downstream calls. Authenticate with your project API key as
                a bearer token. Mycelium links services by span and parent-span
                identifiers.
              </p>
              <CodeBlock>{INGESTION_EXAMPLE}</CodeBlock>
            </DocsSection>

            <DocsSection
              id='trace-context'
              eyebrow='Instrumentation'
              title='How trace context flows'
            >
              <p className='text-sm leading-6 text-foreground/60'>
                A trace follows a single action across services. Three values
                travel with it: a <InlineCode>traceId</InlineCode> for the whole
                journey, a fresh <InlineCode>spanId</InlineCode> for each hop,
                and a <InlineCode>parentSpanId</InlineCode> pointing at the
                caller. The first hop has no parent.
              </p>
              <p className='mt-3 text-sm leading-6 text-foreground/60'>
                The trace id propagates in the{' '}
                <InlineCode>x-trace-id</InlineCode> header; each service
                generates its own span and records the incoming span as its
                parent, so headers and logs always agree.
              </p>
              <CodeBlock>{TRACE_CONTEXT_EXAMPLE}</CodeBlock>
            </DocsSection>

            <DocsSection id='log-schema' eyebrow='Reference' title='Log schema'>
              <p className='text-sm leading-6 text-foreground/60'>
                Each observed request is stored as a log. Heavy fields (body,
                headers) load on demand as a log detail.
              </p>
              <h3 className='mt-5 text-sm font-medium text-foreground/70'>
                Log
              </h3>
              <FieldTable fields={documentationLogFields} />
              <h3 className='mt-6 text-sm font-medium text-foreground/70'>
                Log detail
              </h3>
              <FieldTable fields={documentationLogDetailFields} />
            </DocsSection>

            <DocsSection
              id='operations'
              eyebrow='Operations'
              title='Work from the graph'
            >
              <DefinitionRows items={documentationOperations} />
            </DocsSection>

            <DocsSection
              id='activity'
              eyebrow='Operations'
              title='Requests, alerts & assistant'
            >
              <p className='text-sm leading-6 text-foreground/60'>
                On a project route, the header exposes three panels that dock
                into the right sidebar.
              </p>
              <IconCardGrid
                items={documentationActivityPanels}
                className='grid-cols-3 max-md:grid-cols-1'
              />
            </DocsSection>

            <DocsSection
              id='service-details'
              eyebrow='Operations'
              title='Service details'
            >
              <p className='text-sm leading-6 text-foreground/60'>
                Click any node to open its details sheet — a slide-over with
                tabbed content for the selected service: overview, request logs,
                and service-level settings and communication policy. Logs are
                color-coded by status and expand to reveal bodies, headers, and
                timing.
              </p>
            </DocsSection>

            <DocsSection
              id='api-keys'
              eyebrow='Configuration'
              title='API keys & usage'
            >
              <p className='text-sm leading-6 text-foreground/60'>
                Keys are minted per project from Workspace → API Management.
              </p>
              <IconCardGrid
                items={documentationApiKeyLifecycle}
                className='grid-cols-2 max-md:grid-cols-1'
              />
            </DocsSection>

            <DocsSection
              id='configuration'
              eyebrow='Configuration'
              title='Workspace settings'
            >
              <KeyValueTable rows={documentationWorkspaceTabs} />
            </DocsSection>

            <DocsSection
              id='account'
              eyebrow='Configuration'
              title='Account settings'
            >
              <IconCardGrid
                items={documentationAccountTabs}
                className='grid-cols-2 max-md:grid-cols-1'
              />
            </DocsSection>

            <DocsSection
              id='api-reference'
              eyebrow='Reference'
              title='API endpoints'
            >
              <p className='text-sm leading-6 text-foreground/60'>
                Paths are relative to your API base URL (which already ends in{' '}
                <InlineCode>/api</InlineCode>). Every call except ingestion uses
                a bearer session token; ingestion uses a project API key.
              </p>
              <EndpointTable groups={documentationApiEndpoints} />
            </DocsSection>

            <DocsSection
              id='rate-limits'
              eyebrow='Reference'
              title='Rate limits'
            >
              <p className='text-sm leading-6 text-foreground/60'>
                Trace ingestion is rate limited per API key. Bursts beyond the
                allowance are rejected with{' '}
                <InlineCode>429 Too Many Requests</InlineCode> — back off and
                retry. Tune sampling and retained fields under Tracing
                Customization to control volume.
              </p>
            </DocsSection>

            <DocsSection
              id='troubleshooting'
              eyebrow='Reference'
              title='Troubleshooting'
            >
              <div className='grid'>
                {documentationTroubleshooting.map(({ title, description }) => (
                  <div
                    key={title}
                    className='border-b border-foreground/10 py-3 last:border-b-0'
                  >
                    <h3 className='text-sm font-medium'>{title}</h3>
                    <p className='mt-1 text-xs leading-5 text-foreground/50'>
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </DocsSection>
          </article>

          <DocsToc />
        </div>
      </div>
    </Centered>
  );
}

function DocsNav() {
  return (
    <aside className='sticky top-0 h-fit max-lg:hidden'>
      <div className='grid gap-5 text-sm'>
        {documentationNav.map((group) => (
          <nav key={group.title} className='grid gap-2'>
            <div className='text-xs font-medium text-foreground/40'>
              {group.title}
            </div>
            <div className='grid gap-1'>
              {group.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'rounded-[8px] px-2 py-1.5 text-foreground/60',
                    'hover:bg-[#333333] hover:text-[#f5f5f5]',
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        ))}
      </div>
    </aside>
  );
}

function DocsToc() {
  return (
    <aside className='sticky top-0 h-fit border-l border-foreground/10 pl-5 max-xl:hidden'>
      <div className='mb-2 text-xs font-medium text-foreground/40'>
        On this page
      </div>
      <nav className='grid gap-1 text-sm'>
        {documentationToc.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className='rounded-[8px] px-2 py-1.5 text-foreground/55 hover:bg-[#333333] hover:text-[#f5f5f5]'
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function DocsSection({
  id,
  eyebrow,
  title,
  children,
}: {
  children: ReactNode;
  eyebrow: string;
  id: string;
  title: string;
}) {
  return (
    <section id={id} className='mt-14 scroll-mt-8'>
      <div className='mb-4'>
        <p className='text-xs font-medium text-foreground/40'>{eyebrow}</p>
        <h2 className='mt-2 text-xl font-medium'>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function IconCardGrid({
  items,
  className,
}: {
  className?: string;
  items: IconCard[];
}) {
  return (
    <div className={cn('mt-6 grid gap-3', className)}>
      {items.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className='rounded-[8px] border border-foreground/10 bg-[#1d1d1d]/40 p-4'
        >
          <Icon className='size-4 text-foreground/55' />
          <h3 className='mt-3 text-sm font-medium'>{title}</h3>
          <p className='mt-1 text-xs leading-5 text-foreground/50'>
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}

function StepList({ items }: { items: IconCard[] }) {
  return (
    <div className='grid gap-3'>
      {items.map(({ icon: Icon, title, description }, index) => (
        <div
          key={title}
          className='grid grid-cols-[auto_1fr] gap-3 rounded-[8px] border border-foreground/10 bg-[#1d1d1d]/30 p-4'
        >
          <span className='grid size-8 place-items-center rounded-[8px] border border-foreground/10 bg-[#161616] text-foreground/60'>
            <Icon size={15} />
          </span>
          <div>
            <div className='text-sm font-medium'>
              {index + 1}. {title}
            </div>
            <p className='mt-1 text-xs leading-5 text-foreground/50'>
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DefinitionRows({ items }: { items: IconCard[] }) {
  return (
    <div className='grid gap-3'>
      {items.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className='grid grid-cols-[auto_1fr] gap-3 border-b border-foreground/10 py-3 last:border-b-0'
        >
          <Icon className='mt-0.5 size-4 text-foreground/50' />
          <div>
            <h3 className='text-sm font-medium'>{title}</h3>
            <p className='mt-1 text-xs leading-5 text-foreground/50'>
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FieldTable({ fields }: { fields: FieldRow[] }) {
  return (
    <div className='mt-4 overflow-hidden rounded-[8px] border border-foreground/10'>
      {fields.map(({ name, type, description }) => (
        <div
          key={name}
          className='grid grid-cols-[180px_180px_1fr] gap-4 border-b border-foreground/10 px-4 py-2.5 text-xs last:border-b-0 max-md:grid-cols-1 max-md:gap-1'
        >
          <code className='font-mono text-foreground/80'>{name}</code>
          <code className='font-mono text-foreground/40'>{type}</code>
          <span className='text-foreground/55'>{description}</span>
        </div>
      ))}
    </div>
  );
}

function KeyValueTable({
  rows,
}: {
  rows: { description: string; name: string }[];
}) {
  return (
    <div className='overflow-hidden rounded-[8px] border border-foreground/10'>
      {rows.map(({ name, description }) => (
        <div
          key={name}
          className='grid grid-cols-[220px_1fr] gap-4 border-b border-foreground/10 px-4 py-3 text-sm last:border-b-0 max-sm:grid-cols-1'
        >
          <span className='font-medium'>{name}</span>
          <span className='text-foreground/50'>{description}</span>
        </div>
      ))}
    </div>
  );
}

function EndpointTable({
  groups,
}: {
  groups: {
    group: string;
    items: { description: string; method: string; path: string }[];
  }[];
}) {
  return (
    <div className='mt-4 grid gap-6'>
      {groups.map(({ group, items }) => (
        <div key={group}>
          <div className='mb-2 text-xs font-medium text-foreground/45'>
            {group}
          </div>
          <div className='overflow-hidden rounded-[8px] border border-foreground/10'>
            {items.map(({ method, path, description }) => (
              <div
                key={`${method} ${path}`}
                className='grid grid-cols-[64px_220px_1fr] items-center gap-4 border-b border-foreground/10 px-4 py-2.5 text-xs last:border-b-0 max-md:grid-cols-1 max-md:gap-1'
              >
                <span
                  className={cn(
                    'w-fit rounded-[6px] border px-1.5 py-0.5 font-mono text-[10px]',
                    methodChipClass(method),
                  )}
                >
                  {method}
                </span>
                <code className='font-mono text-foreground/80'>{path}</code>
                <span className='text-foreground/55'>{description}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className='mt-4 overflow-x-auto rounded-[8px] border border-foreground/10 bg-[#111111] p-4 text-xs leading-6 text-foreground/75'>
      <code>{children}</code>
    </pre>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className='rounded bg-[#161616] px-1 py-0.5 font-mono text-[0.85em] text-foreground/80'>
      {children}
    </code>
  );
}

function methodChipClass(method: string): string {
  switch (method) {
    case 'GET':
      return 'border-green-400/30 text-green-400';
    case 'POST':
      return 'border-blue-400/30 text-blue-400';
    case 'PATCH':
      return 'border-yellow-400/30 text-yellow-400';
    case 'DELETE':
      return 'border-red-400/30 text-red-400';
    default:
      return 'border-foreground/20 text-foreground/60';
  }
}
