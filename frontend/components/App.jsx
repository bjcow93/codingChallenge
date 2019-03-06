import React from 'react';
import { Route } from 'react-router-dom';
import SplashPageContainer from './home/splash_page_container';
import CustomerPage from './customers/customer_container';

const App = () => (
  <div>
    <Route exact path="/" component={SplashPageContainer} />
    <Route path="/customers/:customerId" component={CustomerPage} />
  </div>
);

export default App;