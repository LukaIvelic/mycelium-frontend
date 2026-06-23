import { type FormEvent, useEffect, useState } from 'react';
import type { UserNotificationSettings } from '@/api/services/user-profile/user-profile-service.types';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { Switch } from '@/components/ui/switch/switch';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { cn } from '@/lib/utils';
import { SettingsRow } from '../_components/settings-tab-panel/settings-row';
import { SettingsSection } from '../_components/settings-tab-panel/settings-section';

type NotificationSettingsForm = Omit<
  UserNotificationSettings,
  'createdAt' | 'updatedAt' | 'userId'
>;

type FormMessage = {
  tone: 'error' | 'success';
  text: string;
};

const dayOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const fieldClass = cn(
  'h-8 rounded-md border-foreground/10 bg-[#1d1d1d]',
  'outline-none focus-visible:ring-0 focus-visible:border-foreground/20',
);

const fallbackNotificationSettings: NotificationSettingsForm = {
  productUpdates: true,
  workspaceActivity: true,
  securityNotices: true,
  dailyDigestTime: '09:00',
  weeklyReportDay: 'Friday',
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
};

/**
 * Coerces a value coming from the untyped API response into a real boolean.
 * The API can serialize booleans as the strings `"true"`/`"false"`; passing
 * those straight to a controlled `<Switch checked>` makes React warn and
 * makes the PATCH payload fail backend `@IsBoolean()` validation.
 */
function toBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function toNotificationSettingsForm(
  settings: UserNotificationSettings | undefined,
): NotificationSettingsForm {
  return {
    productUpdates: toBoolean(
      settings?.productUpdates,
      fallbackNotificationSettings.productUpdates,
    ),
    workspaceActivity: toBoolean(
      settings?.workspaceActivity,
      fallbackNotificationSettings.workspaceActivity,
    ),
    securityNotices: toBoolean(
      settings?.securityNotices,
      fallbackNotificationSettings.securityNotices,
    ),
    dailyDigestTime:
      settings?.dailyDigestTime ?? fallbackNotificationSettings.dailyDigestTime,
    weeklyReportDay:
      settings?.weeklyReportDay ?? fallbackNotificationSettings.weeklyReportDay,
    quietHoursStart:
      settings?.quietHoursStart ?? fallbackNotificationSettings.quietHoursStart,
    quietHoursEnd:
      settings?.quietHoursEnd ?? fallbackNotificationSettings.quietHoursEnd,
  };
}

export function Notifications() {
  const [form, setForm] = useState<NotificationSettingsForm>(
    fallbackNotificationSettings,
  );
  const [message, setMessage] = useState<FormMessage | null>(null);
  const {
    useNotificationSettings,
    useResetNotificationSettings,
    useUpdateNotificationSettings,
  } = useUserProfile();
  const { data, isLoading } = useNotificationSettings();
  const updateSettings = useUpdateNotificationSettings();
  const resetSettings = useResetNotificationSettings();
  const isPending = updateSettings.isPending || resetSettings.isPending;

  useEffect(() => {
    setForm(toNotificationSettingsForm(data));
    setMessage(null);
  }, [data]);

  if (isLoading) {
    return <Skeleton className='h-80 w-full' />;
  }

  function updateForm<K extends keyof NotificationSettingsForm>(
    key: K,
    value: NotificationSettingsForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    try {
      await updateSettings.mutateAsync(form);
      setMessage({ tone: 'success', text: 'Notification preferences saved.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to save notification preferences.',
      });
    }
  }

  async function handleReset() {
    setMessage(null);

    try {
      await resetSettings.mutateAsync();
      setMessage({ tone: 'success', text: 'Notification preferences reset.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to reset notification preferences.',
      });
    }
  }

  return (
    <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit}>
      <SettingsSection
        title='Delivery Preferences'
        description='Personal notification defaults for workspace events and account activity.'
      >
        <SettingsRow
          label='Product updates'
          description='Release notes, feature changes, and console updates.'
        >
          <Switch
            checked={form.productUpdates}
            disabled={isPending}
            onCheckedChange={(checked) => updateForm('productUpdates', checked)}
          />
        </SettingsRow>
        <SettingsRow
          label='Workspace activity'
          description='Project changes, member updates, and API key events.'
        >
          <Switch
            checked={form.workspaceActivity}
            disabled={isPending}
            onCheckedChange={(checked) =>
              updateForm('workspaceActivity', checked)
            }
          />
        </SettingsRow>
        <SettingsRow
          label='Security notices'
          description='Password changes, new sessions, and account risk events.'
        >
          <Switch
            checked={form.securityNotices}
            disabled={isPending}
            onCheckedChange={(checked) =>
              updateForm('securityNotices', checked)
            }
          />
        </SettingsRow>
        <SettingsRow
          label='Preference changes'
          description='Save or restore your account notification settings.'
        >
          <div className='flex items-center gap-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              disabled={isPending}
              onClick={handleReset}
              className='border border-foreground/10 text-foreground/60'
            >
              Reset
            </Button>
            <Button type='submit' size='sm' disabled={isPending}>
              Save
            </Button>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title='Notification Schedule'
        description='Delivery windows for account-level summaries and reminders.'
      >
        <SettingsRow
          label='Daily digest'
          description='Summary of workspace activity for the previous day.'
        >
          <Input
            type='time'
            value={form.dailyDigestTime}
            disabled={isPending}
            onChange={(event) =>
              updateForm('dailyDigestTime', event.target.value)
            }
            className={cn('w-36', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Weekly report'
          description='Personal overview of projects, alerts, and usage.'
        >
          <select
            value={form.weeklyReportDay}
            disabled={isPending}
            onChange={(event) =>
              updateForm('weeklyReportDay', event.target.value)
            }
            className={cn('w-40 px-2.5 text-sm', fieldClass)}
          >
            {dayOptions.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </SettingsRow>
        <SettingsRow
          label='Quiet hours'
          description='Reduce non-critical notifications outside work hours.'
        >
          <div className='grid grid-cols-2 gap-2'>
            <Input
              type='time'
              value={form.quietHoursStart}
              disabled={isPending}
              onChange={(event) =>
                updateForm('quietHoursStart', event.target.value)
              }
              className={cn('w-32', fieldClass)}
            />
            <Input
              type='time'
              value={form.quietHoursEnd}
              disabled={isPending}
              onChange={(event) =>
                updateForm('quietHoursEnd', event.target.value)
              }
              className={cn('w-32', fieldClass)}
            />
          </div>
        </SettingsRow>
      </SettingsSection>

      {message && (
        <p
          className={cn(
            '-mt-4 text-sm',
            message.tone === 'error' ? 'text-red-300' : 'text-emerald-300',
          )}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
