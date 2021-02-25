import React, { FC, useState, useEffect } from 'react';
import './styles.scss';
import { MENU } from '@/constants/text';
import { ButtonProps } from '@components/Button/Button.model';
import Button from '@components/Button';
import { useRowState } from 'react-table';

const Menu: FC = () => {
  //const [buttons, setButtons] = useState([]);

  const newGame = () => {
    console.log('new game');
  };

  const settings = () => {
    console.log('settings');
  };

  const showHelp = () => {
    console.log('showHelp');
  };

  const showScore = () => {
    console.log('showScore');
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
