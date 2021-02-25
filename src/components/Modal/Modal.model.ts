import { ButtonProps } from '@components/Button/Button.model';

export interface ModalProps {
  header: string;
  body?: string;
  buttons?: ButtonProps[];

  // setShowModaViewEvent: (value: boolean) => void;
}
