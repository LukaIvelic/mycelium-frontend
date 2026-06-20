import { cn } from '@/lib/utils';
import { SettingsRow } from './settings-row';
import type { SettingsSectionProps } from './settings-tab-panel.types';

export function SettingsSection({ section }: SettingsSectionProps) {
  return (
    <section
      className={cn(
        'w-full rounded-md border border-foreground/10 bg-background',
        'px-8 py-6',
      )}
    >
      <div className='mb-6'>
        <h2 className='font-medium'>{section.title}</h2>
        <p className='mt-1 text-sm text-foreground/50'>{section.description}</p>
      </div>
      <div className='flex flex-col divide-y divide-foreground/10'>
        {section.items.map((item) => (
          <SettingsRow key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}
