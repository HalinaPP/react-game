export interface GameProps {
  bgSoundOn: boolean;
  bgSoundVolume: number;
  difficultLevel: number;
  generateNewGame: (matrix: number[][]) => void;
  clearField: () => void;
}
