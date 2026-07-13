export type AssistantMessageRole = 'assistant' | 'system' | 'user';

export interface AssistantMessage {
  content: string;
  role: AssistantMessageRole;
}

export type AssistantModel = 'gpt-5.6-luna' | 'gpt-5.6-sol' | 'gpt-5.6-terra';

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
