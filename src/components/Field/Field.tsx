import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { MENU } from '@/constants/text';
import { ButtonProps } from '@components/Button/Button.model';
import FieldItem from '@components/FieldItem';
import { useRowState } from 'react-table';

const Field: FC = () => {
  const size = 9;

  const createSudokuMatrix = () => {
    const row = new Array(size).fill('');
    console.log('r=', row);
    return row.map(() => new Array(size).fill(1));
  };

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
            return <FieldItem key={`${i}${j}`} initValue={curr} />;
          })}
        </div>
      );
    });
  };

  return <div className="field">{getCells()}</div>;
};

export default Field;
