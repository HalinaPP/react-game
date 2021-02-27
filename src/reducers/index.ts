import { TYPE_LEVEL } from '@/constants/constants';
import { ACTIONS } from '@/actions/constants';
import { ButtonProps } from '@components/Button/Button.model';

export interface StateModel {
  bgSoundOn: boolean;
  handleSoundOn: boolean;
  fieldBlockColorOn: boolean;
  difficultLevel: number;
  initialMatrix: number[][];
  currMatrix: number[][];
  matrixHistory: number[][][];
  modalWindow: {
    isEmpty: boolean;
    header: string;
    body?: HTMLElement;
    buttons: ButtonProps[];
  };
}

const initialState: StateModel = {
  bgSoundOn: true,
  handleSoundOn: true,
  fieldBlockColorOn: true,
  difficultLevel: TYPE_LEVEL.easy,
  initialMatrix: [],
  currMatrix: [],
  matrixHistory: [],
  modalWindow: {
    isEmpty: true,
    header: '',
    body: undefined,
    buttons: [],
  },
};

export const reducer = (state = initialState, action: any): StateModel => {
  switch (action.type) {
    case ACTIONS.newGame:
      return {
        ...state,
        initialMatrix: action.payload,
        currMatrix: action.payload,
        matrixHistory: [],
      };
    case ACTIONS.clear:
      return {
        ...state,
        currMatrix: state.initialMatrix.map(row => [...row]),
      };
    case ACTIONS.undo:
      const historyLength = state.matrixHistory.length;

      return {
        ...state,
        matrixHistory: state.matrixHistory.slice(0, historyLength - 1),
        currMatrix: state.matrixHistory[historyLength - 2].map(row => [...row]),
      };
    case ACTIONS.soundMute:
      return {
        ...state,
        bgSoundOn: action.payload.bgSoundOn,
        handleSoundOn: action.payload.handleSoundOn,
      };
    case ACTIONS.updateFieldSettings:
      return {
        ...state,
        fieldBlockColorOn: action.payload,
      };
    case ACTIONS.setShowModalSetting:
      return {
        ...state,
        modalWindow: {
          isEmpty: action.payload.isEmpty,
          header: action.payload.header,
          body: action.payload.body,
          buttons: action.payload.buttons,
        },
      };
    default:
      return state;
  }
};
