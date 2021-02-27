import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { GAME_INFO } from '@/constants/text';
import Timer from '@components/Timer';
import Button from '@components/Button';
import { FieldContainer } from '@/containers/Field.container';

const Game: FC = () => {
  const [moves, setMoves] = useState(0);

  const newGame = () => {
    console.log('new game');
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div className="game-info">
        <Timer />
        <div>
          {GAME_INFO.moves}: {moves}
        </div>
        <Button name={GAME_INFO.undo} handleClick={() => {}} />
        <Button name={GAME_INFO.clear} handleClick={() => {}} />
      </div>
      <FieldContainer />
    </React.Fragment>
  );
};

export default Game;
