import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ButtonProps } from '@components/Button/Button.model';
import Button from '@components/Button';
import { StateModel } from '@/reducers/index';

const mapStateToProps = (state: StateModel) => {
  return {
    handleSoundOn: state.handleSoundOn.turnOn,
    handleSoundVolume: state.handleSoundOn.volume,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export const ButtonContainer = connect(mapStateToProps, mapDispatchToProps)(Button);
