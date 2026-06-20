import { SettingsTabPanel } from '../_components/settings-tab-panel/settings-tab-panel';
import { experimentalFeaturesSections } from './experimental-features.config';

export function ExperimentalFeatures() {
  return <SettingsTabPanel sections={experimentalFeaturesSections} />;
}
