export interface FieldProps {
  fieldBlockColorOn: boolean;
  initialMatrix: number[][];
  currMatrix: number[][];
  matrixHistory: number[][][];
  moveDone: (row: number, col: number, value: number) => void;
}
