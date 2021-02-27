import { ACTIONS } from '@/actions/constants';
import { ButtonProps } from '@components/Button/Button.model';

export const updateFieldSettingsA = (fieldBlockColorOn: boolean) => ({
  type: ACTIONS.updateFieldSettings,
  payload: fieldBlockColorOn,
});

export const setShowModalSetting = (
  isEmpty: boolean,
  header: string,
  body: JSX.Element,
  buttons: ButtonProps[]
) => ({
  type: ACTIONS.setShowModalSetting,
  payload: { isEmpty, header, body, buttons },
});
