import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { createApiKeyNameChangeHandler } from '../generate-api-key.handlers';
import type { ApiKeyNameInputProps } from '../generate-api-key.types';

export function ApiKeyNameInput({ onChange }: ApiKeyNameInputProps) {
  const handleChange = createApiKeyNameChangeHandler(onChange);

  return (
    <Input
      placeholder='API key name'
      onChange={handleChange}
      className={cn(
        'rounded-sm border-foreground/10',
        'outline-none focus-visible:ring-0 placeholder:text-foreground/50',
      )}
    />
  );
}
