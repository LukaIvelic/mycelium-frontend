import type { LucideIcon } from 'lucide-react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { ProjectActivityPanel } from './project-activities.constants';

export interface HeaderAction {
  content: (projectId: string) => ReactNode;
  icon: LucideIcon;
  label: string;
  panel: ProjectActivityPanel;
}

export interface CreateProjectActivityToggleHandlerParams {
  active: ProjectActivityPanel | null;
  closeRightSidebar: () => void;
  content: ReactNode;
  openRightSidebar: (content: ReactNode) => void;
  panel: ProjectActivityPanel;
  setActive: Dispatch<SetStateAction<ProjectActivityPanel | null>>;
  state: boolean;
}
