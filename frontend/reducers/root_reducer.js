import { combineReducers } from 'redux';

import data from './customers_reducer';
// import users from './users_reducer';
// import subscriptions from './subscriptions_reducer';
// import subscriptionplans from './subscription_plans_reducer';

const rootReducer = combineReducers({
  data,
  // users,
  // subscriptions,
  // subscriptionplans,
});

export default rootReducer;