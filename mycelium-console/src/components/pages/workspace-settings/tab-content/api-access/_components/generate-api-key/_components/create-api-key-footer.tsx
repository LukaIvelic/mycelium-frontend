import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CreateApiKeyFooterProps } from '../generate-api-key.types';

export function CreateApiKeyFooter({ onClose }: CreateApiKeyFooterProps) {
  return (
    <div className={cn('w-full p-4 pt-2', 'flex justify-start')}>
      <Button
        size='default'
        className={cn('w-20', 'rounded-sm', 'hover:cursor-pointer')}
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
}
