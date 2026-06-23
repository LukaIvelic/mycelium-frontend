import { useParams } from 'next/navigation';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type {
  CommunicationSettings,
  HeaderFilterLevel,
  PerformanceSettings,
} from '@/api/services/project/project-service.types';
import type { Service } from '@/api/services/services/services-service.types';
import { Truncate } from '@/components/features/truncate/truncate';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { Switch } from '@/components/ui/switch/switch';
import { Textarea } from '@/components/ui/textarea/textarea';
import { useLogs } from '@/hooks/use-logs.hook';
import { useProjects } from '@/hooks/use-projects.hook';
import { useServices } from '@/hooks/use-services.hook';
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
  integrationId: string;
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
  onChange?: (checked: boolean) => void;
}

interface FieldProps {
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

type FormMessage = {
  tone: 'error' | 'success';
  text: string;
};

type PerformanceSettingsForm = Omit<
  PerformanceSettings,
  'createdAt' | 'integrationId' | 'projectId' | 'updatedAt'
>;

type CommunicationSettingsForm = Omit<
  CommunicationSettings,
  'createdAt' | 'integrationId' | 'projectId' | 'updatedAt'
>;

const fallbackPerformanceSettings: PerformanceSettingsForm = {
  captureMetrics: false,
  slowRequestThresholdMs: 1000,
  notifyOnSlowRequests: true,
  notifyOnFailedRequests: true,
  warningStatusCode: 400,
  criticalStatusCode: 500,
};

const fallbackCommunicationSettings: CommunicationSettingsForm = {
  subscribeToFetch: false,
  subscribeToHttp: false,
  captureBody: false,
  bodyMaxBytes: 0,
  captureStreamBodies: false,
  headerFilterLevel: 'HIGH',
};

function toPerformanceSettingsForm(
  settings: PerformanceSettings | undefined,
): PerformanceSettingsForm {
  return {
    captureMetrics:
      settings?.captureMetrics ?? fallbackPerformanceSettings.captureMetrics,
    slowRequestThresholdMs:
      settings?.slowRequestThresholdMs ??
      fallbackPerformanceSettings.slowRequestThresholdMs,
    notifyOnSlowRequests:
      settings?.notifyOnSlowRequests ??
      fallbackPerformanceSettings.notifyOnSlowRequests,
    notifyOnFailedRequests:
      settings?.notifyOnFailedRequests ??
      fallbackPerformanceSettings.notifyOnFailedRequests,
    warningStatusCode:
      settings?.warningStatusCode ??
      fallbackPerformanceSettings.warningStatusCode,
    criticalStatusCode:
      settings?.criticalStatusCode ??
      fallbackPerformanceSettings.criticalStatusCode,
  };
}

function toCommunicationSettingsForm(
  settings: CommunicationSettings | undefined,
): CommunicationSettingsForm {
  return {
    subscribeToFetch:
      settings?.subscribeToFetch ??
      fallbackCommunicationSettings.subscribeToFetch,
    subscribeToHttp:
      settings?.subscribeToHttp ??
      fallbackCommunicationSettings.subscribeToHttp,
    captureBody:
      settings?.captureBody ?? fallbackCommunicationSettings.captureBody,
    bodyMaxBytes:
      settings?.bodyMaxBytes ?? fallbackCommunicationSettings.bodyMaxBytes,
    captureStreamBodies:
      settings?.captureStreamBodies ??
      fallbackCommunicationSettings.captureStreamBodies,
    headerFilterLevel:
      settings?.headerFilterLevel ??
      fallbackCommunicationSettings.headerFilterLevel,
  };
}

const headerFilterLevels: HeaderFilterLevel[] = [
  'HIGH',
  'MEDIUM',
  'METADATA',
  'ALL',
];

export function GeneralSettings({
  integrationId,
  service,
  isLoading,
}: GeneralSettingsProps) {
  const canManage = useCanManageService();
  const { useUpdateService } = useServices();
  const updateService = useUpdateService(integrationId);
  const [message, setMessage] = useState<FormMessage | null>(null);
  const [form, setForm] = useState({
    description: '',
    key: '',
    name: '',
    origin: '',
    repository: '',
    version: '',
  });

  useEffect(() => {
    setForm({
      description: service?.description ?? '',
      key: service?.key ?? '',
      name: service?.name ?? '',
      origin: service?.origin ?? '',
      repository: service?.repository ?? '',
      version: service?.version ?? '',
    });
    setMessage(null);
  }, [service]);

  if (isLoading) {
    return <Skeleton className='h-72 w-full' />;
  }

  function updateForm(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!form.origin.trim()) {
      setMessage({ tone: 'error', text: 'Origin is required.' });
      return;
    }

    try {
      await updateService.mutateAsync({
        description: form.description.trim() || null,
        key: form.key.trim() || null,
        name: form.name.trim() || null,
        origin: form.origin.trim(),
        repository: form.repository.trim() || null,
        version: form.version.trim() || null,
      });
      setMessage({ tone: 'success', text: 'Service saved.' });
    } catch {
      setMessage({ tone: 'error', text: 'Unable to save service.' });
    }
  }

  return (
    <Section title='General'>
      <form className='grid gap-4' onSubmit={handleSubmit}>
        <div className='flex justify-end'>
          <Button
            type='submit'
            size='sm'
            disabled={!canManage || updateService.isPending}
          >
            Save
          </Button>
        </div>
        <div className='grid gap-4'>
          <Field
            label='Display name'
            value={form.name}
            placeholder='Service name'
            disabled={!canManage}
            onChange={(value) => updateForm('name', value)}
          />
          <Field
            label='Service key'
            value={form.key}
            placeholder='service-key'
            disabled={!canManage}
            onChange={(value) => updateForm('key', value)}
          />
          <Field
            label='Version'
            value={form.version}
            placeholder='1.0.0'
            disabled={!canManage}
            onChange={(value) => updateForm('version', value)}
          />
          <Field
            label='Origin'
            value={form.origin}
            placeholder='https://service.internal'
            disabled={!canManage}
            onChange={(value) => updateForm('origin', value)}
          />
          <Field
            label='Repository'
            value={form.repository}
            placeholder='https://github.com/org/repo'
            disabled={!canManage}
            onChange={(value) => updateForm('repository', value)}
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
              value={form.description}
              placeholder='Short description of this service'
              disabled={!canManage}
              onChange={(event) =>
                updateForm('description', event.target.value)
              }
              className={cn('min-h-20 resize-none', FIELD_CLASS)}
            />
          </div>
        </div>
        <FormStatus message={message} />
        {!canManage && <ReadOnlyNote />}
      </form>
    </Section>
  );
}

export function PerformanceMetrics({ integrationId }: IntegrationLogsProps) {
  const { useLogsByIntegration } = useLogs();
  const {
    useResetServicePerformanceSettings,
    useServicePerformanceSettings,
    useUpdateServicePerformanceSettings,
  } = useServices();
  const { data: logsData, isFetching } = useLogsByIntegration(integrationId, {
    limit: DETAIL_LOG_LIMIT,
  });
  const canManage = useCanManageService();
  const { data: settings } = useServicePerformanceSettings(integrationId);
  const updateSettings = useUpdateServicePerformanceSettings(integrationId);
  const resetSettings = useResetServicePerformanceSettings(integrationId);
  const [form, setForm] = useState<PerformanceSettingsForm>(
    fallbackPerformanceSettings,
  );
  const [message, setMessage] = useState<FormMessage | null>(null);
  const logs = useMemo(() => logsData ?? [], [logsData]);
  const metrics = useMemo(() => createPerformanceMetrics(logs), [logs]);
  const slowestLogs = useMemo(() => getSlowestLogs(logs), [logs]);

  useEffect(() => {
    setForm(toPerformanceSettingsForm(settings));
    setMessage(null);
  }, [settings]);

  if (isFetching && !logs.length) {
    return <Skeleton className='h-72 w-full' />;
  }

  function updateForm<K extends keyof PerformanceSettingsForm>(
    key: K,
    value: PerformanceSettingsForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (form.warningStatusCode > form.criticalStatusCode) {
      setMessage({
        tone: 'error',
        text: 'Warning status must be below critical status.',
      });
      return;
    }

    try {
      await updateSettings.mutateAsync(form);
      setMessage({ tone: 'success', text: 'Performance settings saved.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to save performance settings.',
      });
    }
  }

  async function handleReset() {
    setMessage(null);

    try {
      await resetSettings.mutateAsync();
      setMessage({ tone: 'success', text: 'Performance settings reset.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to reset performance settings.',
      });
    }
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

      <Section
        title='Settings'
        action={
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              disabled={!canManage || resetSettings.isPending}
              onClick={handleReset}
              className='border border-foreground/10 text-foreground/60'
            >
              Reset
            </Button>
            <Button
              type='submit'
              form='service-performance-settings-form'
              size='sm'
              disabled={!canManage || updateSettings.isPending}
            >
              Save
            </Button>
          </div>
        }
      >
        <form
          id='service-performance-settings-form'
          className='grid gap-4'
          onSubmit={handleSubmit}
        >
          <Rows>
            <ToggleRow
              label='Capture metrics'
              description='Enable SDK runtime performance observers'
              checked={form.captureMetrics}
              disabled={!canManage}
              onChange={(checked) => updateForm('captureMetrics', checked)}
            />
            <ToggleRow
              label='Slow request alerts'
              description='Notify members when this service crosses its threshold'
              checked={form.notifyOnSlowRequests}
              disabled={!canManage}
              onChange={(checked) =>
                updateForm('notifyOnSlowRequests', checked)
              }
            />
            <ToggleRow
              label='Failed request alerts'
              description='Notify members for warning and critical responses'
              checked={form.notifyOnFailedRequests}
              disabled={!canManage}
              onChange={(checked) =>
                updateForm('notifyOnFailedRequests', checked)
              }
            />
          </Rows>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
            <NumberField
              label='Slow threshold ms'
              value={form.slowRequestThresholdMs}
              min={0}
              disabled={!canManage}
              onChange={(value) => updateForm('slowRequestThresholdMs', value)}
            />
            <NumberField
              label='Warning status'
              value={form.warningStatusCode}
              min={100}
              max={599}
              disabled={!canManage}
              onChange={(value) => updateForm('warningStatusCode', value)}
            />
            <NumberField
              label='Critical status'
              value={form.criticalStatusCode}
              min={100}
              max={599}
              disabled={!canManage}
              onChange={(value) => updateForm('criticalStatusCode', value)}
            />
          </div>
        </form>
        <FormStatus message={message} />
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
  const {
    useResetServiceCommunicationSettings,
    useServiceCommunicationSettings,
    useUpdateServiceCommunicationSettings,
  } = useServices();
  const { data: logsData, isFetching } = useLogsByIntegration(integrationId, {
    limit: DETAIL_LOG_LIMIT,
  });
  const canManage = useCanManageService();
  const { data: settings } = useServiceCommunicationSettings(integrationId);
  const updateSettings = useUpdateServiceCommunicationSettings(integrationId);
  const resetSettings = useResetServiceCommunicationSettings(integrationId);
  const [form, setForm] = useState<CommunicationSettingsForm>(
    fallbackCommunicationSettings,
  );
  const [message, setMessage] = useState<FormMessage | null>(null);
  const logs = useMemo(() => logsData ?? [], [logsData]);
  const summary = useMemo(() => createCommunicationSummary(logs), [logs]);
  const topEndpoints = useMemo(() => getTopEndpoints(logs), [logs]);

  useEffect(() => {
    setForm(toCommunicationSettingsForm(settings));
    setMessage(null);
  }, [settings]);

  if (isFetching && !logs.length) {
    return <Skeleton className='h-72 w-full' />;
  }

  function updateForm<K extends keyof CommunicationSettingsForm>(
    key: K,
    value: CommunicationSettingsForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    try {
      await updateSettings.mutateAsync(form);
      setMessage({ tone: 'success', text: 'Communication settings saved.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to save communication settings.',
      });
    }
  }

  async function handleReset() {
    setMessage(null);

    try {
      await resetSettings.mutateAsync();
      setMessage({ tone: 'success', text: 'Communication settings reset.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to reset communication settings.',
      });
    }
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

      <Section
        title='Capture policy'
        action={
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              disabled={!canManage || resetSettings.isPending}
              onClick={handleReset}
              className='border border-foreground/10 text-foreground/60'
            >
              Reset
            </Button>
            <Button
              type='submit'
              form='service-communication-settings-form'
              size='sm'
              disabled={!canManage || updateSettings.isPending}
            >
              Save
            </Button>
          </div>
        }
      >
        <form
          id='service-communication-settings-form'
          className='grid gap-4'
          onSubmit={handleSubmit}
        >
          <Rows>
            <ToggleRow
              label='Fetch instrumentation'
              description='Capture Node fetch and undici traffic'
              checked={form.subscribeToFetch}
              disabled={!canManage}
              onChange={(checked) => updateForm('subscribeToFetch', checked)}
            />
            <ToggleRow
              label='HTTP instrumentation'
              description='Capture Node http and https traffic'
              checked={form.subscribeToHttp}
              disabled={!canManage}
              onChange={(checked) => updateForm('subscribeToHttp', checked)}
            />
            <ToggleRow
              label='Capture bodies'
              description='Store request body samples up to the byte limit'
              checked={form.captureBody}
              disabled={!canManage}
              onChange={(checked) => updateForm('captureBody', checked)}
            />
            <ToggleRow
              label='Stream bodies'
              description='Allow stream bodies to be copied before truncation'
              checked={form.captureStreamBodies}
              disabled={!canManage}
              onChange={(checked) => updateForm('captureStreamBodies', checked)}
            />
          </Rows>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <NumberField
              label='Body max bytes'
              value={form.bodyMaxBytes}
              min={0}
              disabled={!canManage || !form.captureBody}
              onChange={(value) => updateForm('bodyMaxBytes', value)}
            />
            <SelectField
              label='Header filter'
              value={form.headerFilterLevel}
              options={headerFilterLevels}
              disabled={!canManage}
              onChange={(value) => updateForm('headerFilterLevel', value)}
            />
          </div>
        </form>
        <FormStatus message={message} />
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

function ToggleRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: ToggleRowProps) {
  return (
    <div className='flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0'>
      <div className='min-w-0'>
        <div className='text-sm text-foreground/80'>{label}</div>
        <div className='mt-0.5 text-xs text-foreground/45'>{description}</div>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        className={cn(disabled && 'cursor-not-allowed opacity-50')}
      />
    </div>
  );
}

function Field({ label, value, placeholder, disabled, onChange }: FieldProps) {
  const inputId = `service-detail-${label.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <div className='grid gap-1.5'>
      <label htmlFor={inputId} className='text-sm text-foreground/50'>
        {label}
      </label>
      <Input
        id={inputId}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={FIELD_CLASS}
      />
    </div>
  );
}

function NumberField({
  disabled,
  label,
  max,
  min,
  onChange,
  value,
}: {
  disabled?: boolean;
  label: string;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  value: number;
}) {
  const inputId = `service-detail-${label.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <div className='grid gap-1.5'>
      <label htmlFor={inputId} className='text-sm text-foreground/50'>
        {label}
      </label>
      <Input
        id={inputId}
        type='number'
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(event) => {
          const numeric = Number(event.target.value);
          if (Number.isNaN(numeric)) return;
          const nextMin = min ?? numeric;
          const nextMax = max ?? numeric;
          onChange(Math.min(Math.max(numeric, nextMin), nextMax));
        }}
        className={FIELD_CLASS}
      />
    </div>
  );
}

function SelectField<T extends string>({
  disabled,
  label,
  onChange,
  options,
  value,
}: {
  disabled?: boolean;
  label: string;
  onChange: (value: T) => void;
  options: T[];
  value: T;
}) {
  const inputId = `service-detail-${label.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <div className='grid gap-1.5'>
      <label htmlFor={inputId} className='text-sm text-foreground/50'>
        {label}
      </label>
      <select
        id={inputId}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as T)}
        className={cn(
          'h-8 w-full rounded-sm border border-foreground/10 bg-transparent px-2.5 text-sm text-foreground outline-none',
          'focus:border-foreground/20 disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function FormStatus({ message }: { message: FormMessage | null }) {
  if (!message) return null;

  return (
    <p
      className={cn(
        'text-sm',
        message.tone === 'error' ? 'text-red-300' : 'text-emerald-300',
      )}
    >
      {message.text}
    </p>
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
