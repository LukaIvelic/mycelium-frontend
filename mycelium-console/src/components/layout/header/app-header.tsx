'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProjectActivities } from './project-activities/project-activities';

export function AppHeader() {
  const pathname = usePathname();
  const isProjectRoute = /^\/projects\/[^/]+$/.test(pathname);

  return (
    <header className={cn('h-12 px-4', 'grid grid-cols-4 items-center')}>
      <div className="col-start-4 justify-self-end flex items-center gap-2">
        {isProjectRoute && <ProjectActivities />}
      </div>
    </header>
  );
}
