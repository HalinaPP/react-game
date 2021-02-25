import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import FieldItem from '@components/FieldItem';
import {createSudokuMatrix} from '@/utils/sudokuGenerator';

const Field: FC = () => {
  const size = 3;
  const maxElement = size * size;

  const [sudokuMatrix, setSudokuMatrix] = useState(createSudokuMatrix());

  const newGame = () => {
    console.log('new game');
  };

  useEffect(() => {}, []);

  const getCells = () => {
    console.log('su=', sudokuMatrix);
    return sudokuMatrix.map((row, i) => {
      return (
        <div className="row" key={i}>
          {row.map((curr, j) => {
            return <FieldItem key={`${i}${j}`} initValue={curr.toString()} />;
          })}
        </div>
      );
    });
  };

  return <div className="field">{getCells()}</div>;
};

export default Field;
