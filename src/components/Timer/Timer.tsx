import React, { FC, useState, useEffect } from 'react';
import { TimerProps } from './Timer.model';
import { showTime } from '@/utils/utils';
import { GAME_INFO } from '@/constants/text';
import './styles.scss';

const Timer: FC<TimerProps> = ({ startTime }) => {

  const [time, setTime] = useState('00:00');
  
  useEffect(() => {
    const timer = () =>
      setTimeout(() => {
        setTime(showTime(startTime));
      }, 1000);

    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  });
 
  return (
    <div className="game-info__timer">
      {GAME_INFO.time}: <span className="text-info">{time}</span>
    </div>
  );
};

export default Timer;
