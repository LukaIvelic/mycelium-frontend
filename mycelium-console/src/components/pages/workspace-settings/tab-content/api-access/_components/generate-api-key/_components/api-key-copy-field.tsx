'use client';

import { Check, Copy, KeyRound } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  API_KEY_ACTION_ICON_SIZE,
  API_KEY_COPIED_LABEL,
  API_KEY_COPY_LABEL,
  API_KEY_KEY_ICON_SIZE,
} from '../generate-api-key.config';
import { createApiKeyCopyHandler } from '../generate-api-key.handlers';
import type { ApiKeyCopyFieldProps } from '../generate-api-key.types';

export function ApiKeyCopyField({ apiKey }: ApiKeyCopyFieldProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = createApiKeyCopyHandler(apiKey, setCopied);
  const copyIcon = copied ? (
    <Check size={API_KEY_ACTION_ICON_SIZE} />
  ) : (
    <Copy size={API_KEY_ACTION_ICON_SIZE} />
  );
  const copyLabel = copied ? API_KEY_COPIED_LABEL : API_KEY_COPY_LABEL;

  return (
    <div
      className={cn(
        'h-fit w-full px-4 py-2',
        'relative',
        'border border-foreground/10 rounded-md bg-[#1d1d1d]',
      )}
    >
      <div className={cn('gap-3', 'flex items-center')}>
        <KeyRound
          className={cn('text-foreground')}
          size={API_KEY_KEY_ICON_SIZE}
        />
        <div className='scroll-auto w-100 overflow-scroll no-scrollbar'>
          {apiKey}
        </div>
      </div>
      <Button
        size='sm'
        onClick={handleCopy}
        className={cn(
          'w-20',
          'absolute right-1 inset-y-0 my-auto',
          'rounded-sm',
          'hover:cursor-pointer',
        )}
      >
        {copyIcon} &nbsp;
        {copyLabel}
      </Button>
    </div>
  );
}
