import { Input } from '@/components/ui/input/input';
import { cn } from '@/lib/utils';
import { createApiKeyNameChangeHandler } from '../generate-api-key.handlers';
import type { ApiKeyNameInputProps } from '../generate-api-key.types';

export function ApiKeyNameInput({ onChange }: ApiKeyNameInputProps) {
  const updateApiKeyName = createApiKeyNameChangeHandler(onChange);

  return (
    <Input
      placeholder='API key name'
      onChange={updateApiKeyName}
      className={cn(
        'rounded-sm border-foreground/10',
        'outline-none focus-visible:ring-0 placeholder:text-foreground/50',
      )}
    />
  );
}
