import {
  BellRing,
  Cable,
  CircleGauge,
  ExternalLink,
  GitBranch,
  LockKeyhole,
  Network,
  Route,
  ShieldCheck,
  Timer,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import type { Service } from '@/api/services/services/services-service.types';
import { Truncate } from '@/components/features/truncate/truncate';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { Switch } from '@/components/ui/switch/switch';
import { Textarea } from '@/components/ui/textarea/textarea';
import { useLogs } from '@/hooks/use-logs.hook';
import { statusCodeColor } from '@/lib/status-code';
import type { Log } from '@/lib/types/log';
import { cn } from '@/lib/utils';

const DETAIL_LOG_LIMIT = 100;
const EMPTY_VALUE = 'Not set';
const SLOW_REQUEST_COUNT = 3;
const TOP_ENDPOINT_COUNT = 4;

interface GeneralSettingsProps {
  isLoading: boolean;
  service: Service | undefined;
}

interface IntegrationLogsProps {
  integrationId: string;
}

interface CommunicationProps extends IntegrationLogsProps {
  service: Service | undefined;
}

interface DetailSectionProps {
  action?: ReactNode;
  children: ReactNode;
  title: string;
}

interface FieldProps {
  label: string;
  placeholder?: string;
  value?: string | null;
}

interface MetricCardProps {
  label: string;
  tone?: 'default' | 'danger' | 'success';
  value: string;
}

interface ToggleRowProps {
  checked?: boolean;
  description: string;
  label: string;
}

interface FeatureRowProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  meta: string;
  value: string;
}

export function GeneralSettings({ service, isLoading }: GeneralSettingsProps) {
  if (isLoading) {
    return <Skeleton className='h-72 w-full' />;
  }

  return (
    <div className='grid gap-3'>
      <DetailSection
        title='Basics'
        action={
          <Button type='button' variant='outline' size='sm'>
            Save draft
          </Button>
        }
      >
        <div className='grid grid-cols-2 gap-3 p-3'>
          <TextField label='Display name' value={service?.name} />
          <TextField label='Service key' value={service?.key} />
          <TextField label='Version' value={service?.version} />
          <TextField label='Owner team' placeholder='Platform' />
          <TextField label='Runtime' placeholder='Node.js 22' />
          <TextField label='Environment' placeholder='Production' />
        </div>
        <div className='border-t border-foreground/10 p-3'>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            defaultValue={service?.description ?? ''}
            placeholder='Short description for operators and incident reviews'
            className='mt-1 min-h-20 resize-none bg-[#161616]'
          />
        </div>
      </DetailSection>

      <DetailSection title='References'>
        <ReferenceRow label='Origin' value={service?.origin ?? EMPTY_VALUE} />
        <ReferenceRow
          label='Repository'
          value={
            service?.repository ? (
              <a
                href={service.repository}
                target='_blank'
                rel='noreferrer'
                className='inline-flex min-w-0 items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline'
              >
                <Truncate text={service.repository} max={44} />
                <ExternalLink size={12} />
              </a>
            ) : (
              EMPTY_VALUE
            )
          }
        />
        <ReferenceRow label='Runbook' value='runbooks/service-health.md' />
        <ReferenceRow label='Pager rotation' value='Primary on-call' />
      </DetailSection>

      <DetailSection title='Controls'>
        <ToggleRow
          label='Deployment lock'
          description='Manual approval before production rollout'
        />
        <ToggleRow
          label='Trace sampling override'
          description='Keep 100% of traces while debugging incidents'
          checked
        />
        <ToggleRow
          label='Schema drift alerts'
          description='Notify when payload shape changes between releases'
          checked
        />
      </DetailSection>
    </div>
  );
}

export function PerformanceMetrics({ integrationId }: IntegrationLogsProps) {
  const { useLogsByIntegration } = useLogs();
  const { data: logsData, isFetching } = useLogsByIntegration(integrationId, {
    limit: DETAIL_LOG_LIMIT,
  });
  const logs = useMemo(() => logsData ?? [], [logsData]);
  const metrics = useMemo(() => createPerformanceMetrics(logs), [logs]);
  const slowestLogs = useMemo(() => getSlowestLogs(logs), [logs]);

  if (isFetching && !logs.length) {
    return <Skeleton className='h-72 w-full' />;
  }

  return (
    <div className='grid gap-3'>
      <div className='grid grid-cols-4 gap-3'>
        <MetricCard label='Volume' value={metrics.requests} />
        <MetricCard label='Average' value={metrics.averageLatency} />
        <MetricCard
          label='Success'
          value={metrics.successRate}
          tone='success'
        />
        <MetricCard label='Errors' value={metrics.errors} tone='danger' />
      </div>

      <DetailSection title='Latency Budget'>
        <div className='grid grid-cols-3 gap-3 p-3'>
          <TextField label='Target p95' placeholder='300 ms' />
          <TextField label='Alert after' placeholder='800 ms' />
          <TextField label='Burn window' placeholder='30 min' />
        </div>
        <ToggleRow
          label='Regression guard'
          description='Block deploys when latency increases sharply'
          checked
        />
        <ToggleRow
          label='Auto-baseline'
          description='Recompute service baseline from recent traffic'
          checked
        />
      </DetailSection>

      <DetailSection title='Health Checks'>
        <FeatureRow
          icon={Timer}
          label='Synthetic probe'
          value='GET /health'
          meta='Every 60 seconds'
        />
        <FeatureRow
          icon={CircleGauge}
          label='Apdex target'
          value='0.95'
          meta='Production traffic'
        />
        <FeatureRow
          icon={BellRing}
          label='Error budget'
          value='99.9%'
          meta='30 day rolling window'
        />
      </DetailSection>

      <DetailSection title='Slow Requests'>
        {slowestLogs.length ? (
          slowestLogs.map((log) => (
            <LogListRow
              key={log.id}
              label={`${log.method} ${log.path}`}
              prefix={String(log.statusCode)}
              prefixClassName={statusCodeColor(log.statusCode)}
              value={formatDuration(log.durationMs)}
            />
          ))
        ) : (
          <EmptyDetailState text='No slow requests recorded.' />
        )}
      </DetailSection>
    </div>
  );
}

export function Communication({ integrationId, service }: CommunicationProps) {
  const { useLogsByIntegration } = useLogs();
  const { data: logsData, isFetching } = useLogsByIntegration(integrationId, {
    limit: DETAIL_LOG_LIMIT,
  });
  const logs = useMemo(() => logsData ?? [], [logsData]);
  const summary = useMemo(() => createCommunicationSummary(logs), [logs]);
  const topEndpoints = useMemo(() => getTopEndpoints(logs), [logs]);

  if (isFetching && !logs.length) {
    return <Skeleton className='h-72 w-full' />;
  }

  return (
    <div className='grid gap-3'>
      <DetailSection title='Ingress'>
        <FeatureRow
          icon={Network}
          label='Public origin'
          value={service?.origin ?? EMPTY_VALUE}
          meta={`Protocols: ${summary.protocols}`}
        />
        <FeatureRow
          icon={ShieldCheck}
          label='Auth policy'
          value='JWT required'
          meta='Service-to-service traffic'
        />
        <FeatureRow
          icon={LockKeyhole}
          label='mTLS'
          value='Enforced'
          meta='Internal callers'
        />
      </DetailSection>

      <DetailSection title='Outbound Policy'>
        <ToggleRow
          label='Dependency allowlist'
          description='Reject calls to unknown services'
          checked
        />
        <ToggleRow
          label='Contract checks'
          description='Compare observed payloads against saved contracts'
          checked
        />
        <ToggleRow
          label='Circuit breaker'
          description='Trip after repeated upstream failures'
        />
      </DetailSection>

      <DetailSection title='Traffic Shape'>
        <ReferenceRow label='Observed callers' value={summary.callers} />
        <ReferenceRow label='Root requests' value={summary.rootRequests} />
        <ReferenceRow label='Retry policy' value='2 retries, 150 ms backoff' />
        <ReferenceRow label='Timeout' value='5 seconds' />
      </DetailSection>

      <DetailSection title='Top Endpoints'>
        {topEndpoints.length ? (
          topEndpoints.map(({ key, label, count }) => (
            <LogListRow
              key={key}
              label={label}
              value={`${count} calls`}
              prefix=''
            />
          ))
        ) : (
          <EmptyDetailState text='No endpoints observed.' />
        )}
      </DetailSection>

      <DetailSection title='Planned Dependencies'>
        <FeatureRow
          icon={Cable}
          label='Billing API'
          value='Optional'
          meta='Outbound REST'
        />
        <FeatureRow
          icon={Route}
          label='Event gateway'
          value='Required'
          meta='Async publish'
        />
        <FeatureRow
          icon={GitBranch}
          label='Contract version'
          value='v1.3'
          meta='Pinned until next release'
        />
      </DetailSection>
    </div>
  );
}

function DetailSection({ title, action, children }: DetailSectionProps) {
  return (
    <section className='rounded-[8px] border border-foreground/10 bg-[#1d1d1d]/30'>
      <div className='flex items-center justify-between gap-3 border-b border-foreground/10 px-3 py-2'>
        <div className='text-xs font-medium text-foreground/60'>{title}</div>
        {action}
      </div>
      <div className='grid text-sm'>{children}</div>
    </section>
  );
}

function TextField({ label, value, placeholder }: FieldProps) {
  const inputId = `service-detail-${label.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <label htmlFor={inputId} className='grid gap-1'>
      <FieldLabel>{label}</FieldLabel>
      <Input
        id={inputId}
        defaultValue={value ?? ''}
        placeholder={placeholder}
        className='bg-[#161616]'
      />
    </label>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className='text-xs text-foreground/45'>{children}</span>;
}

function ReferenceRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className='grid grid-cols-[140px_minmax(0,1fr)] gap-3 border-b border-foreground/10 px-3 py-2 last:border-b-0'>
      <span className='text-foreground/45'>{label}</span>
      <span className='min-w-0 text-foreground/75'>{value}</span>
    </div>
  );
}

function ToggleRow({ label, description, checked }: ToggleRowProps) {
  return (
    <div className='grid grid-cols-[1fr_auto] items-center gap-3 border-b border-foreground/10 px-3 py-2 last:border-b-0'>
      <div className='min-w-0'>
        <div className='text-foreground/80'>{label}</div>
        <div className='mt-0.5 text-xs text-foreground/45'>{description}</div>
      </div>
      <Switch defaultChecked={checked} />
    </div>
  );
}

function FeatureRow({ icon: Icon, label, value, meta }: FeatureRowProps) {
  return (
    <div className='grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-foreground/10 px-3 py-2 last:border-b-0'>
      <span className='grid size-8 place-items-center rounded-[8px] border border-foreground/10 bg-[#161616] text-foreground/55'>
        <Icon size={15} />
      </span>
      <div className='min-w-0'>
        <div className='text-foreground/80'>{label}</div>
        <div className='mt-0.5 text-xs text-foreground/45'>{meta}</div>
      </div>
      <span className='text-right text-foreground/60'>{value}</span>
    </div>
  );
}

function MetricCard({ label, value, tone = 'default' }: MetricCardProps) {
  return (
    <div className='rounded-[8px] border border-foreground/10 bg-[#1d1d1d]/30 px-3 py-3'>
      <div className='text-xs text-foreground/45'>{label}</div>
      <div
        className={cn(
          'mt-1 text-lg font-medium',
          tone === 'danger' && 'text-red-300',
          tone === 'success' && 'text-emerald-300',
        )}
      >
        {value}
      </div>
    </div>
  );
}

function LogListRow({
  label,
  prefix,
  prefixClassName,
  value,
}: {
  label: string;
  prefix: string;
  prefixClassName?: string;
  value: string;
}) {
  return (
    <div className='grid grid-cols-[1fr_auto] gap-3 border-b border-foreground/10 px-3 py-2 last:border-b-0'>
      <span className='min-w-0 text-foreground/75'>
        {prefix && <span className={prefixClassName}>{prefix}</span>}{' '}
        <Truncate text={label} max={42} />
      </span>
      <span className='text-foreground/50'>{value}</span>
    </div>
  );
}

function EmptyDetailState({ text }: { text: string }) {
  return <div className='px-3 py-4 text-sm text-foreground/45'>{text}</div>;
}

function createPerformanceMetrics(logs: Log[]) {
  const totalRequests = logs.length;
  const errorCount = logs.filter((log) => log.statusCode >= 400).length;
  const successCount = totalRequests - errorCount;
  const totalDuration = logs.reduce((total, log) => total + log.durationMs, 0);
  const averageDuration = totalRequests
    ? Math.round(totalDuration / totalRequests)
    : 0;
  const successRate = totalRequests
    ? Math.round((successCount / totalRequests) * 100)
    : 0;

  return {
    averageLatency: formatDuration(averageDuration),
    errors: String(errorCount),
    requests: String(totalRequests),
    successRate: `${successRate}%`,
  };
}

function createCommunicationSummary(logs: Log[]) {
  const protocols = getUniqueValues(logs.map((log) => log.protocol)).join(', ');
  const callers = getUniqueValues(logs.map((log) => log.callerIntegrationId));
  const rootRequests = logs.filter((log) => log.parentSpanId === null).length;

  return {
    callers: String(callers.length),
    protocols: protocols || EMPTY_VALUE,
    rootRequests: String(rootRequests),
  };
}

function getSlowestLogs(logs: Log[]) {
  return logs
    .toSorted((left, right) => right.durationMs - left.durationMs)
    .slice(0, SLOW_REQUEST_COUNT);
}

function getTopEndpoints(logs: Log[]) {
  const endpointCounts = new Map<string, { count: number; label: string }>();

  logs.forEach((log) => {
    const key = `${log.method}:${log.path}`;
    const current = endpointCounts.get(key);

    endpointCounts.set(key, {
      count: (current?.count ?? 0) + 1,
      label: `${log.method} ${log.path}`,
    });
  });

  return [...endpointCounts.entries()]
    .map(([key, value]) => ({ key, ...value }))
    .sort((left, right) => right.count - left.count)
    .slice(0, TOP_ENDPOINT_COUNT);
}

function getUniqueValues(values: Array<string | null>) {
  return [
    ...new Set(values.filter((value): value is string => Boolean(value))),
  ];
}

function formatDuration(durationMs: number) {
  return `${durationMs} ms`;
}
