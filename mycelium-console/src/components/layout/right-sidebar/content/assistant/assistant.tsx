'use client';

import { Bot, Send, Sparkles, Trash2, User } from 'lucide-react';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Spinner } from '@/components/ui/spinner/spinner';
import { Textarea } from '@/components/ui/textarea/textarea';
import { useAssistant } from '@/hooks/use-assistant.hook';
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

export function AssistantContent({ projectId }: AssistantContentProps) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<AssistantPanelMessage[]>([]);
  const { useSendAssistantMessage } = useAssistant();
  const sendAssistantMessage = useSendAssistantMessage();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isSending = sendAssistantMessage.isPending;
  const messageCount = messages.length;

  useEffect(() => {
    if (!messageCount && !isSending) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isSending, messageCount]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isSending) return;

    const userMessage = createAssistantMessage('user', trimmed);
    const nextMessages = [...messages, userMessage];

    setDraft('');
    setMessages(nextMessages);

    try {
      const response = await sendAssistantMessage.mutateAsync({
        messages: toAssistantPayloadMessages(nextMessages),
        projectId,
      });

      setMessages((current) => [
        ...current,
        createAssistantMessage('assistant', response.message.content),
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        createAssistantMessage(
          'assistant',
          getAssistantErrorMessage(error),
          true,
        ),
      ]);
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
    <div className='flex h-full min-h-0 w-full flex-col'>
      <div className='mb-2 flex shrink-0 items-center justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='grid size-7 shrink-0 place-items-center rounded-md border border-sky-400/25 bg-sky-500/10 text-sky-300'>
            <Sparkles className='size-4' />
          </span>
          <div className='min-w-0'>
            <div className='truncate text-sm font-medium text-foreground/85'>
              AI Assistant
            </div>
            <div className='truncate text-xs text-foreground/45'>
              Project context
            </div>
          </div>
        </div>
        <Button
          aria-label='Clear assistant chat'
          className='size-7 text-foreground/45 hover:bg-white/5 hover:text-foreground'
          disabled={!messages.length || sendAssistantMessage.isPending}
          onClick={() => setMessages([])}
          size='icon-xs'
          variant='ghost'
        >
          <Trash2 className='size-3.5' />
        </Button>
      </div>

      <div className='flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1 no-scrollbar'>
        {!messages.length && (
          <div className='flex flex-col gap-2'>
            {ASSISTANT_EMPTY_PROMPTS.map((prompt) => (
              <Button
                className='h-auto justify-start whitespace-normal border-[#434343] bg-[#1d1d1d] px-2 py-2 text-left text-xs text-foreground/70 hover:bg-[#292929]'
                disabled={isSending}
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                size='sm'
                variant='outline'
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}

        {messages.map((message) => (
          <AssistantMessageBubble key={message.id} message={message} />
        ))}

        {sendAssistantMessage.isPending && (
          <div className='flex items-center gap-2 rounded-sm border border-[#434343] bg-[#1d1d1d] px-2 py-2 text-xs text-foreground/50'>
            <Spinner className='size-3.5' />
            Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className='mt-2 flex shrink-0 items-end gap-2'>
        <Textarea
          aria-label='Assistant message'
          className='max-h-28 min-h-10 resize-none rounded-md border-[#434343] bg-[#1d1d1d] px-2 py-2 text-sm'
          disabled={isSending}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleDraftKeyDown}
          placeholder='Ask about this project...'
          value={draft}
        />
        <Button
          aria-label='Send assistant message'
          className='size-9 shrink-0'
          disabled={!draft.trim() || isSending}
          onClick={handleSubmit}
          size='icon-lg'
        >
          {isSending ? (
            <Spinner className='size-4' />
          ) : (
            <Send className='size-4' />
          )}
        </Button>
      </div>
    </div>
  );
}

function AssistantMessageBubble({
  message,
}: {
  message: AssistantPanelMessage;
}) {
  const isUser = message.role === 'user';
  const Icon = isUser ? User : Bot;

  return (
    <div
      className={cn(
        'flex gap-2 text-xs',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      {!isUser && (
        <span className='mt-1 grid size-6 shrink-0 place-items-center rounded-md border border-sky-400/25 bg-sky-500/10 text-sky-300'>
          <Icon className='size-3.5' />
        </span>
      )}
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-wrap break-words rounded-md border px-2.5 py-2 leading-relaxed',
          isUser
            ? 'border-primary/25 bg-primary/15 text-foreground'
            : 'border-[#434343] bg-[#1d1d1d] text-foreground/75',
          message.failed && 'border-red-400/30 bg-red-500/10 text-red-300',
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
