import { connect } from 'react-redux';
import Main from '@components/Main';
import { StateModel } from '@/reducers/index';

const mapStateToProps = (state: StateModel) => {
  return {
    theme: state.theme,
  };
};

export const MainContainer = connect(mapStateToProps)(Main);
