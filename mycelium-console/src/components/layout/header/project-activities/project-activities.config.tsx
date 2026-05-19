import { Bell, Brain, GitPullRequestCreateArrow } from 'lucide-react';
import { ProjectActivityPanel } from './project-activities.constants';
import {
  renderEmptyPanelContent,
  renderRequestsContent,
} from './project-activities.content';
import type { HeaderAction } from './project-activities.types';

export const headerActions: HeaderAction[] = [
  {
    panel: ProjectActivityPanel.Requests,
    label: 'Requests',
    icon: GitPullRequestCreateArrow,
    content: renderRequestsContent,
  },
  {
    panel: ProjectActivityPanel.Notifications,
    label: 'Notifications',
    icon: Bell,
    content: renderEmptyPanelContent,
  },
  {
    panel: ProjectActivityPanel.AiAssistant,
    label: 'AI Assistant',
    icon: Brain,
    content: renderEmptyPanelContent,
  },
];
