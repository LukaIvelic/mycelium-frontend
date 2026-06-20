import type { SettingsTabPanelSection } from '../_components/settings-tab-panel/settings-tab-panel.types';

export const integrationsSections = [
  {
    title: 'Developer Tools',
    description:
      'External services that can be connected to enrich project and deployment context.',
    items: [
      {
        label: 'GitHub',
        description: 'Repository metadata, pull requests, and commit links.',
        value: 'Not connected',
      },
      {
        label: 'Railway',
        description: 'Deployment status and service environment links.',
        value: 'Not connected',
      },
      {
        label: 'Sentry',
        description: 'Error events connected to traces and affected services.',
        value: 'Not connected',
      },
    ],
  },
  {
    title: 'Team Notifications',
    description:
      'Communication tools for alerts, reports, and workspace updates.',
    items: [
      {
        label: 'Slack',
        description: 'Route incidents and weekly summaries to channels.',
        value: 'Not connected',
      },
      {
        label: 'Discord',
        description: 'Send workspace activity and service health updates.',
        value: 'Not connected',
      },
      {
        label: 'Email digest',
        description: 'Send a scheduled activity summary to workspace members.',
        value: 'Enabled',
        status: 'Default',
      },
    ],
  },
] satisfies SettingsTabPanelSection[];
