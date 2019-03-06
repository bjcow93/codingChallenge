import merge from 'lodash/merge';
import { RECEIVE_CUSTOMER } from '../actions/customer_actions';

const customersReducer = (state = {}, action) => {
  Object.freeze(state);

  let customer;

  switch (action.type) {
    case RECEIVE_CUSTOMER:
    // debugger
      customer = action.payload;
      // return merge({}, state, { [customer.id]: customer });
      return action.payload;
    default:
      return state;
  }
};

export default customersReducer;