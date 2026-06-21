import type { AssistantMessage } from '@/lib/types/assistant';

export interface AssistantChatPayload {
  messages: AssistantMessage[];
  projectId?: string;
}

export interface AssistantStreamHandlers {
  onDelta: (delta: string) => void;
  onDone?: () => void;
}
