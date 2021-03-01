import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Game from '@components/Game';
import { StateModel } from '@/reducers/index';
import { generateNewGame, clearField, undoMove } from '@/actions/index';

const mapStateToProps = (state: StateModel) => {
  return {
    bgSoundOn: state.bgSoundOn.turnOn,
    bgSoundVolume: state.bgSoundOn.volume,
    difficultLevel: state.difficultLevel,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    generateNewGame: (initialMatrix: number[][]) => dispatch(generateNewGame(initialMatrix)),
    clearField: () => dispatch(clearField()),
    undoMove: () => dispatch(undoMove()),
  };
};

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);
