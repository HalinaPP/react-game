import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Game from '@components/Game';
import { ButtonProps } from '@components/Button/Button.model';
import { StateModel } from '@/reducers/index';
import { generateNewGame, clearField, undoMove, setShowModalSetting } from '@/actions/index';

const mapStateToProps = (state: StateModel) => {
  return {
    newMove: state.moveNumber,
    bgSoundOn: state.bgSoundOn.turnOn,
    bgSoundVolume: state.bgSoundOn.volume,
    handleSoundOn: state.handleSoundOn.turnOn,
    handleSoundVolume: state.handleSoundOn.volume,
    difficultLevel: state.difficultLevel,
    initialMatrix: state.initialMatrix,
    currMatrix: state.currMatrix,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSetShowModalSetting: (
      isEmpty: boolean,
      header: string,
      body: JSX.Element,
      buttons: ButtonProps[]
    ) => dispatch(setShowModalSetting(isEmpty, header, body, buttons)),
    generateNewGame: (initialMatrix: number[][]) => dispatch(generateNewGame(initialMatrix)),
    clearField: () => dispatch(clearField()),
    undoMove: () => dispatch(undoMove()),
  };
};

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);
