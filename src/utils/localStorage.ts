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

export const initLocalStarage = () => {
  localStorage.setItem(sudokuUserName, 'UserN');
  localStorage.setItem(matrixHistory, '');
  localStorage.setItem(currMatrix, '');
  localStorage.setItem(moveNumber, '0');
  localStorage.setItem(difficultLevel, TYPE_LEVEL.crossCheck.toString());
  localStorage.setItem(fieldBlockColorOn, 'true');
  localStorage.setItem(
    bgSoundOn,
    JSON.stringify({
      turnOn: false,
      volume: 1,
    })
  );
  localStorage.setItem(
    handleSoundOn,
    JSON.stringify({
      turnOn: true,
      volume: 1,
    })
  );
};

export const setScore = (moves: number, time: Date, level: number) => {
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
      ...scoreTable.slice(position, SCORE_MAX_LENGTH),
    ];
  }

  localStorage.setItem(sudokuScoreTable, JSON.stringify(newScoreTable));
};
