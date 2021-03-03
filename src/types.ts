export interface scoreUserData {
  userName: string;
  moves: number;
  time: string;
  level: string;
}

export type moveDoneFunc = (row: number, col: number, value: number) => void;
