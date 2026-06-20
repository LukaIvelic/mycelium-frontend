import type { AssistantPanelMessage } from './assistant.types';

export const ASSISTANT_EMPTY_PROMPTS = [
  'Summarize recent project activity',
  'Find likely failing services',
  'Explain what to inspect next',
] as const;

export const ASSISTANT_ERROR_RATE_LIMIT =
  'Assistant rate limit reached. Try again shortly.';

export const ASSISTANT_ERROR_MISSING_KEY =
  'OPENAI_API_KEY is not configured on the backend.';

export const ASSISTANT_ERROR_DEFAULT =
  'Assistant request failed. Try again in a moment.';

export function createAssistantMessage(
  role: AssistantPanelMessage['role'],
  content: string,
  failed = false,
): AssistantPanelMessage {
  return {
    content,
    failed,
    id: crypto.randomUUID(),
    role,
  };
}
