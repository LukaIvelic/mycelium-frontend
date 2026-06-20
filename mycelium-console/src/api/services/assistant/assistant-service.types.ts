import type { AssistantMessage } from '@/lib/types/assistant';

export interface AssistantChatPayload {
  messages: AssistantMessage[];
  projectId?: string;
}
