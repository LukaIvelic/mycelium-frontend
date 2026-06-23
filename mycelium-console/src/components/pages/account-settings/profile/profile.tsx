import { type FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { Textarea } from '@/components/ui/textarea/textarea';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { cn } from '@/lib/utils';
import { SettingsRow } from '../tab-content/_components/settings-tab-panel/settings-row';
import { SettingsSection } from '../tab-content/_components/settings-tab-panel/settings-section';

type ProfileForm = {
  bio: string;
  company: string;
  email: string;
  firstName: string;
  jobTitle: string;
  lastName: string;
  location: string;
  username: string;
};

type FormMessage = {
  tone: 'error' | 'success';
  text: string;
};

const emptyProfileForm: ProfileForm = {
  bio: '',
  company: '',
  email: '',
  firstName: '',
  jobTitle: '',
  lastName: '',
  location: '',
  username: '',
};

const fieldClass = cn(
  'rounded-md border-foreground/10 bg-[#1d1d1d]',
  'outline-none focus-visible:ring-0 focus-visible:border-foreground/20',
  'placeholder:text-foreground/35',
);

export function ProfileSettings() {
  const [form, setForm] = useState<ProfileForm>(emptyProfileForm);
  const [message, setMessage] = useState<FormMessage | null>(null);
  const { useMe, useUpdateUserProfile } = useUserProfile();
  const { data: userProfile, isLoading } = useMe();
  const updateProfile = useUpdateUserProfile(userProfile?.userId ?? '');

  useEffect(() => {
    if (!userProfile) return;

    setForm({
      bio: userProfile.bio ?? '',
      company: userProfile.company ?? '',
      email: userProfile.email ?? '',
      firstName: userProfile.firstName ?? '',
      jobTitle: userProfile.jobTitle ?? '',
      lastName: userProfile.lastName ?? '',
      location: userProfile.location ?? '',
      username: userProfile.username ?? '',
    });
    setMessage(null);
  }, [userProfile]);

  if (isLoading || !userProfile) {
    return <Skeleton className='h-72 w-full' />;
  }

  function updateForm<K extends keyof ProfileForm>(
    key: K,
    value: ProfileForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const payload = {
      bio: form.bio.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      firstName: form.firstName.trim(),
      jobTitle: form.jobTitle.trim(),
      lastName: form.lastName.trim(),
      location: form.location.trim(),
      username: form.username.trim(),
    };

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.username ||
      !payload.email
    ) {
      setMessage({
        tone: 'error',
        text: 'First name, last name, username, and email are required.',
      });
      return;
    }

    try {
      await updateProfile.mutateAsync(payload);
      setMessage({ tone: 'success', text: 'Profile saved.' });
    } catch {
      setMessage({ tone: 'error', text: 'Unable to save profile.' });
    }
  }

  return (
    <form className='flex w-full flex-col gap-8' onSubmit={handleSubmit}>
      <SettingsSection
        title='General'
        description='Personal details shown across your account and workspace activity.'
      >
        <SettingsRow
          label='First name'
          description='Given name shown in profile cards and shared workspaces.'
        >
          <Input
            value={form.firstName}
            disabled={updateProfile.isPending}
            onChange={(event) => updateForm('firstName', event.target.value)}
            className={cn('w-full md:w-80', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Last name'
          description='Family name shown in profile cards and shared workspaces.'
        >
          <Input
            value={form.lastName}
            disabled={updateProfile.isPending}
            onChange={(event) => updateForm('lastName', event.target.value)}
            className={cn('w-full md:w-80', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Username'
          description='Public account handle used inside the console.'
        >
          <Input
            value={form.username}
            disabled={updateProfile.isPending}
            onChange={(event) => updateForm('username', event.target.value)}
            className={cn('w-full md:w-80', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Email'
          description='Email address associated with this profile.'
        >
          <Input
            type='email'
            value={form.email}
            disabled={updateProfile.isPending}
            onChange={(event) => updateForm('email', event.target.value)}
            className={cn('w-full md:w-80', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Location'
          description='Optional location shown on your account profile.'
        >
          <Input
            value={form.location}
            disabled={updateProfile.isPending}
            onChange={(event) => updateForm('location', event.target.value)}
            className={cn('w-full md:w-80', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Company'
          description='Organization associated with this account.'
        >
          <Input
            value={form.company}
            disabled={updateProfile.isPending}
            onChange={(event) => updateForm('company', event.target.value)}
            className={cn('w-full md:w-80', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Job title'
          description='Role displayed beside your account summary.'
        >
          <Input
            value={form.jobTitle}
            disabled={updateProfile.isPending}
            onChange={(event) => updateForm('jobTitle', event.target.value)}
            className={cn('w-full md:w-80', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Bio'
          description='Short note shown on your account profile.'
        >
          <Textarea
            value={form.bio}
            disabled={updateProfile.isPending}
            onChange={(event) => updateForm('bio', event.target.value)}
            className={cn('min-h-20 w-full resize-none md:w-80', fieldClass)}
          />
        </SettingsRow>
        <SettingsRow
          label='Profile changes'
          description='Save updates to your personal account information.'
        >
          <Button type='submit' size='sm' disabled={updateProfile.isPending}>
            Save profile
          </Button>
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
