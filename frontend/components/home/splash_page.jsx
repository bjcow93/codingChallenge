import React from 'react';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push(`/customers/1`)
  }

  render() {
    // debugger
    return (
    <div className="splash-page">
    <h1>Coding Challenge Demo</h1>
    <button className="customer-button" onClick={this.handleClick}>Go to customer's page</button>
    </div>)
  }
}

export default SplashPage;