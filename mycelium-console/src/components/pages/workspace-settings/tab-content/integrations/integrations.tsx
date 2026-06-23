import { type FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useServices } from '@/hooks/use-services.hook';
import { cn } from '@/lib/utils';
import {
  FIELD_CLASS,
  type FormMessage,
  FormStatus,
  ReadOnlyNote,
  SettingsCard,
  TextField,
  WorkspaceEmptyState,
} from '../../form-controls';
import { useCanManageProject } from '../../use-can-manage-project';
import type { WorkspaceProjectSettingsProps } from '../../workspace-settings.types';

export function Integrations({
  isLoading,
  selectedProject,
}: WorkspaceProjectSettingsProps) {
  const [origin, setOrigin] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<FormMessage | null>(null);
  const { useCreateService, useDeleteService, useFindByProjectId } =
    useServices();
  const { canManage } = useCanManageProject(selectedProject?.id);
  const { data: services = [], isLoading: areServicesLoading } =
    useFindByProjectId(selectedProject?.id);
  const createService = useCreateService(selectedProject?.id ?? '');
  const deleteService = useDeleteService();

  if (!selectedProject) {
    return <WorkspaceEmptyState isLoading={isLoading} />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!origin.trim()) {
      setMessage({ tone: 'error', text: 'Origin is required.' });
      return;
    }

    try {
      await createService.mutateAsync({
        origin: origin.trim(),
        key: key.trim() || null,
        name: name.trim() || null,
      });
      setOrigin('');
      setKey('');
      setName('');
      setMessage({ tone: 'success', text: 'Integration created.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to create integration. Check that the workspace has an active API key.',
      });
    }
  }

  function handleDelete(id: string) {
    return function deleteIntegration() {
      setMessage(null);
      deleteService.mutate(id, {
        onError: () =>
          setMessage({ tone: 'error', text: 'Unable to delete integration.' }),
      });
    };
  }

  return (
    <div className='grid gap-6'>
      <form onSubmit={handleSubmit}>
        <SettingsCard
          title='Integrations'
          description='Registered services attached to this workspace.'
          action={
            <Button
              type='submit'
              size='sm'
              disabled={!canManage || createService.isPending}
            >
              Add
            </Button>
          }
        >
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
            <TextField
              label='Origin'
              value={origin}
              placeholder='https://service.internal'
              disabled={!canManage}
              onChange={setOrigin}
            />
            <TextField
              label='Display name'
              value={name}
              placeholder='Orders API'
              disabled={!canManage}
              onChange={setName}
            />
            <TextField
              label='Service key'
              value={key}
              placeholder='orders-api'
              disabled={!canManage}
              onChange={setKey}
            />
          </div>
          <FormStatus message={message} />
          <ReadOnlyNote canManage={canManage} />
        </SettingsCard>
      </form>

      <SettingsCard title='Registered services'>
        {areServicesLoading ? (
          <Skeleton className='h-24 w-full' />
        ) : services.length ? (
          <div className='flex flex-col divide-y divide-foreground/10'>
            {services.map((service) => (
              <div
                key={service.id}
                className='grid grid-cols-1 gap-4 py-4 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center'
              >
                <div className='min-w-0'>
                  <p className='truncate text-sm font-medium'>
                    {service.name || service.key || service.origin}
                  </p>
                  <p className='mt-1 truncate text-xs text-foreground/45'>
                    {service.origin}
                  </p>
                </div>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  disabled={!canManage || deleteService.isPending}
                  onClick={handleDelete(service.id)}
                  className={cn(
                    'justify-self-start border border-foreground/10 text-foreground/60 md:justify-self-end',
                    FIELD_CLASS,
                  )}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm text-foreground/50'>No integrations found.</p>
        )}
      </SettingsCard>
    </div>
  );
}
