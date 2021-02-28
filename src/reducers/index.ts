import { TYPE_LEVEL } from '@/constants/constants';
import { ACTIONS } from '@/actions/constants';
import { ButtonProps } from '@components/Button/Button.model';

export interface StateModel {
  bgSoundOn: {
    turnOn: boolean;
    volume: number;
  };
  handleSoundOn: {
    turnOn: boolean;
    volume: number;
  };
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
  bgSoundOn: {
    turnOn: true,
    volume: 1,
  },
  handleSoundOn: {
    turnOn: true,
    volume: 1,
  },
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
        bgSoundOn: { turnOn: action.payload.bgSoundOn, volume: state.bgSoundOn.volume },
        handleSoundOn: { turnOn: action.payload.handleSoundOn, volume: state.handleSoundOn.volume },
      };
    case ACTIONS.updateSoundVolume:
      return {
        ...state,
        bgSoundOn: { turnOn: state.bgSoundOn.turnOn, volume: action.payload.bgSoundVolume },
        handleSoundOn: {
          turnOn: state.handleSoundOn.turnOn,
          volume: action.payload.handleSoundVolume,
        },
      };
    case ACTIONS.updateFieldSettings:
      return {
        ...state,
        fieldBlockColorOn: action.payload.colorOn,
        difficultLevel: action.payload.level
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
