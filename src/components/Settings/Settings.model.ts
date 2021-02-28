export interface SettingsProps {
  bgSoundOn: { turnOn: boolean; volume: number };
  handleSoundOn: { turnOn: boolean; volume: number };
  fieldBlockColorOn: boolean;
  difficultLevel: number;
  updateFieldSettings: (value: boolean) => void;
  updateSoundVolume: (bgSoundVolume: number, handleSoundVolume: number) => void;
  soundMute: (bgSoundOn: boolean, handleSoundOn: boolean) => void;
}
