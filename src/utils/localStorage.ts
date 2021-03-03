import { size, TYPE_LEVEL, SCORE_MAX_LENGTH } from '@/constants/constants';
import { LOCALSTORAGE_INFO } from '@/constants/text';
import { scoreUserData } from '@/types';

const {
  sudokuUserName,
  matrixHistory,
  currMatrix,
  moveNumber,
  difficultLevel,
  fieldBlockColorOn,
  bgSoundOn,
  handleSoundOn,
  sudokuScoreTable,
} = LOCALSTORAGE_INFO;

const initialState = {
  sudokuUserName: 'UserN',
  matrixHistory: '',
  currMatrix: '',
  moveNumber: '0',
  difficultLevel: TYPE_LEVEL.crossCheck.toString(),
  fieldBlockColorOn: 'true',

  bgSoundOn: JSON.stringify({
    turnOn: false,
    volume: 1,
  }),

  handleSoundOn: JSON.stringify({
    turnOn: true,
    volume: 1,
  }),
};

export const initLocalStarage = (): void => {
  Object.entries(initialState).forEach(item => {
    const el = localStorage.getItem(item[0]);
    console.log('i=',item[0]);
    console.log('v=',el);
    if (el !== null && el !== '') {
      console.log('from loc');
      localStorage.setItem(item[0], el);
    } else {
      localStorage.setItem(item[0], item[1]);
    }
  });
};


export const setScore = (moves: number, time: string, level: number): void => {
  const userName = localStorage.getItem(sudokuUserName);
  const scoreTable = JSON.parse(String(localStorage.getItem(sudokuScoreTable)));
  const levelName = Object.entries(TYPE_LEVEL).find(item => item[1] === level)?.[0];
  const userScoreData = { userName, moves, time, level: levelName };

  let newScoreTable = [userScoreData];

  if (scoreTable) {
    const position = scoreTable.findIndex((item: scoreUserData) => {
      const difficultLevelCount = Math.trunc((size ** 4 * level) / 100);
      return moves / difficultLevelCount <= item.moves / difficultLevelCount;
    });

    newScoreTable = [
      ...scoreTable.slice(0, position),
      userScoreData,
      ...scoreTable.slice(position, SCORE_MAX_LENGTH - 1),
    ];
  }

  localStorage.setItem(sudokuScoreTable, JSON.stringify(newScoreTable));
};

export const getScore = () => {
  return JSON.parse(String(localStorage.getItem(sudokuScoreTable)));
};
