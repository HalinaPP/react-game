import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { FieldItemProps } from '@components/FieldItem/FieldItem.model';

const FieldItem: FC<FieldItemProps> = ({ initValue,isEditable, bgClass='' }) => {
  const [value, setValue] = useState(initValue || '');
  const [itemClassName, setItemClassName] = useState(`col ${bgClass}`);

  useEffect(() => {
    
  }, []);

  return (
    <div className={itemClassName} contentEditable={isEditable}>
      {value}
    </div>
  );
};

export default FieldItem;
