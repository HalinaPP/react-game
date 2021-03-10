import { ACTIONS } from '@/actions/constants';
import { ButtonProps } from '@components/Button/Button.model';

export const updateFieldSettings = (
  fieldBlockColorOn: boolean,
  difficultLevel: number,
  lightTheme: boolean
) => ({
  type: ACTIONS.updateFieldSettings,
  payload: { lightTheme, colorOn: fieldBlockColorOn, level: difficultLevel },
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
  payload: { bgSoundVolume: bgSoundVolume, handleSoundVolume: handleSoundVolume },
});

export const generateNewGame = (initialMatrix: number[][], startTime:Date) => ({
  type: ACTIONS.newGame,
  payload: { initialMatrix, startTime},
});

export const clearField = () => ({
  type: ACTIONS.clear,
});

export const undoMove = () => ({
  type: ACTIONS.undo,
});

export const moveDone = (row: number, col: number, value: number) => ({
  type: ACTIONS.moveDone,
  payload: [col, row, value],
});

export const setStartTime = (startTime: Date) => ({
  type: ACTIONS.setStartTime,
  payload: startTime,
});
