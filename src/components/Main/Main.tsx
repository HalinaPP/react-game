import './styles.scss';
import React, { FC } from 'react';
import { MainProps } from './Main.model';
import { ModalContainer } from '@/containers/ModalContainer';
import { MenuContainer } from '@/containers/MenuContainer';
import { GameContainer } from '@/containers/GameContainer';
import Footer from '@components/Footer';

const Main: FC<MainProps> = ({ theme }) => {
  return (
    <React.Fragment>
      <main style={{ background: theme.background, color: theme.info }}>
        <GameContainer />
        <aside>
          <MenuContainer />
        </aside>
      </main>
      <Footer theme={theme} />
      <ModalContainer />
    </React.Fragment>
  );
};
export default Main;
