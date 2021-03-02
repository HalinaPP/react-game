import { connect } from 'react-redux';
import Button from '@components/Button';
import { StateModel } from '@/reducers/index';

const mapStateToProps = (state: StateModel) => {
  return {
    handleSoundOn: state.handleSoundOn.turnOn,
    handleSoundVolume: state.handleSoundOn.volume,
  };
};

export const ButtonContainer = connect(mapStateToProps)(Button);
