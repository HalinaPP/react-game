import React, { FC } from 'react';
import { getMinSecTime } from '@/utils/utils';
import { GAME_INFO } from '@/constants/text';

const startTime = new Date();

const Timer: FC = () => {
  const showTime = (currTime: Date): string => {
    const now: Date = new Date();
    const delta = Math.trunc((+now - +currTime) / 1000);

    return getMinSecTime(delta);

    /* localStorage.setItem(
      'timeId',
      setTimeout(() => showTime(currTime), 1000)
    );*/
  };

  return (
    <div>
      {GAME_INFO.time}: {showTime(startTime)}
    </div>
  );
};

export default Timer;
