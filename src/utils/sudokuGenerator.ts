import { MATRIX_NUM_SHUFFLE } from '@/constants/constants';

export const getBgColorClass = (row: number, col: number, size: number) => {
  const block = Math.trunc(col / size) + Math.trunc(row / size) * size + 1;
  return `col_color-bg bg-${block}`;
};

const getMaxElement = (size: number): number => {
  return size * size;
};

const initMatrix = (size: number) => {
  const maxElement = getMaxElement(size);

  return new Array(maxElement)
    .fill('')
    .map((row, i) =>
      new Array(maxElement)
        .fill('')
        .map((cell, j) => Math.trunc(((i * size + i / size + j) % maxElement) + 1))
    );
};

const reverseMatrix = (matrix: number[][], size: number) => {
  const maxElement = getMaxElement(size);

  return Array(maxElement)
    .fill('')
    .map((row, i) => new Array(maxElement).fill('').map((cell, j) => matrix[j][i]));
};

const changeRowsMatrix = (matrix: number[][], size: number) => {
  const maxElement = getMaxElement(size);

  const block = Math.trunc(Math.random() * 3);
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

const changeColsMatrix = (matrix: number[][], size: number) => {
  const reverse = reverseMatrix(matrix, size);
  const changeRows = changeRowsMatrix(reverse, size);
  return reverseMatrix(changeRows, size);
};

const changeRowsBlockMatrix = (matrix: number[][], size: number) => {
  const maxElement = getMaxElement(size);

  const blockFirst = Math.trunc(Math.random() * 3) * size;

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

const changeColsBlockMatrix = (matrix: number[][], size: number) => {
  const reverse = reverseMatrix(matrix, size);
  const changeRows = changeRowsBlockMatrix(reverse, size);
  return reverseMatrix(changeRows, size);
};

const hideNumbers = (matrix: number[][], size: number, difficultLevel:number) => {
  const maxElement = getMaxElement(size);

  const viewMatrixElement = new Array(maxElement).fill(0).map(() => new Array(maxElement).fill(0));
  const cutMatrix = matrix.map((row) => [...row]);

  console.log('vi=', viewMatrixElement);

  let iterator = 0;
  const cellsNumber = size ** 4;
  let difficult = cellsNumber;
 
  const difficultLevelCount = Math.trunc(cellsNumber * difficultLevel/100)
  
  while (iterator < cellsNumber && difficult>difficultLevelCount) {
    const row = Math.trunc(Math.random() * maxElement);
    const col = Math.trunc(Math.random() * maxElement);

    if (viewMatrixElement[row][col] === 0) {
      iterator += 1;
      viewMatrixElement[row][col] = 1;

      let currElement = cutMatrix[row][col];
      cutMatrix[row][col] = 0;
      difficult -= 1;

      let numSolutions = 0;
      /*const tableSolution = [];
      for (let i = 0; i < maxElement; i++) {
        tableSolution.push([...cutMatrix[i]]);
      }
   
      //проверить сколько решений
      /*
        numSolutions = numSolvesSudoku(size, tableSolution);
      */

      if (numSolutions > 1) {
        viewMatrixElement[row][col] = currElement;
        difficult += 1;
      }
    }
   
  }
  console.log('ite='+iterator+' s'+difficult);
  return cutMatrix;
};

export const createSudokuMatrix = (size: number, difficultLevel:number) => {
  const changeMatrixFunc = [
    reverseMatrix,
    changeRowsMatrix,
    changeColsMatrix,
    changeRowsBlockMatrix,
    changeColsBlockMatrix,
  ];
  let matrix = initMatrix(size);

  for (let i = 0; i < MATRIX_NUM_SHUFFLE; i++) {
    let funcNum = Math.trunc(Math.random() * changeMatrixFunc.length);
    matrix = changeMatrixFunc[funcNum](matrix, size);
  }
  matrix = hideNumbers(matrix, size,difficultLevel);
  return matrix;
};
