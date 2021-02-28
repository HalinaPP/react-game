import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ButtonProps } from '@components/Button/Button.model';
import Game from '@components/Game';
import { StateModel } from '@/reducers/index';

const mapStateToProps = (state: StateModel) => {
  return {
    bgSoundOn: state.bgSoundOn.turnOn,
    bgSoundVolume: state.bgSoundOn.volume,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);
