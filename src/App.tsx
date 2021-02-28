import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import './style.scss';
import { ModalContainer } from '@/containers/ModalContainer';
import { MenuContainer } from '@/containers/MenuContainer';
import { GameContainer } from '@/containers/GameContainer';
import { store } from './store';
import { handleKeyPress } from '@/utils/utils';

export const App = () => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    //showModal();//<Modal header={MENU.name} body={MENU.choose} />
  }, []);

  /* const {
    modalWindow: { header, body, buttons },
  } = store.getState();
*/
  return (
    <Provider store={store}>
      <React.Fragment>
        <main>
          <aside className="game">
            <GameContainer />
          </aside>
          <aside>
            <MenuContainer />
          </aside>
        </main>
        <ModalContainer />
      </React.Fragment>
    </Provider>
  );
};
