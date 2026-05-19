import { RequestsContent } from '../../right-sidebar/content/requests';

export function renderRequestsContent(projectId: string) {
  return <RequestsContent projectId={projectId} />;
}

export function renderEmptyPanelContent() {
  return null;
}
