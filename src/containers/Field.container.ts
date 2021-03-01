import { connect } from 'react-redux';
import { StateModel } from '@/reducers/index';
import { Dispatch } from 'redux';
import Field from '@components/Field';
import { moveDone } from '@/actions/index';

const mapStateToProps = (state: StateModel) => {
  return {
    fieldBlockColorOn: state.fieldBlockColorOn,
    initialMatrix: state.initialMatrix,
    currMatrix: state.currMatrix,
    matrixHistory:  state.matrixHistory
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    moveDone: (row: number, col: number, value: number) => dispatch(moveDone(row, col, value)),
  };
};
export const FieldContainer = connect(mapStateToProps, mapDispatchToProps)(Field);
