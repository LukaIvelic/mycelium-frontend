import {
  Bell,
  GitPullRequestCreateArrow,
  MessageSquareText,
} from 'lucide-react';
import { ProjectActivityPanel } from './project-activities.constants';
import {
  renderAssistantContent,
  renderNotificationsContent,
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
    content: renderNotificationsContent,
  },
  {
    panel: ProjectActivityPanel.AiAssistant,
    label: 'Assistant',
    icon: MessageSquareText,
    content: renderAssistantContent,
  },
];
