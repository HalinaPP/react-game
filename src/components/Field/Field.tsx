import React, { FC, useState, useEffect, useCallback } from 'react';
import './styles.scss';
import FieldItem from '@components/FieldItem';
import { createSudokuMatrix, getBgColorClass } from '@/utils/sudokuGenerator';
import { FieldProps } from './Field.model';

const Field: FC<FieldProps> = ({ fieldBlockColorOn, difficultLevel }) => {
  const size = 3;

  const [sudokuMatrix, setSudokuMatrix] = useState(createSudokuMatrix(size, difficultLevel));

  const newGame = () => {
    console.log('new game');
  };

  useEffect(() => {}, []);

  const getCells = useCallback(() => {
    console.log('su=', sudokuMatrix);

    return sudokuMatrix.map((row, i) => {
      return (
        <div className="row" key={i}>
          {row.map((curr, j) => {
            let bgClass = fieldBlockColorOn ? getBgColorClass(i, j, size) : '';
            let isEditable = true;
            let cellValue;
            if ((i + 1) % size === 0 && i + 1 !== size * size) {
              bgClass += ' block_bottom-border';
            }
            if ((j + 1) % size === 0 && j + 1 !== size * size) {
              bgClass += ' block_right-border';
            }
            if (curr) {
              isEditable = false;
              cellValue = curr.toString();
            }

            return (
              <FieldItem
                key={`${i}${j}`}
                initValue={cellValue || ''}
                isEditable={isEditable}
                bgClass={bgClass}
              />
            );
          })}
        </div>
      );
    });
  }, [size]);

  return <div className="field">{getCells()}</div>;
};

export default Field;
