import * as APIUtil from '../util/customer_api_util';

export const RECEIVE_CUSTOMER = 'RECEIVE_CUSTOMER';


export const receiveCustomer = payload => ({
  type: RECEIVE_CUSTOMER,
  payload,
});

export const fetchCustomer = (id) => (dispatch) => {
  return APIUtil.fetchCustomer(id).then(customer => {
    dispatch(receiveCustomer(customer));
  });
};