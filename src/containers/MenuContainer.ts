import { setShowModalSetting } from '@/actions/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ButtonProps } from '@components/Button/Button.model';
import Menu from '@components/Menu';

const mapStateToProps = () => {
  return {};
};

/*export const setShowModalSetting = (header: string, body: JSX.Element, buttons: ButtonProps[]) => (
  dispatch: Dispatch
) => {
  dispatch(setShowModalSettingA(header, body, buttons));
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setShowModalSettings: (header: string, body: JSX.Element, buttons: ButtonProps[]) =>
      dispatch(setShowModalSetting(header, body, buttons)),
  };
};*/
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
