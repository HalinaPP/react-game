import { ButtonProps } from '@components/Button/Button.model';

export interface MenuProps {
  initialMatrix:number[][];
  difficultLevel: number;
  generateNewGame: (matrix: number[][]) => void;
  moveDone: (row: number, col: number, value: number) => void;
  onSetShowModalSetting: (
    isEmpty: boolean,
    header: string,
    body: JSX.Element,
    buttons: ButtonProps[]
  ) => void;
}
