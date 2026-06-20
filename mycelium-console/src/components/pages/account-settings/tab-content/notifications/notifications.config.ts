import type { SettingsTabPanelSection } from '../_components/settings-tab-panel/settings-tab-panel.types';

export const notificationsSections = [
  {
    title: 'Delivery Preferences',
    description:
      'Personal notification defaults for workspace events and account activity.',
    items: [
      {
        label: 'Product updates',
        description: 'Release notes, feature changes, and console updates.',
        value: 'Enabled',
      },
      {
        label: 'Workspace activity',
        description: 'Project changes, member updates, and API key events.',
        value: 'Enabled',
        status: 'Default',
      },
      {
        label: 'Security notices',
        description: 'Password changes, new sessions, and account risk events.',
        value: 'Enabled',
        status: 'Required',
      },
    ],
  },
  {
    title: 'Notification Schedule',
    description:
      'Static delivery windows for account-level summaries and reminders.',
    items: [
      {
        label: 'Daily digest',
        description: 'Summary of workspace activity for the previous day.',
        value: '09:00',
      },
      {
        label: 'Weekly report',
        description: 'Personal overview of projects, alerts, and usage.',
        value: 'Friday',
      },
      {
        label: 'Quiet hours',
        description: 'Reduce non-critical notifications outside work hours.',
        value: '22:00 - 07:00',
      },
    ],
  },
] satisfies SettingsTabPanelSection[];
