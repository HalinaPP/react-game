import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { GAME_INFO } from '@/constants/text';
import Timer from '@components/Timer';
import { ButtonContainer } from '@/containers/Button.container';
import { FieldContainer } from '@/containers/Field.container';
import { SOUNDS } from '@/constants/sounds';
import { playSound } from '@/utils/utils';
import { GameProps } from './Game.model';
import { createSudokuMatrix } from '@/utils/sudokuGenerator';
import { size } from '@/constants/constants';

const Game: FC<GameProps> = ({ bgSoundOn, bgSoundVolume, difficultLevel, generateNewGame }) => {
  const [moves, setMoves] = useState(0);
  const [audioEl, setAudioEl] = useState(new Audio());
  //const [sudokuMatrix, setSudokuMatrix] = useState();
  useEffect(() => {
    console.log('nnnn=');
    audioEl?.pause();

    setAudioEl(playSound(bgSoundOn, SOUNDS.bg, bgSoundVolume, true));
    return function () {
      console.log('end');
      audioEl?.pause();
    };
  }, []);

  useEffect(() => {
    generateNewGame(createSudokuMatrix(size, difficultLevel));
  }, [difficultLevel]);

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
      <FieldContainer difficultLevel={difficultLevel}/>
    </React.Fragment>
  );
};

export default Game;
