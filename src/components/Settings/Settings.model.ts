export interface SettingsProps {
  bgSoundOn: { turnOn: boolean; volume: number };
  handleSoundOn: { turnOn: boolean; volume: number };
  fieldBlockColorOn: boolean;
  lightThemeOn: boolean;
  theme: any;
  difficultLevel: number;
  generateNewGame: (matrix: number[][], startTime: Date) => void;
  updateFieldSettings: (colorOn: boolean, level: number, lightTheme: boolean) => void;
  updateSoundVolume: (bgSoundVolume: number, handleSoundVolume: number) => void;
  soundMute: (bgSoundOn: boolean, handleSoundOn: boolean) => void;
}
