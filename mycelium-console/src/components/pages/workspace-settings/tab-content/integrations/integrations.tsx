import { SettingsTabPanel } from '../_components/settings-tab-panel/settings-tab-panel';
import { integrationsSections } from './integrations.config';

export function Integrations() {
  return <SettingsTabPanel sections={integrationsSections} />;
}
