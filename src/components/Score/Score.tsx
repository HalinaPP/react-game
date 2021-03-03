import React, { FC } from 'react';
import './styles.scss';
import { HELP_INFO } from '@/constants/text';
import { ScoreProps } from './Score.model';
import {scoreUserData} from '@/types';

const Score: FC<ScoreProps> = ({ score }) => {
  console.log('SCORE+', score);

  const getScoreItems = (currScore:scoreUserData[]) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);

    return (
      <div>
        {currScore.map((item:scoreUserData, index: number) => {
          console.log('t=', item.time);
          console.log();
          return (
            <div key={index} className="score__row">
              <div>{index + 1}</div>
              <div>{item.userName}</div>
              <div>{item.moves}</div>
              <div>{dateTimeFormat.format(new Date())}</div>
              <div>{item.level}</div>
            </div>
          );
        })}
      </div>
    );
  };


  return <div className="score">{getScoreItems(score)}</div>;
};

export default Score;
