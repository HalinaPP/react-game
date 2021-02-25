import React, { useEffect } from 'react';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import './style.scss';
import { MENU } from '@/constants/text';
import Modal, { showModal } from '@components/Modal';
import Menu from '@components/Menu';
import Game from '@components/Game';

export const App = () => {
  useEffect(() => {
    //showModal();<Modal header={MENU.name} body={MENU.choose} />
  }, []);

  return (
    <React.Fragment>
      <main>
        <aside className="game">
          <Game />
        </aside>
        <aside>
          <Menu />
        </aside>
      </main>
    </React.Fragment>
  );
};
