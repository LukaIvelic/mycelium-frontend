'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/features/button';
import { Input } from '@/components/features/input';
import { MushroomCarousel } from '@/components/features/mushroom-carousel';
import { useAuth } from '@/hooks/use-auth.hook';
import { cn } from '@/lib/utils';
import {
  createAuthFieldChangeHandler,
  createSignUpHandler,
} from '../auth.handlers';
import type { AuthSignupProps } from './auth-signup.types';

export function AuthSignup({ initialEmail }: AuthSignupProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const { signUp } = useAuth();
  const handleFirstNameChange = createAuthFieldChangeHandler(setFirstName);
  const handleLastNameChange = createAuthFieldChangeHandler(setLastName);
  const handleEmailChange = createAuthFieldChangeHandler(setEmail);
  const handlePasswordChange = createAuthFieldChangeHandler(setPassword);
  const handleConfirmPasswordChange =
    createAuthFieldChangeHandler(setConfirmPassword);
  const handleSignUp = createSignUpHandler({
    email,
    firstName,
    lastName,
    password,
    router,
    setIsLoading,
    signUp,
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
        <h1 className='text-xl font-medium'>Sign up for Mycelium</h1>
        <p>
          Untangle and visualize your microservice architecture using Mycelium
        </p>
      </div>

      <form className={cn('w-full', 'flex flex-col gap-2')}>
        <Input
          placeholder='First name'
          type='text'
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <Input
          placeholder='Last name'
          type='text'
          value={lastName}
          onChange={handleLastNameChange}
        />
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
        <Input
          placeholder='Confirm password'
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Button
          className={cn(`inverted`)}
          onClick={handleSignUp}
          isLoading={isLoading}
          type='button'
        >
          Sign up
        </Button>
      </form>

      <MushroomCarousel className='mt-20' />
    </div>
  );
}
