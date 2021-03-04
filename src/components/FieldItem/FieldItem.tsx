import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { FieldItemProps } from '@components/FieldItem/FieldItem.model';
import {size} from '@/constants/constants';

const FieldItem: FC<FieldItemProps> = ({
  initValue = '',
  currValue='',
  isEditable,
  bgClass = '',
  isClear,
  pos,
  onMoveDone,
}) => {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const [fieldValue, setFieldValue] = useState(currValue);

  useEffect(() => {
    setFieldValue(initValue);
    console.log('isClear');
  }, [isClear]);

  return (
    <input
      id={pos}
      ref={inputRef}
      type="text"
      className={bgClass + (!isEditable ? ' fixed' : '')}
      disabled={!isEditable}
      autoComplete="off"
     
      value={initValue!='' ? initValue : (fieldValue!=''? fieldValue: currValue)}
      onBlur={() => {
           onMoveDone(+fieldValue);
       }}
       onClick = {()=>{
         console.log('focus');
         setFieldValue('');
        document.getElementById(pos).value=''}
        }

      onChange={event => {
        console.log('event target =',event.target);
        if ((+event.target.value <= size*size && +event.target.value >= 1) || event.target.value === '') {
         console.log('set');
         document.getElementById(pos).value=event.target.value;
          setFieldValue(event.target.value);
        }
      }}
    />
  );
};

export default FieldItem;
/*

    <div
      className={bgClass}
      contentEditable={isEditable}
      onBlur={() => {
        console.log('blue');
      }}
      onChange={() => {
        console.log('change');
      }}
      onFocus={() => {
        
        console.log('onFocus');
      }}
      onKeyDown={(event:React.KeyboardEvent) => {
       
        if(+event.key > 9 || +event.key<1){
          setFieldValue('');
        }
        console.log('onKeyDown='+event.key);
      }}

      onKeyUp={(event:React.KeyboardEvent) => {
       
        if(+event.key > 9 || +event.key<1){
          setFieldValue('');
        }
        console.log('onKeyUp='+parseInt(event.key));
      }}
    >
      {fieldValue}
    </div>
    */
/*
   <input
        type="text"
        maxLength="1"
        className={bgClass}
				disabled={!isEditable}
      	value={fieldValue ? fieldValue : ''}
        onFocus = {()=>{
          //setFieldValue('');
        }}
        onBlur = {()=>{
          //setFieldValue('1');
        }}
				onChange={(event)=>{
          //setIsSolved(true);
          console.log('onKeyUp='+event.target.value);
          if(+event.target.value <= 9 && +event.target.value>=1 || event.target.value===''){
            setFieldValue(event.target.value)
          }
         
        }}
			/>*/
