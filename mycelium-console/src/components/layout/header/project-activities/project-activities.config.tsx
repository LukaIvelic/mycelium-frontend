import {
  Bell,
  Brain,
  GitPullRequestCreateArrow,
  LucideIcon,
} from 'lucide-react';
import { RequestsContent } from '../../right-sidebar/content/requests';

export type Panel = 'requests' | 'notifications' | 'ai_assistant';

type HeaderAction = {
  panel: Panel;
  label: string;
  icon: LucideIcon;
  content: (projectId: string) => React.ReactNode;
};

export const headerActions: HeaderAction[] = [
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
