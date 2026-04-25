'use client';

import { Check, Copy, KeyRound } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ApiKeyCopyField({ apiKey }: { apiKey: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        'h-fit w-full px-4 py-2',
        'relative',
        'border border-foreground/10 rounded-md bg-[#1d1d1d]',
      )}
    >
      <div className={cn('gap-3', 'flex items-center')}>
        <KeyRound className={cn('text-foreground')} size={18} />
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
        {copied ? <Check size={20} /> : <Copy size={20} />} &nbsp;
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </div>
  );
}
