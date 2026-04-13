'use client';

import { Button } from '@/components/features/button';
import { Input } from '@/components/features/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Alternative, alternatives } from './_page.config';
import { useMyceliumAuth } from '@/hooks/use-mycelium-auth';
import { ProxyRoute } from '@/_proxy.utils';

export default function Page() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const { validateEmail } = useMyceliumAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleContinueClick = async () => {
    if (!emailRef.current) return;
    setIsLoading(true);
    const res = await validateEmail(emailRef.current.value);
    setIsLoading(false);
    if (res) router.push(ProxyRoute.LOGIN);
    else router.push(ProxyRoute.SIGNUP);
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
        <h1 className="text-xl font-medium">Log in or sign up</h1>
        <p>
          Untangle and visualize your microservice architecture using Mycelium
        </p>
      </div>

      <div className={cn('w-full', 'flex flex-col gap-2')}>
        <Input placeholder="Email address" type="text" ref={emailRef} />
        <Button
          className={cn(`inverted`)}
          onClick={handleContinueClick}
          isLoading={isLoading}
        >
          Continue
        </Button>
      </div>

      <div className="w-full relative opacity-20">
        <Separator className={cn('w-full bg-foreground/50')} />
        <span className="text-xs bg-background absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1">
          OR
        </span>
      </div>

      <div className={cn(`flex flex-col gap-2 w-full`)}>
        {alternatives.map((alternative: Alternative, index) => {
          return (
            <Button
              imageSrc={alternative.img}
              className={cn(
                `hover:bg-foreground/10 hover:border-foreground/10`,
              )}
              onClick={() => {}}
              icon={alternative.icon}
              key={index}
            >
              {alternative.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
