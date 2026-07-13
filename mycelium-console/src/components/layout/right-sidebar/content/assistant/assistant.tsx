'use client';

import {
  ArrowUpRight,
  Brain,
  Check,
  ChevronDown,
  Send,
  Square,
  Trash2,
} from 'lucide-react';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { AssistantService } from '@/api/services/assistant/assistant-service';
import { Button } from '@/components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu';
import { Spinner } from '@/components/ui/spinner/spinner';
import { Switch } from '@/components/ui/switch/switch';
import { Textarea } from '@/components/ui/textarea/textarea';
import type { AssistantModel } from '@/lib/types/assistant';
import { cn } from '@/lib/utils';
import {
  ASSISTANT_DEFAULT_MODEL,
  ASSISTANT_DEFAULT_THINKING,
  ASSISTANT_EMPTY_PROMPTS,
  ASSISTANT_MODEL_OPTIONS,
  ASSISTANT_MODEL_STORAGE_KEY,
  ASSISTANT_THINKING_STORAGE_KEY,
  createAssistantMessage,
  isAssistantModel,
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
  const [selectedModel, setSelectedModel] = useState<AssistantModel>(
    ASSISTANT_DEFAULT_MODEL,
  );
  const [thinkingEnabled, setThinkingEnabled] = useState(
    ASSISTANT_DEFAULT_THINKING,
  );
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const draftRef = useRef<HTMLTextAreaElement | null>(null);
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

  useEffect(() => {
    const storedModel = readAssistantPreference(ASSISTANT_MODEL_STORAGE_KEY);
    if (isAssistantModel(storedModel)) setSelectedModel(storedModel);

    const storedThinking = readAssistantPreference(
      ASSISTANT_THINKING_STORAGE_KEY,
    );
    if (storedThinking === 'true') setThinkingEnabled(true);
    else if (storedThinking === 'false') setThinkingEnabled(false);

    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;

    writeAssistantPreference(ASSISTANT_MODEL_STORAGE_KEY, selectedModel);
    writeAssistantPreference(
      ASSISTANT_THINKING_STORAGE_KEY,
      String(thinkingEnabled),
    );
  }, [preferencesLoaded, selectedModel, thinkingEnabled]);

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
    const controller = new AbortController();

    abortControllerRef.current = controller;
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
        {
          messages: payloadMessages,
          model: selectedModel,
          projectId,
          thinking: thinkingEnabled,
        },
        {
          onDelta: (delta) =>
            updateAssistant((message) => ({
              ...message,
              content: message.content + delta,
            })),
          signal: controller.signal,
        },
      );
      updateAssistant((message) => ({ ...message, streaming: false }));
    } catch (error) {
      if (isAbortError(error)) {
        updateAssistant((message) => ({
          ...message,
          content: message.content,
          stopped: true,
          streaming: false,
        }));
        return;
      }

      const errorMessage = getAssistantErrorMessage(error);
      updateAssistant((message) => ({
        ...message,
        content: errorMessage,
        failed: true,
        streaming: false,
      }));
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setIsStreaming(false);
      requestAnimationFrame(() => draftRef.current?.focus());
    }
  };

  const handleSubmit = () => {
    void sendMessage(draft);
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
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
        <div className='flex min-w-0 items-center gap-2'>
          <span className='truncate text-sm font-medium text-foreground/85'>
            Assistant
          </span>
          {isStreaming && (
            <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#3f3f3f] bg-[#202020] px-2 py-0.5 text-[0.65rem] text-foreground/55'>
              <Spinner className='size-3' />
              Thinking
            </span>
          )}
        </div>
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
        <div
          className={cn(
            'rounded-md border border-[#3a3a3a] bg-[#1a1a1a] transition-colors focus-within:border-[#5b5b5b] focus-within:bg-[#1d1d1d]',
            isStreaming && 'border-[#474747] bg-[#1c1c1c]',
          )}
        >
          <AssistantComposerControls
            disabled={isStreaming}
            onModelChange={setSelectedModel}
            onThinkingChange={setThinkingEnabled}
            selectedModel={selectedModel}
            thinkingEnabled={thinkingEnabled}
          />
          <Textarea
            aria-label='Ask the assistant'
            className='max-h-32 min-h-9 resize-none border-0 bg-transparent px-3 pt-2.5 pb-1 text-sm leading-relaxed placeholder:text-foreground/30 focus-visible:border-0 focus-visible:ring-0 disabled:cursor-default disabled:bg-transparent disabled:text-foreground/70 disabled:opacity-100 dark:bg-transparent dark:disabled:bg-transparent'
            disabled={isStreaming}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleDraftKeyDown}
            placeholder='Ask about this project...'
            ref={draftRef}
            value={draft}
          />
          <div className='flex items-center justify-between gap-2 px-2.5 pb-2'>
            <span className='flex select-none items-center gap-1 text-[0.65rem] text-foreground/30'>
              {isStreaming ? (
                <>
                  <Spinner className='size-3' />
                  Streaming response
                </>
              ) : (
                <>
                  <kbd className='rounded border border-[#3a3a3a] bg-[#262626] px-1 py-px font-sans text-[0.6rem] text-foreground/45'>
                    Enter
                  </kbd>
                  to send
                </>
              )}
            </span>
            <Button
              aria-label={isStreaming ? 'Stop response' : 'Send message'}
              className={cn(
                'size-7 rounded-md',
                isStreaming &&
                  'bg-[#262626] text-foreground/70 hover:bg-[#303030] hover:text-foreground',
              )}
              disabled={!isStreaming && !draft.trim()}
              onClick={isStreaming ? handleStop : handleSubmit}
              size='icon-sm'
              variant={isStreaming ? 'ghost' : 'default'}
            >
              {isStreaming ? (
                <Square className='size-3 fill-current' />
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

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

function readAssistantPreference(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeAssistantPreference(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  }
}

function AssistantComposerControls({
  disabled,
  onModelChange,
  onThinkingChange,
  selectedModel,
  thinkingEnabled,
}: {
  disabled: boolean;
  onModelChange: (model: AssistantModel) => void;
  onThinkingChange: (enabled: boolean) => void;
  selectedModel: AssistantModel;
  thinkingEnabled: boolean;
}) {
  const selectedModelOption =
    ASSISTANT_MODEL_OPTIONS.find((option) => option.value === selectedModel) ??
    ASSISTANT_MODEL_OPTIONS[0];

  return (
    <div className='flex items-center justify-between gap-2 border-b border-[#2d2d2d] px-2.5 py-2'>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          aria-label='Select assistant model'
          className={cn(
            'flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-foreground/65 outline-hidden transition-colors hover:bg-white/5 hover:text-foreground',
            disabled && 'pointer-events-none opacity-50',
          )}
          disabled={disabled}
        >
          <span className='text-[0.62rem] text-foreground/35 uppercase'>
            Model
          </span>
          <span className='font-medium'>{selectedModelOption.label}</span>
          <ChevronDown className='size-3 text-foreground/35' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-52'>
          {ASSISTANT_MODEL_OPTIONS.map((option) => (
            <DropdownMenuItem
              className='items-start justify-between gap-3'
              key={option.value}
              onClick={() => onModelChange(option.value)}
            >
              <span className='flex min-w-0 flex-col gap-0.5'>
                <span className='text-sm font-medium'>{option.label}</span>
                <span className='text-xs text-foreground/45'>
                  {option.description}
                </span>
              </span>
              {option.value === selectedModel ? (
                <Check className='mt-0.5 size-3.5 text-foreground/65' />
              ) : (
                <span className='size-3.5' />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div
        className={cn(
          'flex h-7 items-center gap-2 rounded-md px-2 text-xs text-foreground/60 transition-colors',
          disabled ? 'opacity-50' : 'hover:bg-white/5 hover:text-foreground/80',
        )}
      >
        <Brain className='size-3.5 text-foreground/35' />
        <span>Thinking</span>
        <Switch
          aria-label='Toggle assistant thinking'
          checked={thinkingEnabled}
          className='h-5 w-9'
          disabled={disabled}
          onCheckedChange={onThinkingChange}
        />
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
          'break-words whitespace-pre-wrap text-base font-medium text-foreground/90',
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
        'mt-2 break-words text-sm leading-relaxed',
        message.failed ? 'text-red-300' : 'text-foreground/70',
      )}
    >
      {isAwaitingFirstToken ? (
        <span className='flex items-center gap-2 text-foreground/45'>
          <Spinner className='size-3.5' />
          Thinking...
        </span>
      ) : (
        <>
          {message.content ? (
            <AssistantMarkdown failed={message.failed}>
              {message.content}
            </AssistantMarkdown>
          ) : null}
          {message.stopped && (
            <span className='mt-1 inline-flex text-xs text-foreground/35'>
              Stopped
            </span>
          )}
        </>
      )}
    </div>
  );
}
