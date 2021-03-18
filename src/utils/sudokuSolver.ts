import { moveDoneFunc } from '@/types';
import { size as mSize } from '@/constants/constants';

const squareCoordinates = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
];

const size = mSize * mSize;

const getExpectedNumbers = (size: number) => {
  return new Array(size).fill(0).map((item, index) => index + 1);
};

const getRow = (board: number[][], row: number) => {
  return board[row];
};

const getColumn = (board: number[][], column: number) => {
  return board.map(row => row[column]);
};

const getSquare = (board: number[][], square: number) => {
  return squareCoordinates.reduce((squareCoordinate: number[], row: number[], i: number) => {
    squareCoordinate.push(
      ...row.reduce((prev: number[], col: number, j: number) => {
        if (square === col) {
          prev.push(board[i][j]);
        }
        return prev;
      }, [])
    );
    return squareCoordinate;
  }, []);
};

const completeCell = (
  board: number[][],
  indexRow: number,
  indexCol: number,
  moveDone: moveDoneFunc,
  autoplay = false
) => {
  const rangeCellValue = new Set([
    ...getRow(board, indexRow),
    ...getColumn(board, indexCol),
    ...getSquare(board, squareCoordinates[indexRow][indexCol]),
  ]);
  const possibilities = getExpectedNumbers(size).filter(item => !rangeCellValue.has(item));

  if (possibilities.length === 1) {
    if (autoplay && typeof moveDone === 'function') {
      setTimeout(() => moveDone(indexRow, indexCol, possibilities[0]), 2000);
    }
    board[indexRow][indexCol] = possibilities[0];
    return true;
  }

  board[indexRow][indexCol] = +possibilities.join('');
  return false;
};

const isFindOne = (
  board: number[][],
  possibilities: number[],
  range: number[],
  indexRow: number,
  indexCol: number,
  moveDone: moveDoneFunc,
  autoplay = false
) => {
  let updated = false;
  possibilities.forEach(possibility => {
    let counter = 0;

    range.forEach(cell => {
      const cellValue = cell
        .toString()
        .split('')
        .map(item => Number(item));
      if (cellValue.includes(possibility)) {
        counter++;
      }
    });

    if (counter === 1) {
      board[indexRow][indexCol] = possibility;
      if (autoplay) {
        setTimeout(() => moveDone(indexRow, indexCol, possibility), 2000);
      }

      updated = true;
    }
  });

  return updated;
};

const compare = (expected: number[], actual: number[]) => {
  let expectedCopy = expected.slice();
  let actualCopy = actual.slice();

  return (
    expectedCopy.length === actualCopy.length &&
    expectedCopy.sort().every((value: number, index: number) => value === actualCopy.sort()[index])
  );
};

const isSolved = (board: number[][]) => {
  const expected = getExpectedNumbers(size);

  let valid = expected.every(
    (item, index) =>
      compare(expected, getRow(board, index)) && compare(expected, getColumn(board, index))
  );

  return (
    valid &&
    expected
      .slice(0, size - 1)
      .every((item, index) => compare(expected, getSquare(board, index + 1)))
  );
};

const solveOneValueNeed = (board: number[][], moveDone: moveDoneFunc, autoplay = false) => {
  let updated = board.reduce(
    (prevRow, row, i) =>
      row.reduce((prev, col, j) => {
        if (col === 0) {
          return completeCell(board, i, j, moveDone, autoplay) || prev;
        }
        return prev;
      }, false) || prevRow,
    false
  );

  updated = board.reduce((prevRow, row, i) => {
    return (
      row.reduce((prevCol, col, j) => {
        let boardElArr = col
          .toString()
          .split('')
          .map(item => Number(item));

        if (boardElArr.length > 1) {
          return (
            isFindOne(board, boardElArr, getRow(board, i), i, j, moveDone, autoplay) ||
            isFindOne(board, boardElArr, getColumn(board, j), i, j, moveDone, autoplay) ||
            isFindOne(
              board,
              boardElArr,
              getSquare(board, squareCoordinates[i][j]),
              i,
              j,
              moveDone,
              autoplay
            ) ||
            prevCol
          );
        }
        return prevCol;
      }, updated) || prevRow
    );
  }, updated);

  board = board.map(row => row.map(col => (col.toString().split('').length > 1 ? 0 : col)));

  return updated;
};

export const solve = (board3: number[][], moveDone: moveDoneFunc, autoplay = false) => {
  let board2;

  if (autoplay) {
    const initialMatrix = localStorage.getItem('initialMatrix') || '';
    const boiard5 = JSON.parse(initialMatrix);
    board2 = JSON.parse(JSON.stringify(boiard5));
  } else {
    board2 = JSON.parse(JSON.stringify(board3));
  }

  let updated = true;
  let solved = false;

  while (updated && !solved) {
    updated = solveOneValueNeed(board2, moveDone, autoplay);
    solved = isSolved(board2);
  }

  return board2;
};
