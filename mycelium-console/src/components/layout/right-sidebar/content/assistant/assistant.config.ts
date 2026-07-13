import type { AssistantModel } from '@/lib/types/assistant';
import type { AssistantPanelMessage } from './assistant.types';

export interface AssistantModelOption {
  description: string;
  label: string;
  value: AssistantModel;
}

export const ASSISTANT_DEFAULT_MODEL: AssistantModel = 'gpt-5.6-sol';
export const ASSISTANT_DEFAULT_THINKING = true;
export const ASSISTANT_MODEL_STORAGE_KEY = 'mycelium.assistant.model';
export const ASSISTANT_THINKING_STORAGE_KEY = 'mycelium.assistant.thinking';

export const ASSISTANT_MODEL_OPTIONS: AssistantModelOption[] = [
  {
    description: 'Best quality',
    label: 'Sol',
    value: 'gpt-5.6-sol',
  },
  {
    description: 'Balanced',
    label: 'Terra',
    value: 'gpt-5.6-terra',
  },
  {
    description: 'Fastest / cheapest',
    label: 'Luna',
    value: 'gpt-5.6-luna',
  },
];

export const ASSISTANT_EMPTY_PROMPTS = [
  'Summarize recent project activity',
  'Find likely failing services',
  'Explain what to inspect next',
] as const;

export function isAssistantModel(
  value: string | null,
): value is AssistantModel {
  return ASSISTANT_MODEL_OPTIONS.some((option) => option.value === value);
}

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
