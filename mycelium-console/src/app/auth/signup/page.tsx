'use client';

import { Button } from '@/components/features/button';
import { Input } from '@/components/features/input';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { MushroomCarousel } from '@/components/features/mushroom-carousel';
import { useRouter } from 'next/navigation';
import { ProxyRoute } from '@/_proxy.utils';
import { useAuth } from '@/hooks/use-auth.hook';

export default function Page() {
  const router = useRouter();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    if (
      !firstNameRef.current ||
      !lastNameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current
    )
      return;
    setIsLoading(true);
    await signUp({
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    setIsLoading(false);
    router.push(ProxyRoute.DEFAULT);
  };

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
        <h1 className="text-xl font-medium">Sign up for Mycelium</h1>
        <p>
          Untangle and visualize your microservice architecture using Mycelium
        </p>
      </div>

      <form className={cn('w-full', 'flex flex-col gap-2')}>
        <Input placeholder="First name" type="text" ref={firstNameRef} />
        <Input placeholder="Last name" type="text" ref={lastNameRef} />
        <Input placeholder="Email address" type="email" ref={emailRef} />
        <Input placeholder="Password" type="password" ref={passwordRef} />
        <Input
          placeholder="Confirm password"
          type="password"
          ref={confirmPasswordRef}
        />
        <Button
          className={cn(`inverted`)}
          onClick={handleSignUp}
          isLoading={isLoading}
          type="button"
        >
          Sign up
        </Button>
      </form>

      <MushroomCarousel className="mt-20" />
    </div>
  );
}
