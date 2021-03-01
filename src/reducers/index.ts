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
    turnOn: false,
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
  let newHistory;
  let newCurrMatrix;
  switch (action.type) {
    case ACTIONS.newGame:
      localStorage.setItem('currMatrix', JSON.stringify(action.payload));
      localStorage.setItem('matrixHistory', JSON.stringify([]));
      localStorage.setItem('currMatrix', JSON.stringify(action.payload));

      return {
        ...state,
        initialMatrix: [...action.payload.map((row: number[]) => [...row])],
        currMatrix: [...action.payload.map((row: number[]) => [...row])],
        matrixHistory: [],
      };

    case ACTIONS.moveDone:
      const [col, row, value] = action.payload;
      /*console.log('on move r=' + row + ' c=' + col + ' v=' + value);
      console.log('curr', state.currMatrix);
      console.log('hist', state.matrixHistory);*/
      newHistory = [...state.matrixHistory, state.currMatrix];
      newCurrMatrix = [
        ...state.currMatrix.slice(0, row),
        [...state.currMatrix[row].slice(0, col), value, ...state.currMatrix[row].slice(col + 1)],
        ...state.currMatrix.slice(row + 1),
      ];
      localStorage.setItem('matrixHistory', JSON.stringify(newHistory));
      localStorage.setItem('currMatrix', JSON.stringify(newCurrMatrix));

      return {
        ...state,
        matrixHistory: newHistory,
        currMatrix: newCurrMatrix,
      };

    case ACTIONS.clear:
      localStorage.setItem('matrixHistory', JSON.stringify([]));
      localStorage.setItem('currMatrix', JSON.stringify(state.initialMatrix));

      console.log('ini', state.initialMatrix);
      return {
        ...state,
        currMatrix: state.initialMatrix.map(row => [...row]),
        matrixHistory: [],
      };

    case ACTIONS.undo:
      const historyLength = state.matrixHistory.length;
      newHistory = state.matrixHistory.slice(0, historyLength - 1);
      newCurrMatrix = state.matrixHistory[historyLength - 2].map(row => [...row]);
      localStorage.setItem('matrixHistory', JSON.stringify(newHistory));
      localStorage.setItem('currMatrix', JSON.stringify(newCurrMatrix));

      return {
        ...state,
        matrixHistory: newHistory,
        currMatrix: newCurrMatrix,
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
        difficultLevel: action.payload.level,
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
