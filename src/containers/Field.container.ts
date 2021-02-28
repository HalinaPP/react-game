import { connect } from 'react-redux';
import { StateModel } from '@/reducers/index';

import Field from '@components/Field';

const mapStateToProps = (state: StateModel) => {
  return {
    fieldBlockColorOn: state.fieldBlockColorOn,
    initialMatrix: state.initialMatrix,
  };
};

export const FieldContainer = connect(mapStateToProps)(Field);
