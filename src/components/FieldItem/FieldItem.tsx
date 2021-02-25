import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { FieldItemProps } from '@components/FieldItem/FieldItem.model';

const FieldItem: FC<FieldItemProps> = ({ initValue }) => {
  const [value, setValue] = useState(initValue || '');

  useEffect(() => {}, []);

  return (
    <div className="col" contentEditable>
      {value}
    </div>
  );
};

export default FieldItem;
