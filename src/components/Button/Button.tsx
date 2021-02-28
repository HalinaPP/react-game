import React, { FC } from 'react';
import { ButtonProps } from './Button.model';
import { playSound } from '@/utils/utils';
import { SOUNDS } from '@/constants/sounds';

const Button: FC<ButtonProps> = ({
  name,
  id,
  btnClassName = 'btn btn-info',
  audioFileName = SOUNDS.button,
  handleSoundOn,
  handleSoundVolume,
  handleClick,
}) => {
  const onButtonClick = () => {
    playSound(handleSoundOn, audioFileName, handleSoundVolume);
    handleClick();
  };

  return (
    <button
      type="button"
      id={id}
      className={btnClassName}
      aria-label={name}
      onClick={onButtonClick}
    >
      {name}
    </button>
  );
};

export default Button;
