import { updateFieldSettingsA } from '@/actions/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StateModel } from '@/reducers/index';

import Settings from '@components/Settings';

const mapStateToProps = (state: StateModel) => {
  return {
    bgSoundOn: state.bgSoundOn,
    handleSoundOn: state.handleSoundOn,
    fieldBlockColorOn: state.fieldBlockColorOn,
    difficultLevel: state.difficultLevel,
  };
};

export const updateFieldSettings = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(updateFieldSettingsA(value));
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateFieldSettings: (value: boolean) => dispatch(updateFieldSettings(value)),
  };
};

export const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);
