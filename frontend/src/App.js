import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import EmailNotProvidedPage from './Pages/EmailNotProvidedPage';
import EmailNotFoundPage from './Pages/EmailNotFoundPage';
import ConfirmAddressPage from './Pages/ConfirmAddressPage';
import UpdateAddressPage from './Pages/UpdateAddressPage'
import ThankYouPage from './Pages/ThankYouPage';
import RecordLookupPage from './Pages/RecordLookupPage';

class Main extends Component {
  constructor() {
    super()

    this.state = {
      providedEmail: null,
      record: null,
      recordChangeType: null,
    };
  };

  handler = (value) => {
    this.setState(value);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" 
              render={(props) => (
                <HomePage handler={this.handler} {...this.state} {...props} />
              )} />
        <Route path="/email_not_provided"
              render={(props) => (
                <EmailNotProvidedPage handler={this.handler} {...this.state} {...props} />
              )} />
        <Route path="/record_lookup" 
                render={(props) => (
                  <RecordLookupPage handler={this.handler} {...this.state} {...props} />
                )} />
        <Route path="/email_not_found"
              render={(props) => (
                <EmailNotFoundPage handler={this.handler} {...this.state} {...props} />
              )} />
        <Route path="/thank_you"
              render={(props) => (
                <ThankYouPage {...this.state} {...props}  />
              )} />
        <Route path="/confirm_address"
              render={(props) => (
                <ConfirmAddressPage handler={this.handler} {...this.state} {...props}  />
              )} />
        <Route path="/update_address"
              render={(props) => (
                <UpdateAddressPage handler={this.handler} {...this.state} {...props}  />
              )} />
      </Switch>
    );
  };
};

export default Main
