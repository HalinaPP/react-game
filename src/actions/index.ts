import { ACTIONS } from '@/actions/constants';
import { ButtonProps } from '@components/Button/Button.model';

export const updateFieldSettings = (fieldBlockColorOn: boolean, difficultLevel: number) => ({
  type: ACTIONS.updateFieldSettings,
  payload: { colorOn: fieldBlockColorOn, level: difficultLevel },
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

export const soundMute = (bgSoundOn: boolean, handleSoundOn: boolean) => ({
  type: ACTIONS.soundMute,
  payload: { bgSoundOn, handleSoundOn },
});

export const updateSoundVolume = (bgSoundVolume: number, handleSoundVolume: number) => ({
  type: ACTIONS.updateSoundVolume,
  payload: { bgSoundVolume: bgSoundVolume / 100, handleSoundVolume: handleSoundVolume / 100 },
});

export const generateNewGame = (initialMatrix: number[][]) => ({
  type: ACTIONS.newGame,
  payload: initialMatrix,
});

export const clearField = () => ({
  type: ACTIONS.clear,
});

export const moveDone = (row: number, col: number, value: number) => ({
  type: ACTIONS.moveDone,
  payload: [col, row, value],
});
