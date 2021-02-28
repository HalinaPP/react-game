import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { GAME_INFO } from '@/constants/text';
import Timer from '@components/Timer';
import {ButtonContainer} from '@/containers/Button.container';
import { FieldContainer } from '@/containers/Field.container';
import { SOUNDS } from '@/constants/sounds';
import { playSound } from '@/utils/utils';
import { GameProps } from './Game.model';

let i = 0;

const Game: FC<GameProps> = ({ bgSoundOn, bgSoundVolume }) => {
  const [moves, setMoves] = useState(0);
  const [audioEl, setAudioEl] = useState(new Audio());
  const newGame = () => {
    console.log('new game');
  };

  useEffect(() => {
    i++;
    console.log('nnnn=', i);
    audioEl?.pause();

    setAudioEl(playSound(bgSoundOn, SOUNDS.bg, bgSoundVolume, true));
    return function () {
      console.log('end');
      audioEl?.pause();
    };
  }, []);

  useEffect(() => {
    console.log('useAu');
    audioEl.volume = bgSoundVolume;
  
    if (bgSoundOn) {
      audioEl?.pause();
      audioEl?.play();
    } else {
      audioEl?.pause();
    }
  }, [bgSoundOn, bgSoundVolume]);

  return (
    <React.Fragment>
      <div className="game-info">
        <Timer />
        <div>
          {GAME_INFO.moves}: {moves}
        </div>
        <ButtonContainer
          id={GAME_INFO.undo}
          name={GAME_INFO.undo}
          audioFileName={SOUNDS.undo}
          handleClick={() => {}}
        />
        <ButtonContainer
          id={GAME_INFO.clear}
          name={GAME_INFO.clear}
          audioFileName={SOUNDS.clear}
          handleClick={() => {}}
        />
      </div>
      <FieldContainer />
    </React.Fragment>
  );
};

export default Game;
