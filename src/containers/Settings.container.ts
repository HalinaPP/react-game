import { updateFieldSettingsA, updateSoundVolume, soundMute } from '@/actions/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StateModel } from '@/reducers/index';

import Settings from '@components/Settings';

const mapStateToProps = (state: StateModel) => {
  return {
    bgSoundOn: { turnOn: state.bgSoundOn.turnOn, volume: state.bgSoundOn.volume },
    handleSoundOn: { turnOn: state.handleSoundOn.turnOn, volume: state.handleSoundOn.volume },
    fieldBlockColorOn: state.fieldBlockColorOn,
    difficultLevel: state.difficultLevel,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateFieldSettings: (value: boolean) => dispatch(updateFieldSettingsA(value)),
    updateSoundVolume: (bgSoundVolume: number, handleSoundVolume: number) =>
      dispatch(updateSoundVolume(bgSoundVolume, handleSoundVolume)),
    soundMute: (bgSoundOn: boolean, handleSoundOn: boolean) =>
      dispatch(soundMute(bgSoundOn, handleSoundOn)),
  };
};

export const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);
