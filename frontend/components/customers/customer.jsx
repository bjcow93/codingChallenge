import React from 'react';

class CustomerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      activated_on: '',
      deactivated_on: '',
      month: '',
      bill: 0
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.billFor = this.billFor.bind(this);
    this.handleMonth = this.handleMonth.bind(this);
  }


  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.customerId).then(
      () => {
        this.setState({
          bill: this.billFor(this.props.month, this.props.sub_plan, this.props.users)
        });
      }
    );
  }

  componentDidUpdate(newProps) {
    if (this.props.users != newProps.users) {
      this.setState({
        bill: this.billFor(this.props.month, this.props.sub_plan, this.props.users)
      });
    }
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
        this.props.fetchCustomer(this.props.customer.id, this.state.month);
      }
    );
  }

  handleMonth() {
    let month = this.state.month;
    let customer_id = this.props.customer.id;
    this.props.fetchCustomer(customer_id, month);
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
    var oneDay = 86400000;
    var firstDate = firstDayOfMonth(new Date(month));
    var lastDate = lastDayOfMonth(new Date(month));
    var numDaysInMonth = Math.floor((lastDate - firstDate) / oneDay) + 1;
    var dailyRate = activeSubscription.monthly_price_in_dollars ? activeSubscription.monthly_price_in_dollars / numDaysInMonth : 0;
    var totalBill = 0;
    var date = firstDate;
    while (date <= lastDate) {
      users.forEach(user => {
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
    const { name, activated_on, deactivated_on, month } = this.state;
    const {customer, users, subscription, sub_plan} = this.props;
    // debugger
    return (<div>
      <h1>Subscription Plan: {sub_plan.name} {subscription ? `(${subscription.started_on})` : '(no subscriptions)'}</h1>
      <h1>Active users for {this.props.customer.name} during {month ? month : '2019-01'}</h1>
      <form onSubmit={this.handleMonth}>
        <div>Change month: </div>
        <input
          type="text"
          value={month}
          onChange={this.update('month')}
          placeholder="ex: 2019-02"

        />
        <input
          type="submit"
          value="Change month:"
          className="create-button"
        />
      </form>
      <h1>TOTAL BILL = ${this.state.bill}</h1>

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
          <button className="delete-button" id={user.id} onClick={this.handleDelete}>Delete User</button>
          <br/>
          <br/>
        </section>
      ))}
      {/* <h1>TOTAL BILL = ${this.state.bill}</h1> */}

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
          className="create-button"
        />
       </form>
        </section>
    </div>)
  }
}

export default CustomerPage;