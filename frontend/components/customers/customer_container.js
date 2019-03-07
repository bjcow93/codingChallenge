import { connect } from 'react-redux';
import CustomerPage from './customer';
import { fetchCustomer } from '../../actions/customer_actions';
import { deleteUser, createUser } from '../../actions/user_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    customer: state.data.customer,
    users: state.data.users,
    subscription: state.data.subscription,
    sub_plan: state.data.sub_plan,
    month: state.data.month
  };
};

const mapDispatchToProps = ownProps => dispatch => {
  return {
  fetchCustomer: (id, month) => dispatch(fetchCustomer(id, month)),
  deleteUser: id => deleteUser(id),
  createUser: user => createUser(user)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerPage);