import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { useParams } from 'next/navigation';
import { useRightSidebar } from '@/hooks/use-right-sidebar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { headerActions, Panel } from './project-activities.config';

export function ProjectActivities() {
  const { id: projectId } = useParams<{ id: string }>();
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

  return headerActions.map(({ panel, label, icon: Icon, content }, index) => (
    <div key={panel} className="flex items-center gap-2">
      {index === 2 && (
        <Separator orientation="vertical" className="bg-[#434343]" />
      )}
      <Toggle
        variant="outline"
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
  ));
}
