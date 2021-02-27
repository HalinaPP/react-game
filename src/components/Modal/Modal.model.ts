import { ButtonProps } from '@components/Button/Button.model';

export interface ModalProps {
  isEmpty: boolean;
  header: string;
  body?: any;
  buttons?: ButtonProps[];
  onSetShowModalSetting: (
    isEmpty: boolean,
    header: string,
    body: JSX.Element,
    buttons: ButtonProps[]
  ) => void;
}
