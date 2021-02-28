import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { FieldItemProps } from '@components/FieldItem/FieldItem.model';

const FieldItem: FC<FieldItemProps> = ({ initValue, isEditable, bgClass ='' }) => {
  /*const [value, setValue] = useState(initValue || '');
  const [itemClassName, setItemClassName] = useState(`col ${bgClass}`);
*/
  useEffect(() => {}, []);
  
/*
 contentEditable={isEditable}*/
  return (
    <div className={bgClass}>
      {initValue}
    </div>
  );
};

export default FieldItem;
