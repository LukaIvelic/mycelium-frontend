'use client';

import { ArrowUpRight, Send, Trash2 } from 'lucide-react';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { AssistantService } from '@/api/services/assistant/assistant-service';
import { Button } from '@/components/ui/button/button';
import { Spinner } from '@/components/ui/spinner/spinner';
import { Textarea } from '@/components/ui/textarea/textarea';
import { cn } from '@/lib/utils';
import {
  ASSISTANT_EMPTY_PROMPTS,
  createAssistantMessage,
} from './assistant.config';
import type {
  AssistantContentProps,
  AssistantPanelMessage,
} from './assistant.types';
import {
  getAssistantErrorMessage,
  toAssistantPayloadMessages,
} from './assistant.utils';
import { AssistantMarkdown } from './assistant-markdown';

const assistantService = new AssistantService();

export function AssistantContent({ projectId }: AssistantContentProps) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<AssistantPanelMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageCount = messages.length;
  const hasMessages = messageCount > 0;
  const lastContent = messages[messageCount - 1]?.content;

  // biome-ignore lint/correctness/useExhaustiveDependencies: lastContent is an intentional trigger so the thread follows streamed tokens as they arrive
  useEffect(() => {
    if (!messageCount) return;
    messagesEndRef.current?.scrollIntoView({
      behavior: isStreaming ? 'auto' : 'smooth',
    });
  }, [isStreaming, messageCount, lastContent]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isStreaming) return;

    const userMessage = createAssistantMessage('user', trimmed);
    const assistantMessage: AssistantPanelMessage = {
      ...createAssistantMessage('assistant', ''),
      streaming: true,
    };
    const payloadMessages = toAssistantPayloadMessages([
      ...messages,
      userMessage,
    ]);

    setDraft('');
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setIsStreaming(true);

    const updateAssistant = (
      patch: (message: AssistantPanelMessage) => AssistantPanelMessage,
    ) =>
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id ? patch(message) : message,
        ),
      );

    try {
      await assistantService.streamChat(
        { messages: payloadMessages, projectId },
        {
          onDelta: (delta) =>
            updateAssistant((message) => ({
              ...message,
              content: message.content + delta,
            })),
        },
      );
      updateAssistant((message) => ({ ...message, streaming: false }));
    } catch (error) {
      const errorMessage = getAssistantErrorMessage(error);
      updateAssistant((message) => ({
        ...message,
        content: errorMessage,
        failed: true,
        streaming: false,
      }));
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = () => {
    void sendMessage(draft);
  };

  const handlePromptClick = (prompt: string) => {
    void sendMessage(prompt);
  };

  const handleDraftKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className='flex h-full min-h-0 w-full flex-col px-8 py-4'>
      <div className='mb-3 flex shrink-0 items-center justify-between gap-2'>
        <span className='truncate text-sm font-medium text-foreground/85'>
          Assistant
        </span>
        <Button
          aria-label='Clear assistant conversation'
          className='size-6 text-foreground/40 hover:bg-white/5 hover:text-foreground'
          disabled={!hasMessages || isStreaming}
          onClick={() => setMessages([])}
          size='icon-xs'
          variant='ghost'
        >
          <Trash2 className='size-3' />
        </Button>
      </div>

      <div className='flex min-h-0 flex-1 flex-col overflow-y-auto pr-1 no-scrollbar'>
        {!hasMessages && (
          <AssistantEmptyState
            disabled={isStreaming}
            onSelect={handlePromptClick}
          />
        )}

        {hasMessages && (
          <div className='flex flex-col'>
            {messages.map((message, index) => (
              <AssistantThreadItem
                isFirst={index === 0}
                key={message.id}
                message={message}
              />
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className='mt-3 shrink-0'>
        <div className='rounded-md border border-[#3a3a3a] bg-[#1a1a1a] transition-colors focus-within:border-[#5b5b5b] focus-within:bg-[#1d1d1d]'>
          <Textarea
            aria-label='Ask the assistant'
            className='max-h-32 min-h-9 resize-none border-0 bg-transparent px-3 pt-2.5 pb-1 text-sm leading-relaxed placeholder:text-foreground/30 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent dark:disabled:bg-transparent'
            disabled={isStreaming}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleDraftKeyDown}
            placeholder='Ask about this project...'
            value={draft}
          />
          <div className='flex items-center justify-between gap-2 px-2.5 pb-2'>
            <span className='flex select-none items-center gap-1 text-[0.65rem] text-foreground/30'>
              <kbd className='rounded border border-[#3a3a3a] bg-[#262626] px-1 py-px font-sans text-[0.6rem] text-foreground/45'>
                Enter
              </kbd>
              to send
            </span>
            <Button
              aria-label='Send message'
              className='size-7 rounded-md'
              disabled={!draft.trim() || isStreaming}
              onClick={handleSubmit}
              size='icon-sm'
            >
              {isStreaming ? (
                <Spinner className='size-3.5' />
              ) : (
                <Send className='size-3.5' />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssistantEmptyState({
  disabled,
  onSelect,
}: {
  disabled: boolean;
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='px-0.5 text-xs leading-relaxed text-foreground/50'>
        Ask about activity, failures, or what to inspect next in this project.
      </p>
      <div className='flex flex-col gap-1.5'>
        {ASSISTANT_EMPTY_PROMPTS.map((prompt) => (
          <button
            className='group flex items-center gap-2 rounded-sm border border-[#434343] bg-[#1d1d1d] px-2.5 py-2 text-left text-xs text-foreground/70 transition-colors hover:border-[#5a5a5a] hover:bg-[#242424] hover:text-foreground/90 disabled:pointer-events-none disabled:opacity-50'
            disabled={disabled}
            key={prompt}
            onClick={() => onSelect(prompt)}
            type='button'
          >
            <span className='flex-1'>{prompt}</span>
            <ArrowUpRight className='size-3.5 shrink-0 text-foreground/25 transition-colors group-hover:text-foreground/60' />
          </button>
        ))}
      </div>
    </div>
  );
}

function AssistantThreadItem({
  isFirst,
  message,
}: {
  isFirst: boolean;
  message: AssistantPanelMessage;
}) {
  if (message.role === 'user') {
    return (
      <p
        className={cn(
          'break-words whitespace-pre-wrap text-sm font-medium text-foreground/90',
          !isFirst && 'mt-4 border-t border-[#343434] pt-4',
        )}
      >
        {message.content}
      </p>
    );
  }

  const isAwaitingFirstToken = message.streaming && !message.content;

  return (
    <div
      className={cn(
        'mt-2 break-words text-xs leading-relaxed',
        message.failed ? 'text-red-300' : 'text-foreground/70',
      )}
    >
      {isAwaitingFirstToken ? (
        <span className='flex items-center gap-2 text-foreground/45'>
          <Spinner className='size-3.5' />
          Thinking...
        </span>
      ) : (
        <AssistantMarkdown failed={message.failed}>
          {message.content}
        </AssistantMarkdown>
      )}
    </div>
  );
}
