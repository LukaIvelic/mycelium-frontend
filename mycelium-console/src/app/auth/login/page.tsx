'use client';

import { Button } from '@/components/features/button';
import { Input } from '@/components/features/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useMyceliumAuth } from '@/hooks/use-mycelium-auth';
import { MushroomCarousel } from '@/components/features/mushroom_carousel';

export default function Page() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useMyceliumAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleContinueClick = async () => {
    if (!emailRef.current || !passwordRef.current) return;
    setIsLoading(true);
    const res = await login(emailRef.current.value, passwordRef.current.value);
    setIsLoading(false);
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
        <h1 className="text-xl font-medium">Log into Mycelium</h1>
        <p>
          Untangle and visualize your microservice architecture using Mycelium
        </p>
      </div>

      <div className={cn('w-full', 'flex flex-col gap-2')}>
        <Input placeholder="Email address" type="text" ref={emailRef} />
        <Input placeholder="Password" type="password" ref={passwordRef} />
        <Button
          className={cn(`inverted`)}
          onClick={handleContinueClick}
          isLoading={isLoading}
        >
          Continue
        </Button>
      </div>

      <MushroomCarousel className='mt-20'/>
    </div>
  );
}
