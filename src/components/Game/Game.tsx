import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { size } from '@/constants/constants';
import { GAME_INFO, CHECK_SOLVE } from '@/constants/text';
import { SOUNDS } from '@/constants/sounds';
import Timer from '@components/Timer';
import { showModal } from '@components/Modal';
import { ButtonContainer } from '@/containers/Button.container';
import { FieldContainer } from '@/containers/Field.container';
import { playSound } from '@/utils/utils';
import { createSudokuMatrix, checkSolvedMatrix } from '@/utils/sudokuGenerator';
import { GameProps } from './Game.model';
import { setScore } from '@/utils/localStorage';
const time = new Date();

const Game: FC<GameProps> = ({
  newMove,
  bgSoundOn,
  bgSoundVolume,
  handleSoundOn,
  handleSoundVolume,
  difficultLevel,
  initialMatrix,
  currMatrix,
  generateNewGame,
  onSetShowModalSetting,
  clearField,
  undoMove,
}) => {
  const [audioEl, setAudioEl] = useState(new Audio());
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('checkMessage-fullscreen');

  useEffect(() => {
    console.log('message');
  }, [message]);

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

  const closeAlert = (event:React.MouseEvent) =>{
    setMessageClass('checkMessage-fullscreen');
  }


  const checkFill = () => {
    console.log('checkFill');
    const isCorrect = checkSolvedMatrix(initialMatrix, currMatrix);

    const resultMessage = isCorrect ? CHECK_SOLVE.correctSolve : CHECK_SOLVE.wrongSolve;
    setMessage(resultMessage);

    const mesClass = isCorrect
      ? 'checkMessage-fullscreen alert alert-dismissible  alert-success'
      : 'checkMessage-fullscreen alert alert-dismissible alert-danger';
    setMessageClass(mesClass);

    const audioFileName = isCorrect ? SOUNDS.correctSolve : SOUNDS.wrongSolve;

    playSound(handleSoundOn, audioFileName, handleSoundVolume);
    onSetShowModalSetting(false, CHECK_SOLVE.check, <div>{resultMessage}</div>, []);
    showModal();

    if (isCorrect) {
      setScore(newMove, time, difficultLevel);
      generateNewGame(createSudokuMatrix(size, difficultLevel));
    }
  };

  return (
    <React.Fragment>
      <div id="fs-container">
        <div className="fs_section" id="game-container">
          <div className="game-wrap">
            <div className="game-info">
              <Timer />
              <div>
                {GAME_INFO.moves}: {newMove}
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
              <button type="button" className="close" data-dismiss="alert" onClick = {closeAlert}>
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
