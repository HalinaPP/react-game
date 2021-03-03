import { ButtonProps } from '@components/Button/Button.model';

export interface GameProps {
  newMove: number;
  bgSoundOn: boolean;
  bgSoundVolume: number;
  handleSoundOn: boolean;
  handleSoundVolume: number;
  difficultLevel: number;
  initialMatrix: number[][];
  currMatrix: number[][];
  startTime: Date;
  generateNewGame: (matrix: number[][]) => void;
  onSetShowModalSetting: (
    isEmpty: boolean,
    header: string,
    body: JSX.Element,
    buttons: ButtonProps[]
  ) => void;
  clearField: () => void;
  undoMove: () => void;
}
