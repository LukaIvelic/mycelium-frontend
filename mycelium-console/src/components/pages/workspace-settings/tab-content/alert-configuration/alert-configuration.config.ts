import type { SettingsTabPanelSection } from '../_components/settings-tab-panel/settings-tab-panel.types';

export const alertConfigurationSections = [
  {
    title: 'Notification Routing',
    description:
      'Static routing defaults for incident and service health notifications.',
    items: [
      {
        label: 'Default channel',
        description: 'Primary destination for workspace alerts.',
        value: 'Workspace inbox',
      },
      {
        label: 'Critical alerts',
        description: 'High priority failures and repeated service errors.',
        value: 'Enabled',
        status: 'Immediate',
      },
      {
        label: 'Warning alerts',
        description: 'Latency spikes and partial degradation notices.',
        value: 'Enabled',
        status: 'Digest',
      },
    ],
  },
  {
    title: 'Escalation Rules',
    description:
      'Placeholder escalation policy for alert ownership and quiet hours.',
    items: [
      {
        label: 'Escalation delay',
        description: 'Time before unresolved critical alerts move up a level.',
        value: '15 minutes',
      },
      {
        label: 'Quiet hours',
        description: 'Reduced notification window for non-critical alerts.',
        value: '22:00 - 07:00',
      },
      {
        label: 'Weekly summary',
        description: 'Workspace level report for alert volume and outcomes.',
        value: 'Monday',
        status: 'Scheduled',
      },
    ],
  },
] satisfies SettingsTabPanelSection[];
