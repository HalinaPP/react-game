import { TYPE_LEVEL } from '@/constants/constants';
import { ACTIONS } from '@/actions/constants';
import { ButtonProps } from '@components/Button/Button.model';
import {themes} from '@/constants/constants';

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
  startTime: Date;
  moveNumber: number;
  modalWindow: {
    isEmpty: boolean;
    header: string;
    body?: HTMLElement;
    buttons: ButtonProps[];
  };
  theme: any,
  lightTheme:boolean
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
  difficultLevel: TYPE_LEVEL.crossCheck,
  initialMatrix: [],
  currMatrix: [],
  matrixHistory: [],
  startTime: new Date(),
  moveNumber: 0,
  modalWindow: {
    isEmpty: true,
    header: '',
    body: undefined,
    buttons: [],
  },
  theme: themes.dark,
  lightTheme:true
};

Object.entries(initialState).forEach(item => {
  const el = localStorage.getItem(item[0]);
  const objEl = ['bgSoundOn', 'handleSoundOn', 'matrixHistory', 'initialMatrix'];
  
  if (el !== null && el !== '') {
    if (objEl.includes(el)) {
      initialState[item[0]] = JSON.parse(el);
    } else {
      initialState[item[0]] = JSON.parse(el);
    }
    
  }
});
initialState.theme =  initialState.lightTheme ? themes.light : themes.dark;

console.log('state', initialState);

export const reducer = (state = initialState, action: any): StateModel => {
  let newHistory;
  let newCurrMatrix;
  let bgSoundOn;
  let handleSoundOn;

  switch (action.type) {
    case ACTIONS.newGame:
      localStorage.setItem('matrixHistory', JSON.stringify([]));
      localStorage.setItem('currMatrix', JSON.stringify(action.payload.initialMatrix));
      localStorage.setItem('initialMatrix', JSON.stringify(action.payload.initialMatrix));
      localStorage.setItem('moveNumber', '0');
      localStorage.setItem('sudokuStartTime', action.payload.startTime.toString());
      console.log('new gammmmmmmm');
      return {
        ...state,
        moveNumber: 0,
        startTime: new Date(),
        initialMatrix: [...action.payload.initialMatrix.map((row: number[]) => [...row])],
        currMatrix: [...action.payload.initialMatrix.map((row: number[]) => [...row])],
        matrixHistory: [],
      };

    case ACTIONS.setStartTime:
      localStorage.setItem('sudokuStartTime', action.payload);
      return { ...state, startTime: action.payload };

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

      const newMove =
        state.currMatrix[row][col] === 0 && value === 0 ? state.moveNumber : state.moveNumber + 1;

      localStorage.setItem('matrixHistory', JSON.stringify(newHistory));
      localStorage.setItem('currMatrix', JSON.stringify(newCurrMatrix));
      localStorage.setItem('moveNumber', newMove.toString());

      return {
        ...state,
        moveNumber: newMove,
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
      newHistory = state.matrixHistory;
      newCurrMatrix = state.currMatrix;

      if (historyLength) {
        newHistory = state.matrixHistory.slice(0, historyLength - 1);
        newCurrMatrix = state.matrixHistory[historyLength - 1].map(row => [...row]);
      }

      localStorage.setItem('matrixHistory', JSON.stringify(newHistory));
      localStorage.setItem('currMatrix', JSON.stringify(newCurrMatrix));

      return {
        ...state,
        matrixHistory: newHistory,
        currMatrix: newCurrMatrix,
      };

    case ACTIONS.soundMute:
      bgSoundOn = { turnOn: action.payload.bgSoundOn, volume: state.bgSoundOn.volume };
      handleSoundOn = {
        turnOn: action.payload.handleSoundOn,
        volume: state.handleSoundOn.volume,
      };

      localStorage.setItem('bgSoundOn', JSON.stringify(bgSoundOn));
      localStorage.setItem('handleSoundOn', JSON.stringify(handleSoundOn));

      return {
        ...state,
        bgSoundOn: bgSoundOn,
        handleSoundOn: handleSoundOn,
      };

    case ACTIONS.updateSoundVolume:
      bgSoundOn = { turnOn: state.bgSoundOn.turnOn, volume: action.payload.bgSoundVolume };
      handleSoundOn = {
        turnOn: state.handleSoundOn.turnOn,
        volume: action.payload.handleSoundVolume,
      };

      localStorage.setItem('bgSoundOn', JSON.stringify(bgSoundOn));
      localStorage.setItem('handleSoundOn', JSON.stringify(handleSoundOn));

      return {
        ...state,
        bgSoundOn: bgSoundOn,
        handleSoundOn: handleSoundOn,
      };

    case ACTIONS.updateFieldSettings:
      localStorage.setItem('fieldBlockColorOn', JSON.stringify(action.payload.colorOn));
      localStorage.setItem('difficultLevel', JSON.stringify(action.payload.level));
      localStorage.setItem('lightTheme', JSON.stringify(action.payload.lightTheme));
      const theme = action.payload.lightTheme ? themes.light : themes.dark;
      return {
        ...state,
        fieldBlockColorOn: action.payload.colorOn,
        difficultLevel: action.payload.level,
        lightTheme: action.payload.lightTheme,
        theme: theme
      };

    case ACTIONS.setShowModalSetting:
      
      return {
        ...state,
        modalWindow: {
          isEmpty: action.payload.isEmpty,
          header: action.payload.header,
          body: action.payload.body,
          buttons: [...action.payload.buttons],
        },
      };
    default:
      return state;
  }
};
