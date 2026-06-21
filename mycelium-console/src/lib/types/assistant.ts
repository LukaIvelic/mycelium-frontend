export type AssistantMessageRole = 'assistant' | 'system' | 'user';

export interface AssistantMessage {
  content: string;
  role: AssistantMessageRole;
}

export interface AssistantUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

export interface AssistantChatResponse {
  message: AssistantMessage;
  model: string;
  providerResponseId?: string;
  usage?: AssistantUsage;
}
