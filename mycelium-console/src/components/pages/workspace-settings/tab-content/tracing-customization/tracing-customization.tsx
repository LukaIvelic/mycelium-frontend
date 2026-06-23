import { type FormEvent, useEffect, useState } from 'react';
import type {
  CommunicationSettings,
  HeaderFilterLevel,
} from '@/api/services/project/project-service.types';
import { useProjects } from '@/hooks/use-projects.hook';
import {
  type FormMessage,
  FormStatus,
  NumberField,
  ReadOnlyNote,
  SaveResetActions,
  SelectField,
  SettingsCard,
  ToggleField,
  WorkspaceEmptyState,
} from '../../form-controls';
import { useCanManageProject } from '../../use-can-manage-project';
import type { WorkspaceProjectSettingsProps } from '../../workspace-settings.types';

type CommunicationSettingsForm = Omit<
  CommunicationSettings,
  'createdAt' | 'integrationId' | 'projectId' | 'updatedAt'
>;

const headerFilterLevels: HeaderFilterLevel[] = [
  'HIGH',
  'MEDIUM',
  'METADATA',
  'ALL',
];

const fallbackCommunicationSettings: CommunicationSettingsForm = {
  subscribeToFetch: false,
  subscribeToHttp: false,
  captureBody: false,
  bodyMaxBytes: 0,
  captureStreamBodies: false,
  headerFilterLevel: 'HIGH',
};

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

export function TracingCustomization({
  isLoading,
  selectedProject,
}: WorkspaceProjectSettingsProps) {
  const [form, setForm] = useState<CommunicationSettingsForm>(
    fallbackCommunicationSettings,
  );
  const [message, setMessage] = useState<FormMessage | null>(null);
  const {
    useProjectCommunicationSettings,
    useResetProjectCommunicationSettings,
    useUpdateProjectCommunicationSettings,
  } = useProjects();
  const { canManage } = useCanManageProject(selectedProject?.id);
  const { data, isLoading: isSettingsLoading } =
    useProjectCommunicationSettings(selectedProject?.id);
  const updateSettings = useUpdateProjectCommunicationSettings(
    selectedProject?.id ?? '',
  );
  const resetSettings = useResetProjectCommunicationSettings(
    selectedProject?.id ?? '',
  );

  useEffect(() => {
    setForm(toCommunicationSettingsForm(data));
    setMessage(null);
  }, [data]);

  if (!selectedProject) {
    return <WorkspaceEmptyState isLoading={isLoading} />;
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
    <form className='grid gap-6' onSubmit={handleSubmit}>
      <SettingsCard
        title='Communication'
        description='SDK capture defaults used by services in this workspace.'
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
              label='Fetch instrumentation'
              description='Capture Node fetch and undici traffic.'
              checked={form.subscribeToFetch}
              disabled={!canManage}
              onChange={(checked) => updateForm('subscribeToFetch', checked)}
            />
            <ToggleField
              label='HTTP instrumentation'
              description='Capture Node http and https traffic.'
              checked={form.subscribeToHttp}
              disabled={!canManage}
              onChange={(checked) => updateForm('subscribeToHttp', checked)}
            />
            <ToggleField
              label='Capture bodies'
              description='Store request body samples up to the byte limit.'
              checked={form.captureBody}
              disabled={!canManage}
              onChange={(checked) => updateForm('captureBody', checked)}
            />
            <ToggleField
              label='Stream bodies'
              description='Allow stream bodies to be copied before truncation.'
              checked={form.captureStreamBodies}
              disabled={!canManage}
              onChange={(checked) => updateForm('captureStreamBodies', checked)}
            />
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
        </div>
        <FormStatus message={message} />
        <ReadOnlyNote canManage={canManage} />
      </SettingsCard>
    </form>
  );
}
