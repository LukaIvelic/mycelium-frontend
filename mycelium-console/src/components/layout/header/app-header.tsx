'use client';

import {
  Bell,
  Brain,
  GitPullRequestCreateArrow,
  type LucideIcon,
} from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRightSidebar } from '@/hooks/use-right-sidebar';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { RequestsContent } from '../right-sidebar/content/requests';

type Panel = 'requests' | 'notifications' | 'ai_assistant';

type HeaderAction = {
  panel: Panel;
  label: string;
  icon: LucideIcon;
  content: (projectId: string) => React.ReactNode;
};

const headerActions: HeaderAction[] = [
  {
    panel: 'requests',
    label: 'Requests',
    icon: GitPullRequestCreateArrow,
    content: (projectId) => <RequestsContent projectId={projectId} />,
  },
  {
    panel: 'notifications',
    label: 'Notifications',
    icon: Bell,
    content: (_projectId) => null,
  },
  {
    panel: 'ai_assistant',
    label: 'AI Assistant',
    icon: Brain,
    content: (_projectId) => null,
  },
];

export function AppHeader() {
  const { id: projectId } = useParams<{ id: string }>();
  const pathname = usePathname();
  const isProjectRoute = /^\/projects\/[^/]+$/.test(pathname);
  const { state, openRightSidebar, closeRightSidebar } = useRightSidebar();
  const [active, setActive] = useState<Panel | null>(null);

  const togglePanel = (panel: Panel, content: React.ReactNode) => {
    if (state && active === panel) {
      closeRightSidebar();
      setActive(null);
      return;
    }

    openRightSidebar(content);
    setActive(panel);
  };

  return (
    <header className={cn('h-12 px-4', 'grid grid-cols-4 items-center')}>
      <div className='col-start-4 justify-self-end flex items-center gap-2'>
        {isProjectRoute &&
          headerActions.map(({ panel, label, icon: Icon, content }, index) => (
            <div key={panel} className='flex items-center gap-2'>
              {index === 2 && (
                <Separator orientation='vertical' className='bg-[#434343]' />
              )}
              <Toggle
                variant='outline'
                pressed={state && active === panel}
                onClick={() => togglePanel(panel, content(projectId))}
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
          ))}
      </div>
    </header>
  );
}
