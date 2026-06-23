import { type FormEvent, useEffect, useState } from 'react';
import type { UserAccessibilitySettings } from '@/api/services/user-profile/user-profile-service.types';
import { Button } from '@/components/ui/button/button';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { Switch } from '@/components/ui/switch/switch';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { cn } from '@/lib/utils';
import { SettingsRow } from '../_components/settings-tab-panel/settings-row';
import { SettingsSection } from '../_components/settings-tab-panel/settings-section';

type AccessibilitySettingsForm = Omit<
  UserAccessibilitySettings,
  'createdAt' | 'updatedAt' | 'userId'
>;

type FormMessage = {
  tone: 'error' | 'success';
  text: string;
};

const contrastOptions = ['Standard', 'High', 'Low'];
const textDensityOptions = ['Comfortable', 'Compact', 'Spacious'];

const selectClass = cn(
  'h-8 rounded-md border border-foreground/10 bg-[#1d1d1d] px-2.5 text-sm text-foreground',
  'outline-none focus:border-foreground/20 disabled:pointer-events-none disabled:opacity-50',
);

const fallbackAccessibilitySettings: AccessibilitySettingsForm = {
  reducedMotion: false,
  contrastPreference: 'Standard',
  focusIndicators: true,
  textDensity: 'Comfortable',
  screenReaderLabels: true,
  keyboardShortcuts: true,
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

function toAccessibilitySettingsForm(
  settings: UserAccessibilitySettings | undefined,
): AccessibilitySettingsForm {
  return {
    reducedMotion: toBoolean(
      settings?.reducedMotion,
      fallbackAccessibilitySettings.reducedMotion,
    ),
    contrastPreference:
      settings?.contrastPreference ??
      fallbackAccessibilitySettings.contrastPreference,
    focusIndicators: toBoolean(
      settings?.focusIndicators,
      fallbackAccessibilitySettings.focusIndicators,
    ),
    textDensity:
      settings?.textDensity ?? fallbackAccessibilitySettings.textDensity,
    screenReaderLabels: toBoolean(
      settings?.screenReaderLabels,
      fallbackAccessibilitySettings.screenReaderLabels,
    ),
    keyboardShortcuts: toBoolean(
      settings?.keyboardShortcuts,
      fallbackAccessibilitySettings.keyboardShortcuts,
    ),
  };
}

export function Accessibility() {
  const [form, setForm] = useState<AccessibilitySettingsForm>(
    fallbackAccessibilitySettings,
  );
  const [message, setMessage] = useState<FormMessage | null>(null);
  const {
    useAccessibilitySettings,
    useResetAccessibilitySettings,
    useUpdateAccessibilitySettings,
  } = useUserProfile();
  const { data, isLoading } = useAccessibilitySettings();
  const updateSettings = useUpdateAccessibilitySettings();
  const resetSettings = useResetAccessibilitySettings();
  const isPending = updateSettings.isPending || resetSettings.isPending;

  useEffect(() => {
    setForm(toAccessibilitySettingsForm(data));
    setMessage(null);
  }, [data]);

  if (isLoading) {
    return <Skeleton className='h-80 w-full' />;
  }

  function updateForm<K extends keyof AccessibilitySettingsForm>(
    key: K,
    value: AccessibilitySettingsForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    try {
      await updateSettings.mutateAsync(form);
      setMessage({ tone: 'success', text: 'Accessibility preferences saved.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to save accessibility preferences.',
      });
    }
  }

  async function handleReset() {
    setMessage(null);

    try {
      await resetSettings.mutateAsync();
      setMessage({ tone: 'success', text: 'Accessibility preferences reset.' });
    } catch {
      setMessage({
        tone: 'error',
        text: 'Unable to reset accessibility preferences.',
      });
    }
  }

  return (
    <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit}>
      <SettingsSection
        title='Interface Preferences'
        description='Personal display defaults for reducing visual friction in the console.'
      >
        <SettingsRow
          label='Reduced motion'
          description='Minimize non-essential animation and transitions.'
        >
          <Switch
            checked={form.reducedMotion}
            disabled={isPending}
            onCheckedChange={(checked) => updateForm('reducedMotion', checked)}
          />
        </SettingsRow>
        <SettingsRow
          label='Contrast preference'
          description='Increase separation between text, borders, and panels.'
        >
          <select
            value={form.contrastPreference}
            disabled={isPending}
            onChange={(event) =>
              updateForm('contrastPreference', event.target.value)
            }
            className={cn('w-36', selectClass)}
          >
            {contrastOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </SettingsRow>
        <SettingsRow
          label='Focus indicators'
          description='Show visible outlines while navigating with keyboard.'
        >
          <Switch
            checked={form.focusIndicators}
            disabled={isPending}
            onCheckedChange={(checked) =>
              updateForm('focusIndicators', checked)
            }
          />
        </SettingsRow>
        <SettingsRow
          label='Preference changes'
          description='Save or restore your account accessibility settings.'
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
        title='Reading'
        description='Preferences for text density and assistive descriptions.'
      >
        <SettingsRow
          label='Text density'
          description='Adjust information density across settings pages.'
        >
          <select
            value={form.textDensity}
            disabled={isPending}
            onChange={(event) => updateForm('textDensity', event.target.value)}
            className={cn('w-36', selectClass)}
          >
            {textDensityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </SettingsRow>
        <SettingsRow
          label='Screen reader labels'
          description='Prefer explicit labels for icon-only controls.'
        >
          <Switch
            checked={form.screenReaderLabels}
            disabled={isPending}
            onCheckedChange={(checked) =>
              updateForm('screenReaderLabels', checked)
            }
          />
        </SettingsRow>
        <SettingsRow
          label='Keyboard shortcuts'
          description='Use keyboard-first navigation for common actions.'
        >
          <Switch
            checked={form.keyboardShortcuts}
            disabled={isPending}
            onCheckedChange={(checked) =>
              updateForm('keyboardShortcuts', checked)
            }
          />
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
