import type { AssistantMessage } from '@/lib/types/assistant';
import {
  ASSISTANT_ERROR_DEFAULT,
  ASSISTANT_ERROR_MISSING_KEY,
  ASSISTANT_ERROR_RATE_LIMIT,
} from './assistant.config';
import type { AssistantPanelMessage } from './assistant.types';

export function toAssistantPayloadMessages(
  messages: AssistantPanelMessage[],
): AssistantMessage[] {
  return messages
    .filter((message) => !message.failed)
    .map(({ content, role }) => ({ content, role }));
}

export function getAssistantErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : '';

  if (message.includes('HTTP 429')) {
    return ASSISTANT_ERROR_RATE_LIMIT;
  }

  if (message.includes('HTTP 503')) {
    return ASSISTANT_ERROR_MISSING_KEY;
  }

  return ASSISTANT_ERROR_DEFAULT;
}
