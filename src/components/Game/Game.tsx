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

const Game: FC<GameProps> = ({
  bgSoundOn,
  bgSoundVolume,
  difficultLevel,
  generateNewGame,
  clearField,
  undoMove,
}) => {
  const [moves, setMoves] = useState(0);
  const [audioEl, setAudioEl] = useState(new Audio());

  useEffect(() => {
    audioEl?.pause();
    setAudioEl(playSound(bgSoundOn, SOUNDS.bg, bgSoundVolume, true));
    return function () {
      audioEl?.pause();
    };
  }, []);

  useEffect(() => {
    console.log('game generateNewGame' + difficultLevel);
    generateNewGame(createSudokuMatrix(size, difficultLevel));
  }, [difficultLevel]);

  useEffect(() => {
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
      <div id="fs-container">
        <div className="fs_section" id="game-container">
          <div className="game-wrap">
            <div className="game-info">
              <Timer />
              <div>
                {GAME_INFO.moves}: {moves}
              </div>
              <div className="game-info__button-container">
                <ButtonContainer
                  id={GAME_INFO.buttons.undo.id}
                  name={GAME_INFO.buttons.undo.name}
                  audioFileName={SOUNDS.undo}
                  handleClick={undoMove}
                />
                <ButtonContainer
                  id={GAME_INFO.buttons.clear.id}
                  name={GAME_INFO.buttons.clear.name}
                  audioFileName={SOUNDS.clear}
                  handleClick={clearField}
                />
              </div>
            </div>
            <FieldContainer difficultLevel={difficultLevel} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Game;
