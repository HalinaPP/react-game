import { setShowModalSetting } from '@/actions/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StateModel } from '@/reducers/index';
import { ButtonProps } from '@components/Button/Button.model';
import Modal from '@components/Modal';

const mapStateToProps = (state: StateModel) => {
  return {
    isEmpty: state.modalWindow.isEmpty,
    header: state.modalWindow.header,
    body: state.modalWindow.body,
    buttons: state.modalWindow.buttons,
    theme: state.theme,
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

export const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(Modal);
