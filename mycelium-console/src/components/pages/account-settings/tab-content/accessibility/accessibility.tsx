import { SettingsTabPanel } from '../_components/settings-tab-panel/settings-tab-panel';
import { accessibilitySections } from './accessibility.config';

export function Accessibility() {
  return <SettingsTabPanel sections={accessibilitySections} />;
}
