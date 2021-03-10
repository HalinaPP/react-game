import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import FieldItem from '@components/FieldItem';
import { getBgColorClass } from '@/utils/sudokuGenerator';
import { FieldProps } from './Field.model';
import { isEqualMatrix } from '@/utils/utils';
import { size } from '@/constants/constants';

const Field: FC<FieldProps> = ({
  fieldBlockColorOn,
  initialMatrix,
  currMatrix,
  matrixHistory,
  moveDone,
}) => {

  const getCells = (
    init: number[][],
    matrix: number[][],
    colorOn: boolean,
    isClear: number = 0
  ) => {
    if (!matrix || matrix.length < 1) {
      return;
    }
    return matrix.map((row, rowIndex) => {
      return (
        <div className="row" key={rowIndex}>
          {row.map((curr, colIndex) => {
            const initCellValue= init[rowIndex][colIndex];
            
            return (
              <FieldItem
                key={`${rowIndex}${colIndex}`}
                pos={`${rowIndex}${colIndex}`}
                initValue={(initCellValue && initCellValue.toString()) || ''}
                currValue={(curr && curr.toString()) || ''}
                isEditable={!initCellValue}
                bgClass={getBgColorClass(colorOn, rowIndex, colIndex, size)}
                onMoveDone={value => moveDone(rowIndex, colIndex, value)}
                isClear={isClear}
              />
            );
          })}
        </div>
      );
    });
  };

  const [cells, setCells] = useState(getCells(initialMatrix, initialMatrix, fieldBlockColorOn));

  useEffect(() => {
    setCells(getCells(initialMatrix, currMatrix, fieldBlockColorOn));
  }, [fieldBlockColorOn, currMatrix]);

  useEffect(() => {
    if (isEqualMatrix(initialMatrix, currMatrix)) {
      setCells(getCells(initialMatrix, currMatrix, fieldBlockColorOn, Math.random()));
    }
  }, [currMatrix, initialMatrix]);

  useEffect(() => {
    setCells(getCells(initialMatrix, currMatrix, fieldBlockColorOn, Math.random()));
  }, [matrixHistory]);

  return <div className="field">{cells}</div>;
};

export default Field;
