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
  difficultLevel,
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
    return matrix.map((row, i) => {
      return (
        <div className="row" key={i}>
          {row.map((curr, j) => {
            return (
              <FieldItem
                key={`${i}${j}`}
                pos={`${i}${j}`}
                initValue={(init[i][j] && init[i][j].toString()) || ''}
                currValue={(curr && curr.toString()) || ''}
                isEditable={!init[i][j]}
                bgClass={getBgColorClass(colorOn, i, j, size)}
                onMoveDone={value => moveDone(i, j, value)}
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
