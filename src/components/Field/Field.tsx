import React, { FC, useState, useEffect, useCallback } from 'react';
import './styles.scss';
import FieldItem from '@components/FieldItem';
import { getBgColorClass } from '@/utils/sudokuGenerator';
import { FieldProps } from './Field.model';
import { FieldItemProps } from '@components/FieldItem/FieldItem.model';
//import {getCellsEmpty} from '@/utils/utils';
import { size } from '@/constants/constants';

const Field: FC<FieldProps> = ({ fieldBlockColorOn, initialMatrix, difficultLevel }) => {
  
  const getCells = (matrix: number[][], colorOn: boolean) => {
    console.log('get cells color ON=', colorOn);
    if (!matrix || matrix.length < 1) {
      console.log('empty');
      return;
    }
    return matrix.map((row, i) => {
      return (
        <div className="row" key={i}>
          {row.map((curr, j) => {
            return (
              <FieldItem
                key={`${i}${j}`}
                initValue={(curr && curr.toString()) || ''}
                isEditable={!curr}
                bgClass={getBgColorClass(colorOn, i, j, size)}
              />
            );
          })}
        </div>
      );
    });
  };

  const [cells, setCells] = useState(getCells(initialMatrix, fieldBlockColorOn));

  useEffect(() => {
    console.log('field new render=', fieldBlockColorOn);
    setCells(getCells(initialMatrix, fieldBlockColorOn));
  }, [fieldBlockColorOn, initialMatrix]);

  return <div className="field">{cells}</div>;
};

export default Field;
