import { Input } from '@/components/features/input/input';
import { SettingsRow } from '../tab-content/_components/settings-tab-panel/settings-row';
import type { ProfileFieldProps } from './profile.types';

export function ProfileField({ field }: ProfileFieldProps) {
  return (
    <SettingsRow label={field.label} description={field.description}>
      <div className='w-full md:w-80'>
        <Input
          className='h-min rounded-[8px]'
          placeholder={field.placeholder}
          defaultValue={field.defaultValue ?? ''}
          type={field.type}
        />
      </div>
    </SettingsRow>
  );
}
