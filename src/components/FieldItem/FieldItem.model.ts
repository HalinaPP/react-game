export interface FieldItemProps {
  initValue: string;
  isEditable: boolean;
  bgClass?: string;
  isClear: number;
  pos: string;
  onMoveDone: (value: number) => void;
}
