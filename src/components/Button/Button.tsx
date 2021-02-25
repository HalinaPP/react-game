import React, { FC } from 'react';
import { ButtonProps } from './Button.model';

const Button: FC<ButtonProps> = ({
  name,
  value = name,
  btnClassName = 'btn btn-info',
  handleClick,
}) => {
  return (
    <button type="button" className={btnClassName} aria-label={name} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Button;
