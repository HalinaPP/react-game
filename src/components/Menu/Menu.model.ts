import { ButtonProps } from '@components/Button/Button.model';

export interface MenuProps {
  /* bgSoundOn:boolean;
  bgSoundVolume:number;*/
  difficultLevel: number;
  generateNewGame: (matrix: number[][]) => void;
  onSetShowModalSetting: (
    isEmpty: boolean,
    header: string,
    body: JSX.Element,
    buttons: ButtonProps[]
  ) => void;
}
