export interface ProfileSettingsConfig {
  generalFields: ProfileSettingsField[];
  securityFields: ProfileSettingsField[];
}

export interface ProfileSettingsField {
  defaultValue?: string;
  description: string;
  label: string;
  placeholder: string;
  type?: string;
}

export interface ProfileFieldProps {
  field: ProfileSettingsField;
}
