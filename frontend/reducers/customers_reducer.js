import merge from 'lodash/merge';
import { RECEIVE_CUSTOMER } from '../actions/customer_actions';

const customersReducer = (state = {}, action) => {
  Object.freeze(state);

  let data;

  switch (action.type) {
    case RECEIVE_CUSTOMER:
    data = action.payload;
      return data;
    default:
      return state;
  }
};

export default customersReducer;