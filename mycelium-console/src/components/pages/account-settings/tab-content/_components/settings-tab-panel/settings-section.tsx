import { cn } from '@/lib/utils';
import type { SettingsSectionProps } from './settings-tab-panel.types';

export function SettingsSection({
  children,
  description,
  title,
}: SettingsSectionProps) {
  return (
    <section
      className={cn(
        'w-full rounded-md border border-foreground/10 bg-background',
        'px-8 py-6',
      )}
    >
      <div className='mb-6'>
        <h2 className='font-medium'>{title}</h2>
        <p className='mt-1 text-sm text-foreground/50'>{description}</p>
      </div>
      <div className='flex flex-col divide-y divide-foreground/10'>
        {children}
      </div>
    </section>
  );
}
