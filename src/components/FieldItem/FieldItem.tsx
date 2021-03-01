import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { FieldItemProps } from '@components/FieldItem/FieldItem.model';

const FieldItem: FC<FieldItemProps> = ({
  initValue = '',
  isEditable,
  bgClass = '',
  isClear,
  pos,
  onMoveDone,
}) => {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  /*const [value, setValue] = useState(initValue || '');
  const [itemClassName, setItemClassName] = useState(`col ${bgClass}`);
*/
  const [fieldValue, setFieldValue] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [needClear, setNeedClear] = useState(isClear);

  useEffect(() => {
    // console.log('first field item');
    //
    console.log('fff=', isClear);
    if (isClear === 0) {
      setFieldValue('');
    }
    // const item = document.getElementById(inputRef.current?.id!);
    // item.value = initValue;
    //  console.log(inputRef.current?.id);
  }, [isClear]);

  /*useEffect(() => {
    console.log('first field item2');
    setFieldValue(initValue);
    return function(){
      console.log('delete field item2');
    }
  }, [isClear]);*/

  //console.log('needClear',isClear);
  //console.log('init=', initValue);
  //console.log('fieldValue=', fieldValue);
  return (
    <input
      id={pos}
      ref={inputRef}
      type="text"
      ///  maxLength="1"
      className={bgClass + (!isEditable ? ' fixed' : '')}
      disabled={!isEditable}
      // value={fieldValue ? fieldValue : ''}
      value={initValue !== '' ? initValue : fieldValue}
      onFocus={() => {
        //setFieldValue('');
      }}
      onBlur={() => {
        //setFieldValue('1');
        // setNeedClear(false);
        onMoveDone(+fieldValue);
        //console.log('ref=',inputRef.current);
      }}
      onChange={event => {
        //setIsSolved(true);
        //setNeedClear(false);
        console.log('onKeyUp=' + event.target.value);
        if ((+event.target.value <= 9 && +event.target.value >= 1) || event.target.value === '') {
          setFieldValue(event.target.value);
          //  console.log('ref=',inputRef.current);
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
