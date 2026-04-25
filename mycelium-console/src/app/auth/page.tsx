'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ProxyRoute } from '@/_proxy.utils';
import { Button } from '@/components/features/button';
import { Input } from '@/components/features/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth.hook';
import { cn } from '@/lib/utils';
import { type Alternative, alternatives } from './_page.config';

export default function Page() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const { validateEmail } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleContinueClick = async () => {
    const email = emailRef.current?.value;
    if (!email) return;

    setIsLoading(true);
    const res = await validateEmail(email);
    const isValid = res.exists;
    setIsLoading(false);

    router.push(isValid ? ProxyRoute.LOGIN : ProxyRoute.SIGNUP);
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
        <h1 className='text-xl font-medium'>Log in or sign up</h1>
        <p>
          Untangle and visualize your microservice architecture using Mycelium
        </p>
      </div>

      <div className={cn('w-full', 'flex flex-col gap-2')}>
        <Input placeholder='Email address' type='text' ref={emailRef} />
        <Button
          className={cn(`inverted`)}
          onClick={handleContinueClick}
          isLoading={isLoading}
        >
          Continue
        </Button>
      </div>

      <div className='w-full relative opacity-20'>
        <Separator className={cn('w-full bg-foreground/50')} />
        <span className='text-xs bg-background absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1'>
          OR
        </span>
      </div>

      <div className={cn(`flex flex-col gap-2 w-full`)}>
        {alternatives.map((alternative: Alternative) => {
          return (
            <Button
              imageSrc={alternative.img}
              className={cn(
                `hover:bg-foreground/10 hover:border-foreground/10`,
              )}
              onClick={() => {
                if (alternative.route) {
                  router.push(alternative.route);
                  return;
                }

                alternative.onClick?.();
              }}
              icon={alternative.icon}
              key={alternative.title}
              type='button'
            >
              {alternative.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
