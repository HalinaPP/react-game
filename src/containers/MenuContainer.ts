import { setShowModalSetting } from '@/actions/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ButtonProps } from '@components/Button/Button.model';
import Menu from '@components/Menu';
import { StateModel } from '@/reducers/index';

const mapStateToProps = (state: StateModel) => {
  return {
    /* bgSoundOn: state.bgSoundOn.turnOn,
    bgSoundVolume: state.bgSoundOn.volume,*/
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
  };
};

export const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);
