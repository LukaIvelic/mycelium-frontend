import type { AssistantMessage, AssistantModel } from '@/lib/types/assistant';

export interface AssistantChatPayload {
  messages: AssistantMessage[];
  model?: AssistantModel;
  projectId?: string;
  thinking?: boolean;
}

export interface AssistantStreamHandlers {
  onDelta: (delta: string) => void;
  onDone?: () => void;
  signal?: AbortSignal;
}
