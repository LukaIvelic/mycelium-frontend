import { type FormEvent, useEffect, useState } from 'react';
import type { PerformanceSettings } from '@/api/services/project/project-service.types';
import { useProjects } from '@/hooks/use-projects.hook';
import {
  type FormMessage,
  FormStatus,
  NumberField,
  ReadOnlyNote,
  SaveResetActions,
  SettingsCard,
  ToggleField,
  WorkspaceEmptyState,
} from '../../form-controls';
import { useCanManageProject } from '../../use-can-manage-project';
import type { WorkspaceProjectSettingsProps } from '../../workspace-settings.types';

type PerformanceSettingsForm = Omit<
  PerformanceSettings,
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

export function AlertConfiguration({
  isLoading,
  selectedProject,
}: WorkspaceProjectSettingsProps) {
  const [form, setForm] = useState<PerformanceSettingsForm>(
    fallbackPerformanceSettings,
  );
  const [message, setMessage] = useState<FormMessage | null>(null);
  const {
    useProjectPerformanceSettings,
    useResetProjectPerformanceSettings,
    useUpdateProjectPerformanceSettings,
  } = useProjects();
  const { canManage } = useCanManageProject(selectedProject?.id);
  const { data, isLoading: isSettingsLoading } = useProjectPerformanceSettings(
    selectedProject?.id,
  );
  const updateSettings = useUpdateProjectPerformanceSettings(
    selectedProject?.id ?? '',
  );
  const resetSettings = useResetProjectPerformanceSettings(
    selectedProject?.id ?? '',
  );

  useEffect(() => {
    setForm(toPerformanceSettingsForm(data));
    setMessage(null);
  }, [data]);

  if (!selectedProject) {
    return <WorkspaceEmptyState isLoading={isLoading} />;
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
    <form className='grid gap-6' onSubmit={handleSubmit}>
      <SettingsCard
        title='Performance'
        description='Thresholds used for workspace request notifications.'
        action={
          <SaveResetActions
            canManage={canManage}
            isPending={
              updateSettings.isPending ||
              resetSettings.isPending ||
              isSettingsLoading
            }
            onReset={handleReset}
          />
        }
      >
        <div className='grid gap-5'>
          <div className='grid gap-1 divide-y divide-foreground/10'>
            <ToggleField
              label='Capture metrics'
              description='Enable SDK runtime performance observers.'
              checked={form.captureMetrics}
              disabled={!canManage}
              onChange={(checked) => updateForm('captureMetrics', checked)}
            />
            <ToggleField
              label='Slow request alerts'
              description='Notify members when request duration crosses the threshold.'
              checked={form.notifyOnSlowRequests}
              disabled={!canManage}
              onChange={(checked) =>
                updateForm('notifyOnSlowRequests', checked)
              }
            />
            <ToggleField
              label='Failed request alerts'
              description='Notify members for warning and critical status codes.'
              checked={form.notifyOnFailedRequests}
              disabled={!canManage}
              onChange={(checked) =>
                updateForm('notifyOnFailedRequests', checked)
              }
            />
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
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
        </div>
        <FormStatus message={message} />
        <ReadOnlyNote canManage={canManage} />
      </SettingsCard>
    </form>
  );
}
