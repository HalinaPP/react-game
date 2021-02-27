import { connect } from 'react-redux';
import { StateModel } from '@/reducers/index';

import Field from '@components/Field';


const mapStateToProps = (state: StateModel) => {
  return {
    fieldBlockColorOn: state.fieldBlockColorOn,
    difficultLevel:  state.difficultLevel,
  };
};


export const FieldContainer = connect(mapStateToProps)(Field);
