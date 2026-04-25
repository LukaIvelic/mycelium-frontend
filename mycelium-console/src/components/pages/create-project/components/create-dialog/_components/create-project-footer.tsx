import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CreateProjectFooterProps {
  onClose: () => void;
  onSubmit: () => void;
  canCreate: boolean;
}

export function CreateProjectFooter({
  onClose,
  onSubmit,
  canCreate,
}: CreateProjectFooterProps) {
  return (
    <div className={cn('w-full p-4 pt-2 gap-2', 'flex flex-col')}>
      <Button
        size='default'
        disabled={!canCreate}
        className={cn(
          'w-full rounded-sm',
          'hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        )}
        onClick={onSubmit}
      >
        Create
      </Button>
      <Button
        size='default'
        variant='outline'
        className={cn('w-full rounded-sm', 'hover:cursor-pointer')}
        onClick={onClose}
      >
        Cancel
      </Button>
    </div>
  );
}
