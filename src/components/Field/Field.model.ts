export interface FieldProps {
  fieldBlockColorOn: boolean;
  initialMatrix: number[][];
  currMatrix: number[][];
  matrixHistory: number[][][];
  difficultLevel: number;
  moveDone: (row: number, col: number, value: number) => void;
}
