import { useParams } from 'next/navigation';
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
import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { statusCodeColor } from '@/lib/status-code';
import type { Log } from '@/lib/types/log';
import { cn } from '@/lib/utils';

const DETAIL_LOG_LIMIT = 100;
const EMPTY_VALUE = 'Not set';
const SLOW_REQUEST_COUNT = 3;
const TOP_ENDPOINT_COUNT = 4;

const FIELD_CLASS = cn(
  'rounded-sm border-foreground/10 bg-transparent',
  'outline-none focus-visible:ring-0 focus-visible:border-foreground/20',
  'placeholder:text-foreground/30',
);

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

interface SectionProps {
  action?: ReactNode;
  children: ReactNode;
  title: string;
}

interface RowProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}

interface ToggleRowProps {
  checked?: boolean;
  description: string;
  disabled?: boolean;
  label: string;
}

interface FieldProps {
  disabled?: boolean;
  label: string;
  placeholder?: string;
  value?: string | null;
}

export function GeneralSettings({ service, isLoading }: GeneralSettingsProps) {
  const canManage = useCanManageService();

  if (isLoading) {
    return <Skeleton className='h-72 w-full' />;
  }

  return (
    <Section
      title='General'
      action={
        <Button
          type='button'
          variant='ghost'
          size='sm'
          disabled={!canManage}
          className='border border-foreground/10 text-foreground/70'
        >
          Save changes
        </Button>
      }
    >
      <div className='grid gap-4'>
        <Field
          label='Display name'
          value={service?.name}
          placeholder='Service name'
          disabled={!canManage}
        />
        <Field
          label='Service key'
          value={service?.key}
          placeholder='service-key'
          disabled={!canManage}
        />
        <Field
          label='Version'
          value={service?.version}
          placeholder='1.0.0'
          disabled={!canManage}
        />
        <Field
          label='Origin'
          value={service?.origin}
          placeholder='https://service.internal'
          disabled={!canManage}
        />
        <Field
          label='Repository'
          value={service?.repository}
          placeholder='https://github.com/org/repo'
          disabled={!canManage}
        />
        <div className='grid gap-1.5'>
          <label
            htmlFor='service-detail-description'
            className='text-sm text-foreground/50'
          >
            Description
          </label>
          <Textarea
            id='service-detail-description'
            defaultValue={service?.description ?? ''}
            placeholder='Short description of this service'
            disabled={!canManage}
            className={cn('min-h-20 resize-none', FIELD_CLASS)}
          />
        </div>
      </div>
      {!canManage && <ReadOnlyNote />}
    </Section>
  );
}

export function PerformanceMetrics({ integrationId }: IntegrationLogsProps) {
  const { useLogsByIntegration } = useLogs();
  const { data: logsData, isFetching } = useLogsByIntegration(integrationId, {
    limit: DETAIL_LOG_LIMIT,
  });
  const canManage = useCanManageService();
  const logs = useMemo(() => logsData ?? [], [logsData]);
  const metrics = useMemo(() => createPerformanceMetrics(logs), [logs]);
  const slowestLogs = useMemo(() => getSlowestLogs(logs), [logs]);

  if (isFetching && !logs.length) {
    return <Skeleton className='h-72 w-full' />;
  }

  return (
    <div className='grid gap-3'>
      <Section title='Overview'>
        <Rows>
          <Row label='Request volume' value={metrics.requests} />
          <Row label='Average latency' value={metrics.averageLatency} />
          <Row
            label='Success rate'
            value={metrics.successRate}
            valueClassName='text-emerald-300'
          />
          <Row
            label='Errors'
            value={metrics.errors}
            valueClassName='text-red-300'
          />
        </Rows>
      </Section>

      <Section title='Latency budget'>
        <div className='grid gap-4'>
          <Field
            label='Target p95'
            placeholder='300 ms'
            disabled={!canManage}
          />
          <Field
            label='Alert after'
            placeholder='800 ms'
            disabled={!canManage}
          />
          <Field
            label='Burn window'
            placeholder='30 min'
            disabled={!canManage}
          />
          <Rows>
            <ToggleRow
              label='Regression guard'
              description='Block deploys when latency increases sharply'
              checked
              disabled={!canManage}
            />
            <ToggleRow
              label='Auto-baseline'
              description='Recompute service baseline from recent traffic'
              checked
              disabled={!canManage}
            />
          </Rows>
        </div>
        {!canManage && <ReadOnlyNote />}
      </Section>

      <Section title='Health checks'>
        <Rows>
          <Row label='Synthetic probe' value='GET /health · every 60s' />
          <Row label='Apdex target' value='0.95' />
          <Row label='Error budget' value='99.9% · 30 day window' />
        </Rows>
      </Section>

      <Section title='Slow requests'>
        {slowestLogs.length ? (
          <Rows>
            {slowestLogs.map((log) => (
              <RequestRow
                key={log.id}
                status={String(log.statusCode)}
                statusClassName={statusCodeColor(log.statusCode)}
                label={`${log.method} ${log.path}`}
                value={formatDuration(log.durationMs)}
              />
            ))}
          </Rows>
        ) : (
          <EmptyState text='No slow requests recorded.' />
        )}
      </Section>
    </div>
  );
}

export function Communication({ integrationId, service }: CommunicationProps) {
  const { useLogsByIntegration } = useLogs();
  const { data: logsData, isFetching } = useLogsByIntegration(integrationId, {
    limit: DETAIL_LOG_LIMIT,
  });
  const canManage = useCanManageService();
  const logs = useMemo(() => logsData ?? [], [logsData]);
  const summary = useMemo(() => createCommunicationSummary(logs), [logs]);
  const topEndpoints = useMemo(() => getTopEndpoints(logs), [logs]);

  if (isFetching && !logs.length) {
    return <Skeleton className='h-72 w-full' />;
  }

  return (
    <div className='grid gap-3'>
      <Section title='Ingress'>
        <Rows>
          <Row label='Public origin' value={service?.origin ?? EMPTY_VALUE} />
          <Row label='Protocols' value={summary.protocols} />
          <Row label='Auth policy' value='JWT required' />
          <Row label='mTLS' value='Enforced' />
        </Rows>
      </Section>

      <Section title='Outbound policy'>
        <Rows>
          <ToggleRow
            label='Dependency allowlist'
            description='Reject calls to unknown services'
            checked
            disabled={!canManage}
          />
          <ToggleRow
            label='Contract checks'
            description='Compare observed payloads against saved contracts'
            checked
            disabled={!canManage}
          />
          <ToggleRow
            label='Circuit breaker'
            description='Trip after repeated upstream failures'
            disabled={!canManage}
          />
        </Rows>
        {!canManage && <ReadOnlyNote />}
      </Section>

      <Section title='Traffic shape'>
        <Rows>
          <Row label='Observed callers' value={summary.callers} />
          <Row label='Root requests' value={summary.rootRequests} />
          <Row label='Retry policy' value='2 retries, 150 ms backoff' />
          <Row label='Timeout' value='5 seconds' />
        </Rows>
      </Section>

      <Section title='Top endpoints'>
        {topEndpoints.length ? (
          <Rows>
            {topEndpoints.map(({ key, label, count }) => (
              <RequestRow key={key} label={label} value={`${count} calls`} />
            ))}
          </Rows>
        ) : (
          <EmptyState text='No endpoints observed.' />
        )}
      </Section>

      <Section title='Planned dependencies'>
        <Rows>
          <Row label='Billing API' value='Optional · Outbound REST' />
          <Row label='Event gateway' value='Required · Async publish' />
          <Row label='Contract version' value='v1.3 · Pinned' />
        </Rows>
      </Section>
    </div>
  );
}

function Section({ title, action, children }: SectionProps) {
  return (
    <section className='rounded-md border border-foreground/10 px-4 py-4'>
      <div className='mb-3 flex items-center justify-between gap-3'>
        <h3 className='text-sm font-medium text-foreground/80'>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function Rows({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col divide-y divide-foreground/10'>
      {children}
    </div>
  );
}

function Row({ label, value, valueClassName }: RowProps) {
  return (
    <div className='flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0'>
      <span className='text-sm text-foreground/50'>{label}</span>
      <span
        className={cn(
          'min-w-0 text-right text-sm text-foreground/80',
          valueClassName,
        )}
      >
        {value}
      </span>
    </div>
  );
}

function RequestRow({
  status,
  statusClassName,
  label,
  value,
}: {
  status?: string;
  statusClassName?: string;
  label: string;
  value: string;
}) {
  return (
    <div className='flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0'>
      <span className='min-w-0 text-sm text-foreground/80'>
        {status && (
          <span className={cn('mr-1.5', statusClassName)}>{status}</span>
        )}
        <Truncate text={label} max={40} />
      </span>
      <span className='shrink-0 text-sm text-foreground/50'>{value}</span>
    </div>
  );
}

function ToggleRow({ label, description, checked, disabled }: ToggleRowProps) {
  return (
    <div className='flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0'>
      <div className='min-w-0'>
        <div className='text-sm text-foreground/80'>{label}</div>
        <div className='mt-0.5 text-xs text-foreground/45'>{description}</div>
      </div>
      <Switch
        defaultChecked={checked}
        disabled={disabled}
        className={cn(disabled && 'cursor-not-allowed opacity-50')}
      />
    </div>
  );
}

function Field({ label, value, placeholder, disabled }: FieldProps) {
  const inputId = `service-detail-${label.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <div className='grid gap-1.5'>
      <label htmlFor={inputId} className='text-sm text-foreground/50'>
        {label}
      </label>
      <Input
        id={inputId}
        defaultValue={value ?? ''}
        placeholder={placeholder}
        disabled={disabled}
        className={FIELD_CLASS}
      />
    </div>
  );
}

function ReadOnlyNote() {
  return (
    <p className='mt-3 text-xs text-foreground/40'>
      Owner or admin access is required to edit these settings.
    </p>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className='text-sm text-foreground/45'>{text}</p>;
}

function useCanManageService(): boolean {
  const params = useParams();
  const projectId = typeof params?.id === 'string' ? params.id : '';
  const { useMe } = useUsers();
  const { useProjectMembers } = useProjects();
  const { data: user } = useMe();
  const { data: members } = useProjectMembers(projectId || undefined);
  const role = members?.find((member) => member.userId === user?.id)?.role;

  return role === 'owner' || role === 'admin';
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
