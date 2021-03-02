import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import './style.scss';
import { ModalContainer } from '@/containers/ModalContainer';
import { MenuContainer } from '@/containers/MenuContainer';
import { GameContainer } from '@/containers/GameContainer';
import { store } from './store';
import { handleKeyPress } from '@/utils/utils';
import Footer from '@components/Footer';
import  {initLocalStarage} from '@/utils/localStorage';

export const App = () => {
  useEffect(() => {
    initLocalStarage();
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
        <Footer />
        <ModalContainer />
      </React.Fragment>
    </Provider>
  );
};
