import React, { useEffect} from 'react';
import { Provider } from 'react-redux';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import './style.scss';
import {MainContainer} from '@/containers/MainContainer';
import { store } from './store';
import { handleKeyPress } from '@/utils/utils';
import { initLocalStarage } from '@/utils/localStorage';
import {LangContext} from '@/utils/langContext';

export const App = () => {
  
  useEffect(() => {
    initLocalStarage();
    document.addEventListener('keydown', handleKeyPress);
  }, []);
 
  return (
    <Provider store={store}>
      <React.Fragment>
        <LangContext.Provider value={store.getState().theme}>
          <MainContainer/>
        </LangContext.Provider>
      </React.Fragment>
    </Provider>
  );
};
