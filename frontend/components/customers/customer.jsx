import React from 'react';

class CustomerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      activated_on: '',
      deactivated_on: '',
      month: '2019-01-01'
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.billFor = this.billFor.bind(this);
  }

  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.customerId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.users) return;
    if (prevProps.users.length != this.props.users.length) {
      this.props.fetchCustomer(this.props.match.params.customerId);
    }
    // window.scrollTo(0, 0);
  }

  handleDelete(e) {
    const user_id = e.currentTarget.id;
    const customer_id = this.props.customer.id;

    this.props.deleteUser(user_id).then(
      () => {
        this.props.fetchCustomer(customer_id);
      }
    );
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    const { name, activated_on, deactivated_on } = user;
    const formData = new FormData();
    formData.append('user[name]', name);
    formData.append('user[activated_on]', activated_on);
    formData.append('user[deactivated_on]', deactivated_on);
    formData.append('user[customer_id', this.props.customer.id);

    this.props.createUser(formData).then(
      () => {
        this.props.fetchCustomer(this.props.customer.id);
      }
    );
  }

  billFor(month, activeSubscription, users) {
    function firstDayOfMonth(date) {
      return new Date(date.getFullYear(), date.getMonth(), 1)
    }

    function lastDayOfMonth(date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    }

    function nextDay(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    }

    month = month += "-02"
    // debugger
    var oneDay = 24 * 60 * 60 * 1000;
    var firstDate = firstDayOfMonth(new Date(month));
    var lastDate = lastDayOfMonth(new Date(month));
    var numDaysInMonth = (lastDate - firstDate) / oneDay + 1
    var dailyRate = activeSubscription.monthly_price_in_dollars / numDaysInMonth;
    // debugger
    var totalBill = 0;

    var date = firstDate;
    while (date <= lastDate) {
      users.forEach(user => {
        // debugger
        if (new Date(user.activated_on) <= date && (user.deactivated_on == null || new Date(user.deactivated_on) > date)) {
          totalBill += dailyRate;
        }
      });
      date = nextDay(date);
    }

    return Number(totalBill.toFixed(2));
  }

  render() {
    if (!this.props.customer) return <div></div>;
    const { name, activated_on, deactivated_on } = this.state;
    const {customer, users, subscription, sub_plan, month} = this.props;

    return (<div>
      <h1>Subscription Plan: {sub_plan.name}</h1>
      <h1>Users for {this.props.customer.name}</h1>
      {this.props.users.map((user, i) => (
        <section key={i} className="user-section">
          <div className="users">
            <h2>{user.name}</h2>
          </div>
          <div className="users">
            <h3>Activated on: </h3>
            <p>{user.activated_on}</p>
          </div>
          <div className="users">
            <h3>Deactivated on: </h3>
            <p>{user.deactivated_on || 'Still Active'}</p>
          </div>
          <button id={user.id} onClick={this.handleDelete}>Delete User</button>
          <br/>
          <br/>
        </section>
      ))}
      <h1>TOTAL BILL = ${this.billFor(month, sub_plan, users)}</h1>

        <section>
        <h2>Add more users (this may change total Bill, depending on new users' dates):</h2>
       <form className="new-user-form" onSubmit={this.handleSubmit}>
        <div>
          <h3>Name: </h3>
            <input
              type="text"
              value={name}
              onChange={this.update('name')}
              placeholder="Choose a name"
            />
          </div>
        <div>
          <h3>Activated on: </h3>
          <input 
            type="date"
            value={activated_on}
            onChange={this.update('activated_on')}
            />
        </div>
        <div>
          <h3>Deactivated on: </h3>
          <input
            type="date"
            value={deactivated_on}
            onChange={this.update('deactivated_on')}
          />
        </div>
        <input
          type="submit"
          value="Create New User"
          // className="create-submit-button"
        />
       </form>
        </section>
      {/* <button className="backing-button" onClick={this.incrementCount}>Add another user</button> */}
    </div>)
  }
}

export default CustomerPage;