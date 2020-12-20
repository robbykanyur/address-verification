import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import EmailNotProvidedPage from './Pages/EmailNotProvidedPage';
import EmailNotFoundPage from './Pages/EmailNotFoundPage';
import ConfirmAddressPage from './Pages/ConfirmAddressPage';
import UpdateAddressPage from './Pages/UpdateAddressPage'
import ThankYouPage from './Pages/ThankYouPage';
import RecordLookupPage from './Pages/RecordLookupPage';

import '../node_modules/uikit/dist/css/uikit.min.css';
import '../node_modules/uikit/dist/js/uikit.min.js';

class Main extends Component {
  constructor() {
    super()

    this.state = {
      providedEmail: null,
      record: null,
      recordChangeType: null,
      errors: null
    };
  };

  handler = (value) => {
    this.setState(value);
  }

  render() {
    return (
      <div>
        <div id="errors" style={{color: 'red'}}>
          {this.state.errors && this.state.errors.map((error, index) => {
            <p key={index}>{error.msg}</p>
          })}
        </div>

        <h1 className="uk-heading-large">Address Verification</h1>

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
      </div>
    );
  };
};

export default Main
