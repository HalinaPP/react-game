import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { MENU } from '@/constants/text';
import { ButtonProps } from '@components/Button/Button.model';
import Button from '@components/Button';
import { useRowState } from 'react-table';
import Modal, { showModal } from '@components/Modal';
import { SettingsContainer } from '@/containers/Settings.container';
import Help from '@components/Help';
import { HELP_INFO } from '@/constants/text';
import { MenuProps } from './Menu.model';

const Menu: FC<MenuProps> = ({ onSetShowModalSetting }) => {
  //const [buttons, setButtons] = useState([]);

  const newGame = () => {
    console.log('new game');
  };

  const settings = () => {
    console.log('settings');
    onSetShowModalSetting(false, MENU.buttons.settings,<SettingsContainer />, []);
    showModal();
  };

  const showHelp = () => {
    console.log('showHelp');
    onSetShowModalSetting(false, MENU.buttons.help, <Help />, []);
    showModal();
  };

  const showScore = () => {
    console.log('showScore');
    onSetShowModalSetting(false, MENU.buttons.score,<React.Fragment></React.Fragment>, []);
    showModal();
  };

  useEffect(() => {}, []);

  const buttons = [
    {
      name: MENU.buttons.newGame,
      handleClick: newGame,
    },
    {
      name: MENU.buttons.settings,
      handleClick: settings,
    },
    {
      name: MENU.buttons.help,
      handleClick: showHelp,
    },
    {
      name: MENU.buttons.score,
      handleClick: showScore,
    },
  ];
  const buttonItems = (): Array<JSX.Element> => {
    return buttons.map(
      (item: ButtonProps): JSX.Element => {
        console.log('item', item);
        return <Button key={item.name} name={item.name} handleClick={item.handleClick} />;
      }
    );
  };

  return <nav className="menu">{buttonItems()}</nav>;
};

export default Menu;
