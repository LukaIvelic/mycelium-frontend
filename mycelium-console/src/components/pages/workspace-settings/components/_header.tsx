import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { LayoutGrid, Plus } from 'lucide-react';

export function CreateProjectHeader() {
  return (
    <div
      className={cn(
        // 'border border-red-500',
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
          <span className="text-sm">3 Projects</span>
        </div>
        <Separator orientation="vertical" className={'bg-foreground/20'} />
        <div className="flex items-center gap-2 text-foreground/50">
          // To Do
        </div>
      </div>
    </div>
  );
}
