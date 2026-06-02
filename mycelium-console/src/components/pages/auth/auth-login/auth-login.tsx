'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Button } from '@/components/features/button/button';
import { Input } from '@/components/features/input/input';
import { MushroomCarousel } from '@/components/features/mushroom-carousel/mushroom-carousel';
import { useAuth } from '@/hooks/use-auth.hook';
import { cn } from '@/lib/utils';
import {
  createAuthFieldChangeHandler,
  createLoginHandler,
} from '../auth.handlers';
import type { AuthLoginProps } from './auth-login.types';

export function AuthLogin({ initialEmail }: AuthLoginProps) {
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>('');
  const [isLoading, startLoadingTransition] = useTransition();

  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const { logIn } = useAuth();
  const handleEmailChange = createAuthFieldChangeHandler(setEmail);
  const handlePasswordChange = createAuthFieldChangeHandler(setPassword);
  const logInWithEmail = createLoginHandler({
    email,
    logIn,
    password,
    router,
    startLoadingTransition,
  });

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
        <h1 className='text-xl font-medium'>Welcome back</h1>
        <p>
          Untangle and visualize your microservice architecture using Mycelium
        </p>
      </div>

      <div className={cn('w-full', 'flex flex-col gap-2')}>
        <Input
          placeholder='Email address'
          type='email'
          ref={emailRef}
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          placeholder='Password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          className={cn(`inverted`)}
          onClick={logInWithEmail}
          isLoading={isLoading}
        >
          Log in
        </Button>
      </div>

      <MushroomCarousel className='mt-20' />
    </div>
  );
}
