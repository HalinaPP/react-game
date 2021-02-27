import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import './style.scss';
import { MENU } from '@/constants/text';
import {ModalContainer} from '@/containers/ModalContainer';
import {MenuContainer} from '@/containers/MenuContainer';

import Game from '@components/Game';
import { store } from './store';


export const App = () => {
  useEffect(() => {
    //showModal();//<Modal header={MENU.name} body={MENU.choose} />
  }, []);
  const {modalWindow:{header,body,buttons}} = store.getState();
  return (
    <Provider store={store}>
      <React.Fragment>
        <main>
          <aside className="game">
            <Game />
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
/*  <Modal header="Settings" body={<SettingsContainer/>} buttons={[{ name:'OK', handleClick:handleClose}]}></Modal>
 <Modal
          header="Help"
          body={<Help />}
          
        ></Modal>

        <Modal
          header="Settings"
          body={<SettingsContainer />}
         
        ></Modal> 
*/
