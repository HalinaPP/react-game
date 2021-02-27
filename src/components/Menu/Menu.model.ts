import { ButtonProps } from '@components/Button/Button.model';

export interface MenuProps {
  onSetShowModalSetting: (
    isEmpty: boolean,
    header: string,
    body: JSX.Element,
    buttons: ButtonProps[]
  ) => void;
}
