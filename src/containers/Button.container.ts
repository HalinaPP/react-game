import { connect } from 'react-redux';
import Button from '@components/Button';
import { StateModel } from '@/reducers/index';

const mapStateToProps = ({ handleSoundOn }: StateModel) => {
  return {
    handleSoundOn: handleSoundOn.turnOn,
    handleSoundVolume: handleSoundOn.volume,
  };
};

export const ButtonContainer = connect(mapStateToProps)(Button);
