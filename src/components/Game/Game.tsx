import React, { FC, useState, useEffect, useCallback } from 'react';
import './styles.scss';
import { size } from '@/constants/constants';
import { GAME_INFO, CHECK_SOLVE, BUTTON_OK, MENU } from '@/constants/text';
import { SOUNDS } from '@/constants/sounds';
import Timer from '@components/Timer';
import { showModal, hideModal } from '@components/Modal';
import { ButtonContainer } from '@/containers/Button.container';
import { FieldContainer } from '@/containers/Field.container';
import { playSound, showTime } from '@/utils/utils';
import { createSudokuMatrix, checkSolvedMatrix } from '@/utils/sudokuGenerator';
import { GameProps } from './Game.model';
import { setScore } from '@/utils/localStorage';

const Game: FC<GameProps> = ({
  newMove,
  bgSoundOn,
  bgSoundVolume,
  handleSoundOn,
  handleSoundVolume,
  difficultLevel,
  initialMatrix,
  currMatrix,
  startTime,
  generateNewGame,
  onSetShowModalSetting,
  clearField,
  undoMove,
}) => {
  const [audioEl, setAudioEl] = useState(new Audio());
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('checkMessage-fullscreen');

  useEffect(() => {
    audioEl?.pause();
    setAudioEl(playSound(bgSoundOn, SOUNDS.bg, bgSoundVolume, true));
    return function () {
      audioEl?.pause();
    };
  }, []);

  useEffect(() => {
    audioEl.volume = bgSoundVolume;

    if (bgSoundOn) {
      audioEl?.pause();
      audioEl?.play();
    } else {
      audioEl?.pause();
    }
  }, [bgSoundOn, bgSoundVolume]);

  const closeAlert = () => {
    setMessageClass('checkMessage-fullscreen');
  };

  const winBtnClick = () => {
    generateNewGame(createSudokuMatrix(size, difficultLevel));
    hideModal();
  };

  const checkFill = useCallback(() => {
    const isCorrect = checkSolvedMatrix(initialMatrix, currMatrix);

    const resultMessage = isCorrect ? CHECK_SOLVE.correctSolve : CHECK_SOLVE.wrongSolve;
    setMessage(resultMessage);

    const statusClass = isCorrect ? `success` : `danger`;

    const textClass = `text-${statusClass}`;
    const alertClass = `checkMessage-fullscreen alert alert-dismissible  alert-${statusClass}`;
    setMessageClass(alertClass);

    const audioFileName = isCorrect ? SOUNDS.correctSolve : SOUNDS.wrongSolve;

    playSound(handleSoundOn, audioFileName, handleSoundVolume);

    const btnInfo = isCorrect
      ? [
          {
            id: MENU.buttons.newGame.id,
            name: MENU.buttons.newGame.name,
            handleSoundOn,
            handleSoundVolume,
            handleClick: winBtnClick,
          },
        ]
      : [];

    onSetShowModalSetting(
      false,
      CHECK_SOLVE.check,
      <div className={textClass}>{resultMessage}</div>,
      btnInfo
    );
    showModal();

    if (isCorrect) {
      setScore(newMove, showTime(startTime), difficultLevel);
    }
  }, [initialMatrix, currMatrix, handleSoundOn, handleSoundVolume, difficultLevel, newMove]);

  return (
    <React.Fragment>
    
      <div id="fs-container">
         <div className="fs_section" id="game-container">
          <div className="game-wrap">
            <div className="game-info">
              <Timer startTime={startTime} />
              <div className="game-inf">
                {GAME_INFO.moves}: <span className="text-info">{newMove}</span>
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
                <ButtonContainer
                  id={GAME_INFO.buttons.check.id}
                  name={GAME_INFO.buttons.check.name}
                  handleClick={checkFill}
                />
              </div>
            </div>
            <div className={messageClass}>
              <button type="button" className="close" data-dismiss="alert" onClick={closeAlert}>
                &times;
              </button>
              {message}
            </div>

            <FieldContainer difficultLevel={difficultLevel} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Game;
