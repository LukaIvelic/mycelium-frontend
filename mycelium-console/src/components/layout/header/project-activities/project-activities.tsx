import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator/separator';
import { Toggle } from '@/components/ui/toggle/toggle';
import { useRightSidebar } from '@/hooks/use-right-sidebar';
import { cn } from '@/lib/utils';
import { headerActions } from './project-activities.config';
import {
  PROJECT_ACTIVITY_SEPARATOR_INDEX,
  ProjectActivityPanel,
} from './project-activities.constants';
import { createProjectActivityToggleHandler } from './project-activities.handlers';

export function ProjectActivities() {
  const [active, setActive] = useState<ProjectActivityPanel | null>(null);

  const { id: projectId } = useParams<{ id: string }>();
  const { state, openRightSidebar, closeRightSidebar } = useRightSidebar();

  return headerActions.map(({ panel, label, icon: Icon, content }, index) => {
    const panelContent = content(projectId);
    const handleTogglePanel = createProjectActivityToggleHandler({
      active,
      closeRightSidebar,
      content: panelContent,
      openRightSidebar,
      panel,
      setActive,
      state,
    });

    return (
      <div key={panel} className='flex items-center gap-2'>
        {index === PROJECT_ACTIVITY_SEPARATOR_INDEX && (
          <Separator orientation='vertical' className='bg-[#434343]' />
        )}
        <Toggle
          variant='outline'
          pressed={state && active === panel}
          onClick={handleTogglePanel}
          className={cn(
            'text-foreground/70 border-[#434343]',
            'hover:bg-[#333333] hover:text-[#f5f5f5] hover:cursor-pointer',
            'h-9',
            active === panel && 'bg-[#333333]! text-[#f5f5f5]',
          )}
        >
          <Icon />
          {label}
        </Toggle>
      </div>
    );
  });
}
