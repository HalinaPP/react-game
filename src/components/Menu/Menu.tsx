import React, { FC, useState, useEffect, useCallback } from 'react';
import './styles.scss';
import { MENU } from '@/constants/text';
import { ButtonProps } from '@components/Button/Button.model';
import {ButtonContainer} from '@/containers/Button.container';
import { useRowState } from 'react-table';
import Modal, { showModal } from '@components/Modal';
import { SettingsContainer } from '@/containers/Settings.container';
import Help from '@components/Help';
import { HELP_INFO } from '@/constants/text';
import { MenuProps } from './Menu.model';
import { SOUNDS } from '@/constants/sounds';
import { playSound } from '@/utils/utils';

const Menu: FC<MenuProps> = ({ onSetShowModalSetting }) => {
  //const [buttons, setButtons] = useState([]);

  const newGame = () => {
    console.log('new game');
    // const audio = playSound(bgSoundOn, SOUNDS.bg, bgSoundVolume, true);

    //localStorage.setItem('audioId', JSON.stringify(audio));

    //return audio.pause();
  };

  const settings = () => {
    console.log('settings');
    onSetShowModalSetting(false, MENU.buttons.settings.name, <SettingsContainer />, []);
    showModal();
  };

  const showHelp = () => {
    console.log('showHelp');
    onSetShowModalSetting(false, MENU.buttons.help.name, <Help />, []);
    showModal();
  };

  const showScore = () => {
    console.log('showScore');
    onSetShowModalSetting(false, MENU.buttons.score.name, <React.Fragment></React.Fragment>, []);
    showModal();
  };

  //useEffect(() => {}, []);
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
      id: MENU.buttons.help.id,
      name: MENU.buttons.help.name,
      handleClick: showHelp,
    },
    {
      id: MENU.buttons.score.id,
      name: MENU.buttons.score.name,
      handleClick: showScore,
    },
  ];

  const buttonItems = useCallback((): Array<JSX.Element> => {
    return buttons.map(
      (item: ButtonProps): JSX.Element => {
        console.log('item', item);
        return (
          <ButtonContainer key={item.name} id={item.id} name={item.name} handleClick={item.handleClick} />
        );
      }
    );
  }, []);

  return <nav className="menu">{buttonItems()}</nav>;
};

export default Menu;
