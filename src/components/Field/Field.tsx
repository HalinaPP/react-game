import React, { FC, useState, useEffect, useCallback } from 'react';
import './styles.scss';
import FieldItem from '@components/FieldItem';
import { getBgColorClass } from '@/utils/sudokuGenerator';
import { FieldProps } from './Field.model';
import { FieldItemProps } from '@components/FieldItem/FieldItem.model';
//import {getCellsEmpty} from '@/utils/utils';
import { size } from '@/constants/constants';

const Field: FC<FieldProps> = ({
  fieldBlockColorOn,
  initialMatrix,
  currMatrix,
  difficultLevel,
  matrixHistory,
  moveDone,
}) => {
  const getCells = (matrix: number[][], colorOn: boolean, isClear: number = 0) => {
    // console.log('get cells color ON=', colorOn);

    if (!matrix || matrix.length < 1) {
      console.log('empty');
      return;
    }
    return matrix.map((row, i) => {
      return (
        <div className="row" key={i}>
          {row.map((curr, j) => {
            // console.log('init ='+i+j+' ' +curr);
            return (
              <FieldItem
                key={`${i}${j}`}
                pos={`${i}${j}`}
                initValue={(curr && curr.toString()) || ''}
                isEditable={!curr}
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

  const [cells, setCells] = useState(getCells(initialMatrix, fieldBlockColorOn));

  useEffect(() => {
    /*console.log('field new render=', fieldBlockColorOn);
    console.log('ini',initialMatrix);*/
    setCells(getCells(initialMatrix, fieldBlockColorOn));
  }, [fieldBlockColorOn, initialMatrix]);
  useEffect(() => {
    console.log('clear matrix=');
    setCells(getCells(currMatrix, fieldBlockColorOn, matrixHistory.length));
    /*if(!matrixHistory || (matrixHistory.length===1 && matrixHistory[0][0][0]===-2)){
      console.log('clear matrix22222=');
      
      /*setCells([<FieldItem
        key="12"
        initValue='1'
        isEditable={true}
        bgClass={getBgColorClass(fieldBlockColorOn, 1, 1, size)}
        onMoveDone={value => moveDone(1, 1, value)}
        isClear={false}
      />]);
   }*/
  }, [matrixHistory]);

  /*useEffect(() => {
    console.log('clear matrix=');
    if(!matrixHistory || (matrixHistory.length===1 && matrixHistory[0][0][0]===-2)){
      console.log('clear matrix22222=');
      setCells(getCells(initialMatrix, fieldBlockColorOn, true));
      /*setCells([<FieldItem
        key="12"
        initValue='1'
        isEditable={true}
        bgClass={getBgColorClass(fieldBlockColorOn, 1, 1, size)}
        onMoveDone={value => moveDone(1, 1, value)}
        isClear={false}
      />]);*/
  /*   }
  }, [matrixHistory]);
  */
  return <div className="field">{cells}</div>;
};

export default Field;
