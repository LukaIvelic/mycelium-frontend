import type { AssistantMessage } from '@/lib/types/assistant';

export interface AssistantContentProps {
  projectId?: string;
}

export interface AssistantPanelMessage extends AssistantMessage {
  id: string;
  failed?: boolean;
  streaming?: boolean;
  stopped?: boolean;
}
