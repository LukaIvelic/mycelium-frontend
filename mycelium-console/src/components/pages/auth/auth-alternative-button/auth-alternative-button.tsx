'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/features/button';
import { cn } from '@/lib/utils';
import type { AuthAlternativeButtonProps } from '../auth.types';
import { createAlternativeClickHandler } from './auth-alternative-button.handlers';

export function AuthAlternativeButton({
  alternative,
}: AuthAlternativeButtonProps) {
  const router = useRouter();
  const handleClick = createAlternativeClickHandler(router, alternative);

  return (
    <Button
      imageSrc={alternative.img}
      className={cn('hover:bg-foreground/10 hover:border-foreground/10')}
      onClick={handleClick}
      icon={alternative.icon}
      type='button'
    >
      {alternative.title}
    </Button>
  );
}
