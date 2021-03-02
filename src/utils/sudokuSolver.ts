var squareCoordinates = [
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
const size = 9;

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

const completeCell = (board: number[][], indexRow: number, indexCol: number) => {
  const rangeCellValue = new Set([
    ...getRow(board, indexRow),
    ...getColumn(board, indexCol),
    ...getSquare(board, squareCoordinates[indexRow][indexCol]),
  ]);
  const possibilities = getExpectedNumbers(size).filter(item => !rangeCellValue.has(item));

  if (possibilities.length === 1) {
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
  indexCol: number
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

const solveOneValueNeed = (board: number[][]) => {
  let updated = board.reduce(
    (prevRow, row, i) =>
      row.reduce((prev, col, j) => {
        if (col === 0) {
          return completeCell(board, i, j) || prev;
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
            isFindOne(board, boardElArr, getRow(board, i), i, j) ||
            isFindOne(board, boardElArr, getColumn(board, j), i, j) ||
            isFindOne(board, boardElArr, getSquare(board, squareCoordinates[i][j]), i, j) ||
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

export const solve = (board3: number[][]) => {
  //console.log('board=', board3);
  let board2 = JSON.parse(JSON.stringify(board3));
  // console.log('mmm=', board2);
  let updated = true;
  let solved = false;

  while (updated && !solved) {
    updated = solveOneValueNeed(board2);
    solved = isSolved(board2);
  }
  console.log('solved=', solved);

  /*let board4 = JSON.parse(JSON.stringify(board3));
  console.log('board4=',board4);
  console.log('solved2=', solved);
  console.log('sooooo=', board2);
*/

  return board2;
};

export const isSolvedCorrectly = (solvedBoard: number[][], initBoard: number[][]) => {
  return solvedBoard.reduce(
    (prev, row, i) => prev && row.every((cell, j) => cell === initBoard[i][j]),
    true
  );
};
