import { connect } from 'react-redux';
import CustomerPage from './customer';
import { fetchCustomer } from '../../actions/customer_actions';
import { deleteUser, createUser } from '../../actions/user_actions';
// import * as APIUtil from '../util/user_api_util';


const mapStateToProps = (state, ownProps) => {
  // debugger
  // let customer = state.data[ownProps.match.params.customerId];
  // let customer = state.data.customer;
  return {
    customer: state.data.customer,
    users: state.data.users,
    subscription: state.data.subscriptions,
    sub_plan: state.data.sub_plan,
    month: state.data.month
  };
};

const mapDispatchToProps = ownProps => dispatch => {
  // const promise = new Promise((resolve) => { this.props.closeModal(); resolve(); });
  return {
  fetchCustomer: id => dispatch(fetchCustomer(id)),
  deleteUser: id => deleteUser(id),
  createUser: user => createUser(user)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerPage);