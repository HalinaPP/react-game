import React, { FC, useState, useEffect, useCallback } from 'react';
import './styles.scss';
import { size } from '@/constants/constants';
import { MENU } from '@/constants/text';
import { showModal } from '@components/Modal';
import Score from '@components/Score';
import Help from '@components/Help';
import { MenuProps } from './Menu.model';
import { ButtonProps } from '@components/Button/Button.model';
import { ButtonContainer } from '@/containers/Button.container';
import { SettingsContainer } from '@/containers/Settings.container';
import { createSudokuMatrix } from '@/utils/sudokuGenerator';
import { enterFullscreen } from '@/utils/fullscreen';
import { getScore } from '@/utils/localStorage';
import { solve } from '@/utils/sudokuSolver';

const Menu: FC<MenuProps> = ({
  initialMatrix,
  onSetShowModalSetting,
  difficultLevel,
  generateNewGame,
  moveDone,
}) => {
  const newGame = () => {
    console.log('new game');
    generateNewGame(createSudokuMatrix(size, difficultLevel));
  };

  const settings = () => {
    onSetShowModalSetting(false, MENU.buttons.settings.name, <SettingsContainer />, []);
    showModal();
  };

  const showHelp = () => {
    onSetShowModalSetting(false, MENU.buttons.help.name, <Help />, []);
    showModal();
  };

  const showScore = () => {
    onSetShowModalSetting(false, MENU.buttons.score.name, <Score score={getScore()} />, []);
    showModal();
  };

  const autoplay = () => {
    solve([], moveDone, true);
  };

  const buttons = [
    {
      id: MENU.buttons.newGame.id,
      name: MENU.buttons.newGame.name,
      handleClick: newGame,
    },
    {
      id: MENU.buttons.settings.id,
      name: MENU.buttons.settings.name,
      handleClick: settings,
    },

    {
      id: MENU.buttons.score.id,
      name: MENU.buttons.score.name,
      handleClick: showScore,
    },
    {
      id: MENU.buttons.fullscreen.id,
      name: MENU.buttons.fullscreen.name,
      handleClick: () => {
        enterFullscreen('game-container');
      },
    },
    {
      id: MENU.buttons.help.id,
      name: MENU.buttons.help.name,
      handleClick: showHelp,
    },
    {
      id: MENU.buttons.autoplay.id,
      name: MENU.buttons.autoplay.name,
      handleClick: autoplay,
    },
  ];

  const buttonItems = useCallback((): Array<JSX.Element> => {
    return buttons.map(
      (item: ButtonProps): JSX.Element => {
        return (
          <ButtonContainer
            key={item.name}
            id={item.id}
            name={item.name}
            handleClick={item.handleClick}
          />
        );
      }
    );
  }, []);

  return <nav className="menu">{buttonItems()}</nav>;
};

export default Menu;
