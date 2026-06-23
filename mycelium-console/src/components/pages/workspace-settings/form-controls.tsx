import type { ChangeEvent, ReactNode } from 'react';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { Switch } from '@/components/ui/switch/switch';
import { Textarea } from '@/components/ui/textarea/textarea';
import { cn } from '@/lib/utils';

export type FormMessage = {
  tone: 'error' | 'success';
  text: string;
};

export const FIELD_CLASS = cn(
  'rounded-md border-foreground/10 bg-[#1d1d1d]',
  'outline-none focus-visible:ring-0 focus-visible:border-foreground/20',
  'placeholder:text-foreground/35',
);

export function SettingsCard({
  action,
  children,
  description,
  title,
}: {
  action?: ReactNode;
  children: ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <section className='w-full overflow-hidden rounded-md border border-foreground/10 bg-background'>
      <div className='flex items-start justify-between gap-4 border-b border-foreground/10 px-8 py-6'>
        <div className='min-w-0'>
          <h2 className='font-medium'>{title}</h2>
          {description && (
            <p className='mt-2 text-sm text-foreground/50'>{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className='px-8 py-6'>{children}</div>
    </section>
  );
}

export function WorkspaceEmptyState({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return <Skeleton className='h-40 w-full' />;
  }

  return (
    <SettingsCard title='Workspace'>
      <p className='text-sm text-foreground/50'>No workspace selected.</p>
    </SettingsCard>
  );
}

export function TextField({
  disabled,
  label,
  onChange,
  placeholder,
  value,
}: {
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  const id = `workspace-settings-${label.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <div className='grid gap-1.5'>
      <label htmlFor={id} className='text-sm text-foreground/50'>
        {label}
      </label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={FIELD_CLASS}
      />
    </div>
  );
}

export function NumberField({
  disabled,
  label,
  min,
  max,
  onChange,
  value,
}: {
  disabled?: boolean;
  label: string;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <TextField
      label={label}
      value={String(value)}
      disabled={disabled}
      onChange={(nextValue) => {
        const numeric = Number(nextValue);
        if (Number.isNaN(numeric)) return;
        const nextMin = min ?? numeric;
        const nextMax = max ?? numeric;
        onChange(Math.min(Math.max(numeric, nextMin), nextMax));
      }}
    />
  );
}

export function TextareaField({
  disabled,
  label,
  onChange,
  placeholder,
  value,
}: {
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  const id = `workspace-settings-${label.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <div className='grid gap-1.5'>
      <label htmlFor={id} className='text-sm text-foreground/50'>
        {label}
      </label>
      <Textarea
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={cn('min-h-24 resize-none', FIELD_CLASS)}
      />
    </div>
  );
}

export function ToggleField({
  checked,
  description,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  description: string;
  disabled?: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className='flex items-center justify-between gap-4 py-3'>
      <div className='min-w-0'>
        <div className='text-sm text-foreground/80'>{label}</div>
        <div className='mt-0.5 text-xs text-foreground/45'>{description}</div>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        className={cn(disabled && 'cursor-not-allowed opacity-50')}
      />
    </div>
  );
}

export function SelectField<T extends string>({
  disabled,
  label,
  onChange,
  options,
  value,
}: {
  disabled?: boolean;
  label: string;
  onChange: (value: T) => void;
  options: T[];
  value: T;
}) {
  const id = `workspace-settings-${label.toLowerCase().replaceAll(' ', '-')}`;

  return (
    <div className='grid gap-1.5'>
      <label htmlFor={id} className='text-sm text-foreground/50'>
        {label}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value as T)
        }
        className={cn(
          'h-8 w-full rounded-md border border-foreground/10 bg-[#1d1d1d] px-2.5 text-sm text-foreground outline-none',
          'focus:border-foreground/20 disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SaveResetActions({
  canManage,
  isPending,
  onReset,
}: {
  canManage: boolean;
  isPending: boolean;
  onReset?: () => void;
}) {
  return (
    <div className='flex items-center gap-2'>
      {onReset && (
        <Button
          type='button'
          variant='ghost'
          size='sm'
          disabled={!canManage || isPending}
          onClick={onReset}
          className='border border-foreground/10 text-foreground/60'
        >
          Reset
        </Button>
      )}
      <Button type='submit' size='sm' disabled={!canManage || isPending}>
        Save
      </Button>
    </div>
  );
}

export function FormStatus({ message }: { message: FormMessage | null }) {
  if (!message) return null;

  return (
    <p
      className={cn(
        'mt-4 text-sm',
        message.tone === 'error' ? 'text-red-300' : 'text-emerald-300',
      )}
    >
      {message.text}
    </p>
  );
}

export function ReadOnlyNote({ canManage }: { canManage: boolean }) {
  if (canManage) return null;

  return (
    <p className='mt-4 text-xs text-foreground/40'>
      Owner or admin access is required to edit these settings.
    </p>
  );
}
