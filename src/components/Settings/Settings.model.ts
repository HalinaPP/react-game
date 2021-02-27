export interface SettingsProps {
  bgSoundOn: boolean;
  handleSoundOn: boolean;
  fieldBlockColorOn: boolean;
  difficultLevel: number;
  updateFieldSettings: (value: boolean) => void;
}
