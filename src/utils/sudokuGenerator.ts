import { MATRIX_NUM_SHUFFLE } from '@/constants/constants';
const size = 3;
const maxElement = size * size;

const initMatrix = () => {
    return new Array(maxElement)
      .fill('')
      .map((row, i) =>
        new Array(maxElement)
          .fill('')
          .map((cell, j) => Math.trunc(((i * size + i / size + j) % maxElement) + 1))
      );
  };

  const reverseMatrix = (matrix: number[][]) => {
    return Array(maxElement)
      .fill('')
      .map((row, i) => new Array(maxElement).fill('').map((cell, j) => matrix[j][i]));
  };

  const changeRowsMatrix = (matrix: number[][]) => {
    let block = Math.trunc(Math.random() * 3);
    const rowNumFirst = Math.trunc(Math.random() * 3);
    const rowFirst = block * size + rowNumFirst;

    let rowNumSecond;
    do {
      rowNumSecond = Math.trunc(Math.random() * 3);
    } while (rowNumSecond === rowNumFirst);
    const rowSecond = block * size + rowNumSecond;

    let rowIndex: number;

    return new Array(maxElement).fill('').map((row, i) => {
      rowIndex = i;
      if (i === rowFirst) {
        rowIndex = rowSecond;
      } else if (i === rowSecond) {
        rowIndex = rowFirst;
      }

      return new Array(maxElement).fill('').map((cell, j) => matrix[rowIndex][j]);
    });
  };

  const changeColsMatrix = (matrix: number[][]) => {
    const reverse = reverseMatrix(matrix);
    const changeRows = changeRowsMatrix(reverse);
    return reverseMatrix(changeRows);
  };

  const changeRowsBlockMatrix = (matrix: number[][]) => {
    let blockFirst = Math.trunc(Math.random() * 3) * size;

    let blockSecond: number;
    do {
      blockSecond = Math.trunc(Math.random() * 3) * size;
    } while (blockSecond === blockFirst);

    let rowIndex: number;

    return new Array(maxElement).fill('').map((row, i) => {
      rowIndex = i;

      if (i >= blockFirst && i < blockFirst + size) {
        rowIndex = (i % size) + blockSecond;
      } else if (i >= blockSecond && i < blockSecond + size) {
        rowIndex = (i % size) + blockFirst;
      }

      return new Array(maxElement).fill('').map((cell, j) => matrix[rowIndex][j]);
    });
  };

  const changeColsBlockMatrix = (matrix: number[][]) => {
    const reverse = reverseMatrix(matrix);
    const changeRows = changeRowsBlockMatrix(reverse);
    return reverseMatrix(changeRows);
  };

  export const createSudokuMatrix = () => {
    const changeMatrixFunc = [
      reverseMatrix,
      changeRowsMatrix,
      changeColsMatrix,
      changeRowsBlockMatrix,
      changeColsBlockMatrix,
    ];
    let matrix = initMatrix();

    for (let i = 0; i < MATRIX_NUM_SHUFFLE; i++) {
      let funcNum = Math.trunc(Math.random() * changeMatrixFunc.length);
      matrix = changeMatrixFunc[funcNum](matrix);
    }
    return matrix;
  };