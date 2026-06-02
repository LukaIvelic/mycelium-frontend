'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useReducer, useRef, useTransition } from 'react';
import { Button } from '@/components/features/button/button';
import { Input } from '@/components/features/input/input';
import { MushroomCarousel } from '@/components/features/mushroom-carousel/mushroom-carousel';
import { useAuth } from '@/hooks/use-auth.hook';
import { cn } from '@/lib/utils';
import { createSignUpHandler } from '../auth.handlers';
import {
  createAuthSignupFieldChangeHandler,
  createAuthSignupInitialState,
  reduceAuthSignupFormState,
} from './auth-signup.reducer';
import { AuthSignupField, type AuthSignupProps } from './auth-signup.types';

export function AuthSignup({ initialEmail }: AuthSignupProps) {
  const [isLoading, startLoadingTransition] = useTransition();
  const [signupForm, dispatchSignupForm] = useReducer(
    reduceAuthSignupFormState,
    initialEmail,
    createAuthSignupInitialState,
  );

  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const { signUp } = useAuth();
  const { confirmPassword, email, firstName, lastName, password } = signupForm;
  const handleFirstNameChange = createAuthSignupFieldChangeHandler(
    dispatchSignupForm,
    AuthSignupField.FirstName,
  );
  const handleLastNameChange = createAuthSignupFieldChangeHandler(
    dispatchSignupForm,
    AuthSignupField.LastName,
  );
  const handleEmailChange = createAuthSignupFieldChangeHandler(
    dispatchSignupForm,
    AuthSignupField.Email,
  );
  const handlePasswordChange = createAuthSignupFieldChangeHandler(
    dispatchSignupForm,
    AuthSignupField.Password,
  );
  const handleConfirmPasswordChange = createAuthSignupFieldChangeHandler(
    dispatchSignupForm,
    AuthSignupField.ConfirmPassword,
  );
  const submitSignUp = createSignUpHandler({
    email,
    firstName,
    lastName,
    password,
    router,
    startLoadingTransition,
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
          onClick={submitSignUp}
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
