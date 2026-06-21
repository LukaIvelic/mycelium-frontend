import { BASE_API_URL } from '@/lib/constants/routes';
import type { AssistantChatResponse } from '@/lib/types/assistant';
import { type ApiClient, apiClient } from '../../api-client';
import { tokenStorage } from '../../token-storage';
import type {
  AssistantChatPayload,
  AssistantStreamHandlers,
} from './assistant-service.types';

const STREAM_EVENT_SEPARATOR = '\n\n';

export class AssistantService {
  private apiClient: ApiClient = apiClient;

  async chat(payload: AssistantChatPayload) {
    return this.apiClient.post<AssistantChatResponse>(
      '/assistant/chat',
      payload,
    );
  }

  /**
   * Streams an assistant reply over SSE, invoking `onDelta` for each token.
   * Throws an Error whose message is a stable code ('rate_limit',
   * 'missing_key', 'provider', 'unknown') so callers can map it to copy.
   */
  async streamChat(
    payload: AssistantChatPayload,
    handlers: AssistantStreamHandlers,
  ): Promise<void> {
    const token = tokenStorage.getToken();
    const response = await fetch(`${BASE_API_URL}/assistant/chat/stream`, {
      method: 'POST',
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok || !response.body) {
      throw new Error(this.statusToCode(response.status));
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      let boundary = buffer.indexOf(STREAM_EVENT_SEPARATOR);
      while (boundary !== -1) {
        const rawEvent = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + STREAM_EVENT_SEPARATOR.length);
        boundary = buffer.indexOf(STREAM_EVENT_SEPARATOR);
        this.dispatchEvent(rawEvent, handlers);
      }
    }
  }

  private dispatchEvent(
    rawEvent: string,
    handlers: AssistantStreamHandlers,
  ): void {
    let eventName = 'message';
    const dataLines: string[] = [];

    for (const line of rawEvent.split('\n')) {
      if (line.startsWith('event:')) eventName = line.slice(6).trim();
      else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
    }

    if (!dataLines.length) return;

    let data: { content?: string; code?: string } = {};
    try {
      data = JSON.parse(dataLines.join('\n'));
    } catch {
      return;
    }

    if (eventName === 'delta' && data.content) {
      handlers.onDelta(data.content);
    } else if (eventName === 'done') {
      handlers.onDone?.();
    } else if (eventName === 'error') {
      throw new Error(data.code ?? 'unknown');
    }
  }

  private statusToCode(status: number): string {
    if (status === 429) return 'rate_limit';
    if (status === 503) return 'missing_key';
    return 'provider';
  }
}
