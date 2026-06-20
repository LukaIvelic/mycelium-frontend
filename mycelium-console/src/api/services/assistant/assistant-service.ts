import type { AssistantChatResponse } from '@/lib/types/assistant';
import { type ApiClient, apiClient } from '../../api-client';
import type { AssistantChatPayload } from './assistant-service.types';

export class AssistantService {
  private apiClient: ApiClient = apiClient;

  async chat(payload: AssistantChatPayload) {
    return this.apiClient.post<AssistantChatResponse>(
      '/assistant/chat',
      payload,
    );
  }
}
