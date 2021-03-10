import React, { FC } from 'react';
import './styles.scss';
import { ScoreProps } from './Score.model';
import { scoreUserData } from '@/types';
import { SCORE_INFO } from '@/constants/text';


const Score: FC<ScoreProps> = ({ score }) => {
  const {userName, moves,time,level} = SCORE_INFO;

  const getScoreItems = (currScore: scoreUserData[]) => {
    return (
      <div>
        <div className="score-head score__row">
          <div></div>
          <div>{userName}</div>
          <div>{moves}</div>
          <div>{time}</div>
          <div>{level}</div>
        </div>
        {currScore
          ? currScore.map((item: scoreUserData, index: number) => {
              return (
                <div key={index} className="score__row">
                  <div>{index + 1}</div>
                  <div>{item.userName}</div>
                  <div>{item.moves}</div>
                  <div>{item.time}</div>
                  <div>{item.level}</div>
                </div>
              );
            })
          : null}
      </div>
    );
  };

  return <div className="score">{getScoreItems(score)}</div>;
};

export default Score;
