import { RequestsContent } from '../../right-sidebar/content/requests/requests';

export function renderRequestsContent(projectId: string) {
  return <RequestsContent projectId={projectId} />;
}

export function renderEmptyPanelContent() {
  return null;
}
