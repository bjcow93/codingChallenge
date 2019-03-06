import * as APIUtil from '../util/user_api_util';

// export const RECEIVE_USER = 'RECEIVE_USER';

// export const receiveUser = payload => ({
//   type: RECEIVE_USER,
//   payload,
// });

export const createUser = (user) => {
  return APIUtil.createUser(user);
};

export const deleteUser = (id) => {
  return APIUtil.deleteUser(id);
};
