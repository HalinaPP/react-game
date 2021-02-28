import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ButtonProps } from '@components/Button/Button.model';
import Game from '@components/Game';
import { StateModel } from '@/reducers/index';
import { generateNewGame } from '@/actions/index';

const mapStateToProps = (state: StateModel) => {
  return {
    bgSoundOn: state.bgSoundOn.turnOn,
    bgSoundVolume: state.bgSoundOn.volume,
    difficultLevel:state.difficultLevel
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    generateNewGame: (initialMatrix: number[][]) => dispatch(generateNewGame(initialMatrix)),
  };
};

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);
