import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import type { ProjectRegionSettings } from '@/api/services/project/project-service.types';
import { Button } from '@/components/ui/button/button';
import { useProjects } from '@/hooks/use-projects.hook';
import { cn } from '@/lib/utils';
import {
  type FormMessage,
  FormStatus,
  ReadOnlyNote,
  WorkspaceEmptyState,
} from '../../form-controls';
import { useCanManageProject } from '../../use-can-manage-project';
import type { WorkspaceProjectSettingsProps } from '../../workspace-settings.types';

type ProjectRegionSettingsForm = Omit<
  ProjectRegionSettings,
  'createdAt' | 'projectId' | 'updatedAt'
>;

const primaryRegionOptions = [
  'EU Central',
  'EU West',
  'US East',
  'US West',
  'Asia Pacific',
];

const dataResidencyOptions = [
  'European Union',
  'United States',
  'Canada',
  'Australia',
  'Global',
];

const failoverRegionOptions = [
  'EU West',
  'EU Central',
  'US East',
  'US West',
  'Asia Pacific',
];

const timezoneOptions = [
  'UTC',
  'Europe/Zagreb',
  'Europe/Berlin',
  'Europe/London',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
];

const dateFormatOptions = [
  'DD/MM/YYYY',
  'MM/DD/YYYY',
  'YYYY-MM-DD',
  'DD.MM.YYYY',
  'MMM D, YYYY',
];

const selectClass = cn(
  'h-8 rounded-md border border-foreground/10 bg-[#1d1d1d] px-2.5 text-sm text-foreground',
  'outline-none focus:border-foreground/20 disabled:pointer-events-none disabled:opacity-50',
);

const fallbackRegionSettings: ProjectRegionSettingsForm = {
  primaryRegion: 'EU Central',
  dataResidency: 'European Union',
  failoverRegion: 'EU West',
  timezone: 'Europe/Zagreb',
  dateFormat: 'DD/MM/YYYY',
};

function toRegionSettingsForm(
  settings: ProjectRegionSettings | undefined,
): ProjectRegionSettingsForm {
  return {
    primaryRegion:
      settings?.primaryRegion ?? fallbackRegionSettings.primaryRegion,
    dataResidency:
      settings?.dataResidency ?? fallbackRegionSettings.dataResidency,
    failoverRegion:
      settings?.failoverRegion ?? fallbackRegionSettings.failoverRegion,
    timezone: settings?.timezone ?? fallbackRegionSettings.timezone,
    dateFormat: settings?.dateFormat ?? fallbackRegionSettings.dateFormat,
  };
}

function optionsWithValue(options: string[], value: string) {
  return options.includes(value) ? options : [value, ...options];
}

export function RegionLocalization({
  isLoading,
  selectedProject,
}: WorkspaceProjectSettingsProps) {
  const [form, setForm] = useState<ProjectRegionSettingsForm>(
    fallbackRegionSettings,
  );
  const [message, setMessage] = useState<FormMessage | null>(null);
  const {
    useProjectRegionSettings,
    useResetProjectRegionSettings,
    useUpdateProjectRegionSettings,
  } = useProjects();
  const { canManage } = useCanManageProject(selectedProject?.id);
  const { data, isLoading: isSettingsLoading } = useProjectRegionSettings(
    selectedProject?.id,
  );
  const updateSettings = useUpdateProjectRegionSettings(
    selectedProject?.id ?? '',
  );
  const resetSettings = useResetProjectRegionSettings(
    selectedProject?.id ?? '',
  );
  const isPending =
    updateSettings.isPending || resetSettings.isPending || isSettingsLoading;

  useEffect(() => {
    setForm(toRegionSettingsForm(data));
    setMessage(null);
  }, [data]);

  if (!selectedProject) {
    return <WorkspaceEmptyState isLoading={isLoading} />;
  }

  function updateForm<K extends keyof ProjectRegionSettingsForm>(
    key: K,
    value: ProjectRegionSettingsForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    try {
      await updateSettings.mutateAsync(form);
      setMessage({ tone: 'success', text: 'Region settings saved.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to save region settings.',
      });
    }
  }

  async function handleReset() {
    setMessage(null);

    try {
      await resetSettings.mutateAsync();
      setMessage({ tone: 'success', text: 'Region settings reset.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to reset region settings.',
      });
    }
  }

  return (
    <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit}>
      <SettingsSection
        title='Workspace Region'
        description='Default placement and residency settings used when new workspace resources are created.'
      >
        <SettingsRow
          label='Primary region'
          description='Preferred region for new project infrastructure.'
        >
          <SelectValue
            value={form.primaryRegion}
            options={optionsWithValue(primaryRegionOptions, form.primaryRegion)}
            disabled={!canManage || isPending}
            onChange={(value) => updateForm('primaryRegion', value)}
          />
        </SettingsRow>
        <SettingsRow
          label='Data residency'
          description='Regional boundary used for retained workspace data.'
        >
          <SelectValue
            value={form.dataResidency}
            options={optionsWithValue(dataResidencyOptions, form.dataResidency)}
            disabled={!canManage || isPending}
            onChange={(value) => updateForm('dataResidency', value)}
          />
        </SettingsRow>
        <SettingsRow
          label='Failover region'
          description='Secondary location reserved for future failover support.'
        >
          <SelectValue
            value={form.failoverRegion}
            options={optionsWithValue(
              failoverRegionOptions,
              form.failoverRegion,
            )}
            disabled={!canManage || isPending}
            onChange={(value) => updateForm('failoverRegion', value)}
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title='Localization'
        description='Display preferences for dates, times, and workspace language.'
      >
        <SettingsRow
          label='Timezone'
          description='Used for logs, alerts, and generated reports.'
        >
          <SelectValue
            value={form.timezone}
            options={optionsWithValue(timezoneOptions, form.timezone)}
            disabled={!canManage || isPending}
            onChange={(value) => updateForm('timezone', value)}
          />
        </SettingsRow>
        <SettingsRow
          label='Date format'
          description='Default format shown across the console.'
        >
          <SelectValue
            value={form.dateFormat}
            options={optionsWithValue(dateFormatOptions, form.dateFormat)}
            disabled={!canManage || isPending}
            onChange={(value) => updateForm('dateFormat', value)}
          />
        </SettingsRow>
        <SettingsRow
          label='Language'
          description='Primary language for the workspace interface.'
          status='Locked'
        >
          English
        </SettingsRow>
        <SettingsRow
          label='Preference changes'
          description='Save or restore region and localization settings.'
        >
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              disabled={!canManage || isPending}
              onClick={handleReset}
              className='border border-foreground/10 text-foreground/60'
            >
              Reset
            </Button>
            <Button type='submit' size='sm' disabled={!canManage || isPending}>
              Save
            </Button>
          </div>
        </SettingsRow>
      </SettingsSection>

      <FormStatus message={message} />
      <ReadOnlyNote canManage={canManage} />
    </form>
  );
}

function SelectValue({
  disabled,
  onChange,
  options,
  value,
}: {
  disabled?: boolean;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      className={cn('w-44', selectClass)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function SettingsSection({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section
      className={cn(
        'w-full rounded-md border border-foreground/10 bg-background',
        'px-8 py-6',
      )}
    >
      <div className='mb-6'>
        <h2 className='font-medium'>{title}</h2>
        <p className='mt-1 text-sm text-foreground/50'>{description}</p>
      </div>
      <div className='flex flex-col divide-y divide-foreground/10'>
        {children}
      </div>
    </section>
  );
}

function SettingsRow({
  children,
  description,
  label,
  status,
}: {
  children: ReactNode;
  description: string;
  label: string;
  status?: string;
}) {
  return (
    <div className='grid grid-cols-1 gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8'>
      <div>
        <p className='text-sm font-medium'>{label}</p>
        <p className='mt-1 text-sm text-foreground/50'>{description}</p>
      </div>
      <div className='flex items-center gap-3 text-sm md:justify-end'>
        {status && (
          <span className='rounded-sm border border-foreground/10 px-2 py-1 text-foreground/50'>
            {status}
          </span>
        )}
        <div className='font-medium text-foreground'>{children}</div>
      </div>
    </div>
  );
}
