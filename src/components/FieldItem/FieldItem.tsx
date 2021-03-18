import React, { FC, useState, useEffect, useCallback } from 'react';
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

  let cellValue = initValue;
  if (initValue === '') {
    cellValue = fieldValue != '' ? fieldValue : currValue;
  }

  useEffect(() => {
    setFieldValue(initValue);
  }, [isClear]);

  const onCellClick = () => {
    setFieldValue('');
    inputRef.current!.value = '';
  };

  const onCellBlur = useCallback(() => {
    onMoveDone(Number(fieldValue));
  }, [fieldValue]);

  const onCellChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    if ((Number(target.value) <= size * size && Number(target.value) >= 1) || target.value === '') {
      inputRef.current!.value = target.value;
      setFieldValue(target.value);
    }
  };

  return (
    <input
      id={pos}
      ref={inputRef}
      type="text"
      className={bgClass + (isEditable ? '' : ' fixed')}
      disabled={!isEditable}
      autoComplete="off"
      value={cellValue}
      onBlur={onCellBlur}
      onClick={onCellClick}
      onChange={onCellChange}
    />
  );
};

export default FieldItem;
