import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { FieldItemProps } from '@components/FieldItem/FieldItem.model';
import { size } from '@/constants/constants';

const FieldItem: FC<FieldItemProps> = ({
  initValue = '',
  currValue = '',
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
  }, [isClear]);

  return (
    <input
      id={pos}
      ref={inputRef}
      type="text"
      className={bgClass + (!isEditable ? ' fixed' : '')}
      disabled={!isEditable}
      autoComplete="off"
      value={initValue != '' ? initValue : fieldValue != '' ? fieldValue : currValue}
      onBlur={() => {
        onMoveDone(+fieldValue);
      }}
      onClick={() => {
        setFieldValue('');
        inputRef.current!.value = '';
      }}
      onChange={event => {
        if (
          (+event.target.value <= size * size && +event.target.value >= 1) ||
          event.target.value === ''
        ) {
          inputRef.current!.value = event.target.value;
          setFieldValue(event.target.value);
        }
      }}
    />
  );
};

export default FieldItem;
