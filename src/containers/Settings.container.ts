import {
  updateFieldSettings,
  updateSoundVolume,
  soundMute,
  generateNewGame,
} from '@/actions/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StateModel } from '@/reducers/index';
import Settings from '@components/Settings';

const mapStateToProps = ({
  bgSoundOn,
  handleSoundOn,
  fieldBlockColorOn,
  difficultLevel,
  lightTheme,
  theme,
}: StateModel) => {
  return {
    theme,
    difficultLevel,
    fieldBlockColorOn,
    bgSoundOn: { turnOn: bgSoundOn.turnOn, volume: bgSoundOn.volume },
    handleSoundOn: { turnOn: handleSoundOn.turnOn, volume: handleSoundOn.volume },
    lightThemeOn: lightTheme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateFieldSettings: (colorOn: boolean, level: number, lightTheme: boolean) =>
      dispatch(updateFieldSettings(colorOn, level, lightTheme)),
    updateSoundVolume: (bgSoundVolume: number, handleSoundVolume: number) =>
      dispatch(updateSoundVolume(bgSoundVolume, handleSoundVolume)),
    soundMute: (bgSoundOn: boolean, handleSoundOn: boolean) =>
      dispatch(soundMute(bgSoundOn, handleSoundOn)),
    generateNewGame: (initialMatrix: number[][], startTime: Date) =>
      dispatch(generateNewGame(initialMatrix, startTime)),
  };
};

export const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);
