'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Button } from '@/components/features/button/button';
import { Input } from '@/components/features/input/input';
import { Separator } from '@/components/ui/separator/separator';
import { useAuth } from '@/hooks/use-auth.hook';
import { cn } from '@/lib/utils';
import {
  createAuthFieldChangeHandler,
  createContinueClickHandler,
  createContinueSubmitHandler,
} from '../auth.handlers';
import { AuthAlternativeButton } from '../auth-alternative-button/auth-alternative-button';
import { alternatives } from './auth-entry.config';

export function AuthEntry() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, startLoadingTransition] = useTransition();

  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const { validateEmail } = useAuth();
  const handleEmailChange = createAuthFieldChangeHandler(setEmail);
  const continueWithEmail = createContinueClickHandler({
    email,
    onError: setError,
    router,
    startLoadingTransition,
    validateEmail,
  });
  const submitEmailContinuation =
    createContinueSubmitHandler(continueWithEmail);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        'w-81.25',
        'flex flex-col justify-start items-center gap-8',
        'translate-y-[calc(25vh/2)]',
      )}
    >
      <div className={cn('flex flex-col gap-2', 'text-center')}>
        <h1 className='text-xl font-medium'>Log in or sign up</h1>
        <p>
          Untangle and visualize your microservice architecture using Mycelium
        </p>
      </div>

      <form
        className={cn('w-full', 'flex flex-col gap-2')}
        onSubmit={submitEmailContinuation}
      >
        <Input
          placeholder='Email address'
          type='email'
          ref={emailRef}
          value={email}
          onChange={handleEmailChange}
        />
        <Button className={cn(`inverted`)} isLoading={isLoading} type='submit'>
          Continue with email
        </Button>
        {error && (
          <p className='text-sm text-destructive' role='alert'>
            {error}
          </p>
        )}
      </form>

      <div className='w-full relative opacity-20'>
        <Separator className={cn('w-full bg-foreground/50')} />
        <span className='text-xs bg-background absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1'>
          OR
        </span>
      </div>

      <div className={cn(`flex flex-col gap-2 w-full`)}>
        {alternatives.map((alternative) => {
          return (
            <AuthAlternativeButton
              alternative={alternative}
              key={alternative.title}
            />
          );
        })}
      </div>
    </div>
  );
}
