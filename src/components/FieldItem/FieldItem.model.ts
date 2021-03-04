export interface FieldItemProps {
  initValue: string;
  currValue:string;
  isEditable: boolean;
  bgClass?: string;
  isClear: number;
  pos: string;
  onMoveDone: (value: number) => void;
}
