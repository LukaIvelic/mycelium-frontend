import { useMutation } from '@tanstack/react-query';
import { AssistantService } from '@/api/services/assistant/assistant-service';
import type { AssistantChatPayload } from '@/api/services/assistant/assistant-service.types';

const assistantService = new AssistantService();

function useSendAssistantMessage() {
  return useMutation({
    mutationFn: (payload: AssistantChatPayload) =>
      assistantService.chat(payload),
  });
}

export function useAssistant() {
  return {
    useSendAssistantMessage,
  };
}
