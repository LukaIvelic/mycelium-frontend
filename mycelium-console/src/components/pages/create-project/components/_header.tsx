"use client";

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';
import { LayoutGrid, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CreateProjectHeader() {

  const { getProjectsCount, findMe } = useUsers();
  const [projectCount, setProjectCount] = useState<number>(0);
  const [tokenVersion, setTokenVersion] = useState(0);

  useEffect(() => {
    const handleTokenChange = () => {
      setTokenVersion((version) => version + 1);
    };

    window.addEventListener('mycelium:access-token-changed', handleTokenChange);
    return () => {
      window.removeEventListener(
        'mycelium:access-token-changed',
        handleTokenChange,
      );
    };
  }, []);

  useEffect(() => {
    (async () => {
      const user = await findMe();
      if (!user) {
        setProjectCount(0);
      }else {
        const count = await getProjectsCount(user.id);
        setProjectCount(count);
      }
    })();
  }, [getProjectsCount, tokenVersion]);

  return (
    <div
      className={cn(
        'grid grid-cols-4 grid-rows-2 items-center',
      )}
    >
      <h1 className="col-1 text-[32px] font-medium">Projects</h1>

      <Button
        size={'lg'}
        className={cn(
          'col-4 w-fit',
          'justify-self-end',
          'hover:cursor-pointer',
        )}
      >
        <Plus /> <span className="text-base font-normal">New</span>
      </Button>

      <div className={cn('col-1 row-2', 'flex gap-2')}>
        <div className="flex items-center gap-2 text-foreground/50">
          <LayoutGrid size={16} />
          <span className="text-sm">{projectCount} Projects</span>
        </div>
        <Separator orientation="vertical" className={'bg-foreground/20'} />
        <div className="flex items-center gap-2 text-foreground/50">
          <span>To Do</span>
        </div>
      </div>
    </div>
  );
}
