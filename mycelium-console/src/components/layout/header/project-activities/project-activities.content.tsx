import { AssistantContent } from '../../right-sidebar/content/assistant/assistant';
import { NotificationsContent } from '../../right-sidebar/content/notifications/notifications';
import { RequestsContent } from '../../right-sidebar/content/requests/requests';

export function renderRequestsContent(projectId: string) {
  return <RequestsContent projectId={projectId} />;
}

export function renderNotificationsContent(projectId: string) {
  return <NotificationsContent projectId={projectId} />;
}

export function renderAssistantContent(projectId: string) {
  return <AssistantContent projectId={projectId} />;
}
