import React, { FC, useState, useEffect, useCallback } from 'react';
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
    // console.log('get cells color ON=', colorOn);

    if (!matrix || matrix.length < 1) {
      console.log('empty');
      return;
    }
    return matrix.map((row, i) => {
      return (
        <div className="row" key={i}>
          {row.map((curr, j) => {
            //   console.log('init ='+i+j,init);
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

  const [cells, setCells] = useState(getCells(initialMatrix,initialMatrix, fieldBlockColorOn));

  useEffect(() => {
    console.log('field new render=', fieldBlockColorOn);
    console.log('initial matrix=', initialMatrix);
    setCells(getCells(initialMatrix, currMatrix, fieldBlockColorOn));
  }, [fieldBlockColorOn, currMatrix]);

  useEffect(() => {
    console.log('initial matrix+curr');
    if (isEqualMatrix(initialMatrix, currMatrix)) {
      console.log('equal=====');
      setCells(getCells(initialMatrix, currMatrix, fieldBlockColorOn, Math.random()));
    }
  }, [currMatrix, initialMatrix]);

  useEffect(() => {
    console.log('clear matrix=');
     setCells(getCells(initialMatrix,currMatrix, fieldBlockColorOn, Math.random()));
  }, [matrixHistory]);

  return <div className="field">{cells}</div>;
};

export default Field;
