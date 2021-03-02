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
  /* const col = []
    for (let row = 0; row < 9; row++) {
        col.push(board[row][column]);
    }
     return col*/

  return board.map(row => row[column]);
};

const getSquare = (board: number[][], square: number) => {
  /*let cells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (square == square_coordinates[r][c]) {
        cells.push(board[r][c]);
      }
    }
  }
  return cells;*/

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

  //let possibilities = [];

  /*for (let p = 1; p <= 9; p++) {
    if (!rangeCellValue.includes(p)) {
      possibilities.push(p);
    }
  }*/
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

  //for (let i = 0; i < possibilities.length; i++) {
  //let possibility = possibilities[i];
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
      /* if (Array.isArray(cell)) {
        if (cell.includes(possibility)) {
          counter++;
        }
      } else {
        if (cell == possibility) {
          counter++;
        }
      }*/
    });

    if (counter === 1) {
      board[indexRow][indexCol] = possibility;
      updated = true;
      // break;
    }
  });
  // }
  return updated;
};

function compare(expected: number[], actual: number[]) {
  /* let array1 = expected.slice();
  let array2 = actual.slice();
  return (
    array1.length === array2.length &&
    array1.sort().every(function (value, index) {
      return value === array2.sort()[index];
    })
  );*/
  return (
    expected.length === actual.length &&
    expected.sort().every((value: number, index: number) => value === actual.sort()[index])
  );
}

const isSolved = (board: number[][]) => {
  /* let valid = true; for (let r = 0; r < 9 && valid == true; r++) {
    if (!compare(expected, getRow(board, r))) {
      valid = false;
    }
  }*/

  /*for (let c = 0; c < 9 && valid == true; c++) {
    if (!compare(expected, getColumn(board, c))) {
      valid = false;
    }
  }*/
  /* valid = board.every((row,index)=> compare(expected, getRow(board, index)));
  valid = board.every((col,index)=> compare(expected, getColumn(board, index)));
  valid = board.every((col,index)=> compare(expected, getColumn(board, index)));
  // Check all quadrants
  /*for (let q = 1; q < 9 && valid == true; q++) {
    if (!compare(expected, getSquare(board, q))) {
      valid = false;
    }
  }  return valid;
  */
  const expected = getExpectedNumbers(size);
  return expected.every(
    (item, index) =>
      compare(expected, getRow(board, index)) &&
      compare(expected, getColumn(board, index)) &&
      compare(expected, getSquare(board, index + 1))
  );
};

const backtrackBased = (initBoard: number[][]) => {
  let board = [...initBoard.map(row => [...row])];

  /*for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
        */
  board.map((row, i) =>
    row.map((col, j) => {
      if (col === 0) {
        completeCell(board, i, j);
        if (isSolved(board)) {
          return board;
        }
        const cellValue = col
        .toString()
        .split('')
        .map(item => Number(item));

        if(cellValue.length>1){
            cellValue.map(cell=>{
                let boardCopy = [...board.map(row => [...row])];
                boardCopy[i][j] = cell;
        
                let completed_board = backtrackBased(boardCopy);
        
                if (completed_board) {
                  return completed_board;
                }
                return false;
            })
            return false;
        }
      }
      return false;
    })
  );
  // Process each incomplete cell
  /*if (board[r][c] === 0) {
    completeCell(board, r, c);
    if (isSolved(board)) return board;
    let cell = board[r][c];

    if (Array.isArray(cell)) {
      
        for (let i = 0; i < cell.length; i++) {
        let board_2 = JSON.parse(JSON.stringify(board));
        board_2[r][c] = cell[i];

        let completed_board = backtrackBased(board_2);

        if (completed_board) {
          return completed_board;
        }
        /*if ((completed_board = backtrack_based(board_2))) {
              return completed_board;
            }*/
   /*   }
      return false;
    }
  }*/
  //}
  //}

  return false;
};

const solveOneValueNeed = (board: number[][]) => {
  /*let updated2 = false;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] == 0) {
        console.log('22b=' + board[r][c] + ' r=' + r + ' c=' + c);
        updated2 = completeCell(board, r, c) || updated2;
      }
    }
  }
  console.log('u2=', updated2);*/
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

  //for (let r = 0; r < 9; r++) {
  //for (let c = 0; c < 9; c++) {
  /* if (Array.isArray(board[r][c])) {
        let possibilities = board[r][c];
        updated =
          isFindOne(board, possibilities, getRow(board, r), r, c) ||
          isFindOne(board, possibilities, getColumn(board, c), r, c) ||
          isFindOne(board, possibilities, getSquare(board, squareCoordinates[r][c]), r, c) ||
          updated;
      }*/

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

  //}  }

  /*for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (Array.isArray(board[r][c])) {
        board[r][c] = 0;
      }
    }
  }*/

  board = board.map(row => row.map(col => (col.toString().split('').length > 1 ? 0 : col)));

  return updated;
};

export const solve = (board: number[][]) => {
    console.log('mmm=',board);
  let updated = true;
  let solved = false;

  while (updated && !solved) {
    updated = solveOneValueNeed(board);
    solved = isSolved(board);
  }

  /*if (!solved) {
    board = backtrackBased(board);
    solved = isSolved(board);
  }*/

  return board;
};

export const isSolvedCorrectly = (solvedBoard: number[][], initBoard: number[][]) => {
  return solvedBoard.reduce(
    (prev, row, i) => prev && row.every((cell, j) => cell === initBoard[i][j]),
    true
  );
};
