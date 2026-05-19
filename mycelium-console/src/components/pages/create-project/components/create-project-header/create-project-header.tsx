'use client';

import { LayoutGrid, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';

import { CreateProjectCommand } from '../create-dialog/create-project-command';
import {
  CREATE_PROJECT_DEFAULT_COUNT,
  CREATE_PROJECT_FALLBACK_USER_ID,
  CREATE_PROJECT_GRID_ICON_SIZE,
} from './create-project-header.config';
import { createOpenCreateProjectDialogHandler } from './create-project-header.handlers';

export function CreateProjectHeader() {
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const { useMe, useUserProjectsCount } = useUsers();
  const { data: user } = useMe();
  const userId = user?.id ?? CREATE_PROJECT_FALLBACK_USER_ID;
  const { data: projectCount = CREATE_PROJECT_DEFAULT_COUNT } =
    useUserProjectsCount(userId);
  const handleOpenCreateProjectDialog =
    createOpenCreateProjectDialogHandler(setCreateOpen);

  return (
    <div className={cn('grid grid-cols-4 grid-rows-2 items-center')}>
      <h1 className='col-1 text-[32px] font-medium'>Projects</h1>

      <Button
        size={'lg'}
        className={cn(
          'col-4 w-fit',
          'justify-self-end',
          'hover:cursor-pointer',
        )}
        onClick={handleOpenCreateProjectDialog}
      >
        <Plus /> <span className='text-base font-normal'>New</span>
      </Button>
      <CreateProjectCommand open={createOpen} onOpenChange={setCreateOpen} />

      <div className={cn('col-1 row-2', 'flex gap-2')}>
        <div className='flex items-center gap-2 text-foreground/50'>
          <LayoutGrid size={CREATE_PROJECT_GRID_ICON_SIZE} />
          <span className='text-sm'>{projectCount} Projects</span>
        </div>
        <Separator orientation='vertical' className={'bg-foreground/20'} />
        <div className='flex items-center gap-2 text-foreground/50'>
          <span>To Do</span>
        </div>
      </div>
    </div>
  );
}
