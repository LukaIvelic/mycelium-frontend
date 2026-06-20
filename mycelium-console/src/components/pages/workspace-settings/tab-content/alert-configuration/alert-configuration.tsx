import { SettingsTabPanel } from '../_components/settings-tab-panel/settings-tab-panel';
import { alertConfigurationSections } from './alert-configuration.config';

export function AlertConfiguration() {
  return <SettingsTabPanel sections={alertConfigurationSections} />;
}
