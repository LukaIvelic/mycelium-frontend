'use client';

import { useMemo, useState } from 'react';
import { Centered } from '@/components/features/centered/centered';
import { useTabs } from '@/components/features/tabs/use-tabs';
import { WorkspaceProjectSelector } from '@/components/pages/workspace-settings/project-selector';
import { AlertConfiguration } from '@/components/pages/workspace-settings/tab-content/alert-configuration/alert-configuration';
import { ApiAccess } from '@/components/pages/workspace-settings/tab-content/api-access/api-access';
import { GeneralSettings } from '@/components/pages/workspace-settings/tab-content/general-settings/general-settings';
import { Integrations } from '@/components/pages/workspace-settings/tab-content/integrations/integrations';
import { ProjectMembers } from '@/components/pages/workspace-settings/tab-content/project-members/project-members';
import { RegionLocalization } from '@/components/pages/workspace-settings/tab-content/region-localization/region-localization';
import { TracingCustomization } from '@/components/pages/workspace-settings/tab-content/tracing-customization/tracing-customization';
import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';
import type { Project } from '@/lib/types/project';
import { cn } from '@/lib/utils';

export default function Page() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const { useMe } = useUsers();
  const { useAllProjectsByUserId } = useProjects();
  const { data: user } = useMe();
  const { data: projects = [], isLoading } = useAllProjectsByUserId(user?.id);
  const selectedProject = useMemo(
    () =>
      projects.find((project) => project.id === selectedProjectId) ??
      projects[0] ??
      null,
    [projects, selectedProjectId],
  );
  const workspaceSettingsProps = {
    isLoading,
    onProjectChange: (project: Project | null) =>
      setSelectedProjectId(project?.id ?? null),
    projects,
    selectedProject,
  };
  const tab_content = new Map<string, React.ReactNode>([
    ['General', <GeneralSettings key='general' {...workspaceSettingsProps} />],
    ['API Management', <ApiAccess key='api-management' />],
    ['Members', <ProjectMembers key='project-members' />],
    [
      'Region & Localization',
      <RegionLocalization
        key='region-localization'
        {...workspaceSettingsProps}
      />,
    ],
    [
      'Alert Configuration',
      <AlertConfiguration
        key='alert-configuration'
        {...workspaceSettingsProps}
      />,
    ],
    [
      'Tracing Customization',
      <TracingCustomization
        key='tracing-customization'
        {...workspaceSettingsProps}
      />,
    ],
    [
      'Integrations',
      <Integrations key='integrations' {...workspaceSettingsProps} />,
    ],
  ]);

  const { activeTab, tabs } = useTabs({
    items: tab_content.keys().toArray(),
  });

  return (
    <Centered>
      <div
        className={cn(
          'grid grid-cols-4 grid-rows-[auto_auto_auto] items-center gap-4',
        )}
      >
        <div className='col-span-2 pb-4'>
          <h1 className='text-[32px] font-medium'>Workspace Settings</h1>
          <p className='text-foreground/50'>
            Manage your workspace preferences and settings
          </p>
        </div>
        <div className='col-span-2 justify-self-end w-80'>
          <WorkspaceProjectSelector
            projects={projects}
            value={selectedProject}
            onValueChange={workspaceSettingsProps.onProjectChange}
          />
        </div>
      </div>
      <div className='col-span-4 row-start-2 w-full bg-[#1d1d1d]'>{tabs}</div>
      <div className='col-span-4 row-start-3 pt-12'>
        {tab_content.get(activeTab)}
      </div>
    </Centered>
  );
}
