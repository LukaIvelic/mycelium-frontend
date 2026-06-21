'use client';

import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox/combobox';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';
import type {
  AssignableProjectMemberRole,
  Project,
  ProjectMember,
  ProjectMemberRole,
} from '@/lib/types/project';
import { cn } from '@/lib/utils';

const assignableRoles: AssignableProjectMemberRole[] = [
  'admin',
  'member',
  'viewer',
];

type FormMessage = {
  tone: 'error' | 'success';
  text: string;
};

export function ProjectMembers() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<AssignableProjectMemberRole>('member');
  const [message, setMessage] = useState<FormMessage | null>(null);

  const { useMe } = useUsers();
  const { data: user } = useMe();
  const {
    useAddProjectMember,
    useAllProjectsByUserId,
    useProjectMembers,
    useRemoveProjectMember,
    useUpdateProjectMember,
  } = useProjects();

  const { data: projects = [], isLoading: areProjectsLoading } =
    useAllProjectsByUserId(user?.id);

  // Selection is keyed by id and resolved during render: it defaults to the
  // first project until the user picks another, with no effect-driven copy of
  // server data into state.
  const selectedProject = useMemo(
    () =>
      projects.find((project) => project.id === selectedProjectId) ??
      projects[0] ??
      null,
    [projects, selectedProjectId],
  );

  const { data: members = [], isLoading: areMembersLoading } =
    useProjectMembers(selectedProject?.id);
  const addMember = useAddProjectMember(selectedProject?.id ?? '');
  const updateMember = useUpdateProjectMember(selectedProject?.id ?? '');
  const removeMember = useRemoveProjectMember(selectedProject?.id ?? '');

  const currentMember = useMemo(
    () => members.find((member) => member.userId === user?.id),
    [members, user?.id],
  );
  const canManage =
    currentMember?.role === 'owner' || currentMember?.role === 'admin';
  const canAdd =
    canManage &&
    Boolean(selectedProject?.id) &&
    Boolean(email.trim()) &&
    !addMember.isPending;
  const memberCountLabel = `${members.length} ${
    members.length === 1 ? 'member' : 'members'
  }`;
  const selectedProjectLabel = selectedProject?.name ?? 'No project selected';

  async function handleAddMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!canAdd) return;

    try {
      await addMember.mutateAsync({
        email: email.trim(),
        role,
      });
      setEmail('');
      setRole('member');
      setMessage({ tone: 'success', text: 'Member added.' });
    } catch {
      setMessage({ tone: 'error', text: 'Unable to add member.' });
    }
  }

  function handleRoleChange(member: ProjectMember) {
    return function updateRole(event: ChangeEvent<HTMLSelectElement>) {
      setMessage(null);
      updateMember.mutate(
        {
          payload: {
            role: event.target.value as AssignableProjectMemberRole,
          },
          userId: member.userId,
        },
        {
          onError: () =>
            setMessage({
              tone: 'error',
              text: 'Unable to update member role.',
            }),
        },
      );
    };
  }

  function handleRemoveMember(member: ProjectMember) {
    return function removeProjectMember() {
      setMessage(null);
      removeMember.mutate(member.userId, {
        onError: () =>
          setMessage({ tone: 'error', text: 'Unable to remove member.' }),
      });
    };
  }

  return (
    <div className='flex w-full flex-col gap-6'>
      <section className='w-full overflow-hidden rounded-md border border-foreground/10 bg-background'>
        <div className='grid grid-cols-1 gap-5 border-b border-foreground/10 px-8 py-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center'>
          <div className='min-w-0'>
            <h2 className='font-medium'>Members</h2>
            <p className='mt-2 truncate text-sm text-foreground/50'>
              {selectedProjectLabel} · {memberCountLabel}
            </p>
          </div>

          <ProjectSelector
            projects={projects}
            value={selectedProject}
            onValueChange={(project) =>
              setSelectedProjectId(project?.id ?? null)
            }
          />
        </div>

        <form
          className='grid grid-cols-1 gap-4 border-b border-foreground/10 px-8 py-5 lg:grid-cols-[minmax(0,1fr)_10rem_auto] lg:items-end'
          onSubmit={handleAddMember}
        >
          <div className='min-w-0'>
            <label
              htmlFor='project-member-email'
              className='mb-2 block text-xs font-medium uppercase text-foreground/40'
            >
              Email
            </label>
            <input
              id='project-member-email'
              type='email'
              value={email}
              placeholder='teammate@example.com'
              onChange={(event) => setEmail(event.target.value)}
              disabled={!canManage}
              className={cn(
                'h-9 w-full rounded-md border border-foreground/10 bg-[#1d1d1d] px-3 text-sm text-foreground outline-none',
                'placeholder:text-foreground/35 focus:border-foreground/20',
                'disabled:pointer-events-none disabled:opacity-50',
              )}
            />
          </div>

          <div>
            <label
              htmlFor='project-member-role'
              className='mb-2 block text-xs font-medium uppercase text-foreground/40'
            >
              Role
            </label>
            <RoleSelect
              id='project-member-role'
              value={role}
              onChange={(event) =>
                setRole(event.target.value as AssignableProjectMemberRole)
              }
              disabled={!canManage}
            />
          </div>

          <Button type='submit' size='lg' disabled={!canAdd} className='gap-2'>
            Add member
          </Button>
        </form>

        {(message || (!canManage && selectedProject && !areMembersLoading)) && (
          <div
            className={cn(
              'border-b border-foreground/10 px-8 py-3 text-sm',
              message?.tone === 'error' ? 'text-red-300' : 'text-foreground/50',
            )}
          >
            {message?.text ??
              'Owner or admin access is required to change members.'}
          </div>
        )}

        {areProjectsLoading || areMembersLoading ? (
          <div className='px-8 py-6'>
            <Skeleton className='h-16 w-full' />
          </div>
        ) : (
          <div>
            <div className='hidden grid-cols-[minmax(0,1fr)_10rem_5rem] border-b border-foreground/10 px-8 py-2 text-xs font-medium uppercase text-foreground/35 md:grid'>
              <span>User</span>
              <span>Role</span>
              <span />
            </div>
            {members.map((member) => (
              <MemberRow
                key={member.userId}
                canManage={canManage}
                member={member}
                onRemove={handleRemoveMember(member)}
                onRoleChange={handleRoleChange(member)}
                pending={updateMember.isPending || removeMember.isPending}
              />
            ))}
            {members.length === 0 && (
              <div className='px-8 py-10 text-center text-sm text-foreground/45'>
                No members found.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function ProjectSelector({
  projects,
  value,
  onValueChange,
}: {
  onValueChange: (project: Project | null) => void;
  projects: Project[];
  value: Project | null;
}) {
  return (
    <Combobox<Project>
      items={projects}
      value={value}
      onValueChange={onValueChange}
      itemToStringLabel={(project) => project.name}
      itemToStringValue={(project) => project.id}
      isItemEqualToValue={(project, selected) => project.id === selected.id}
    >
      <ComboboxInput
        placeholder='Project'
        className={cn(
          'w-full',
          'rounded-md border-foreground/10 bg-[#1d1d1d]',
          'outline-none placeholder:text-foreground/50 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-foreground/10',
        )}
      />
      <ComboboxContent>
        <ComboboxEmpty>No projects</ComboboxEmpty>
        <ComboboxList>
          {(project) => (
            <ComboboxItem key={project.id} value={project}>
              <span className='line-clamp-2 break-all'>{project.name}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function RoleSelect({
  disabled,
  id,
  onChange,
  value,
}: {
  disabled?: boolean;
  id?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: AssignableProjectMemberRole;
}) {
  return (
    <select
      id={id}
      className={cn(
        'h-9 w-full rounded-md border border-foreground/10 bg-[#1d1d1d] px-3 text-sm text-foreground outline-none',
        'focus:border-foreground/20',
        'disabled:pointer-events-none disabled:opacity-50',
      )}
      disabled={disabled}
      value={value}
      onChange={onChange}
    >
      {assignableRoles.map((item) => (
        <option key={item} value={item}>
          {formatRole(item)}
        </option>
      ))}
    </select>
  );
}

function MemberRow({
  canManage,
  member,
  onRemove,
  onRoleChange,
  pending,
}: {
  canManage: boolean;
  member: ProjectMember;
  onRemove: () => void;
  onRoleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  pending: boolean;
}) {
  const canEditMember = canManage && !member.isOwner;

  return (
    <div className='grid grid-cols-1 gap-4 border-b border-foreground/10 px-8 py-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_10rem_5rem] md:items-center'>
      <div className='min-w-0'>
        <p className='truncate text-sm font-medium'>{member.email}</p>
        <p className='mt-0.5 truncate text-xs text-foreground/40'>
          {member.userId}
        </p>
      </div>

      {member.isOwner ? (
        <span className='text-sm text-foreground/60'>Owner</span>
      ) : (
        <RoleSelect
          value={member.role as AssignableProjectMemberRole}
          onChange={onRoleChange}
          disabled={!canEditMember || pending}
        />
      )}

      <Button
        type='button'
        variant='ghost'
        size='sm'
        aria-label={`Remove ${member.email}`}
        disabled={!canEditMember || pending}
        onClick={onRemove}
        className='justify-self-start text-foreground/45 hover:bg-white/5 hover:text-foreground md:justify-self-end'
      >
        Remove
      </Button>
    </div>
  );
}

function formatRole(role: ProjectMemberRole): string {
  return role.slice(0, 1).toUpperCase() + role.slice(1);
}
