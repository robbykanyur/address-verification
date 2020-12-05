import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import EmailProvidedPage from'./Pages/EmailProvidedPage';
import EmailNotProvidedPage from './Pages/EmailNotProvidedPage';
import EmailNotFoundPage from './Pages/EmailNotFoundPage';
import ConfirmAddressPage from './Pages/ConfirmAddressPage';
import UpdateAddressPage from './Pages/UpdateAddressPage'
import ThankYouPage from './Pages/ThankYouPage';

import { getEmailFromWindow } from './helpers.js'

class Main extends Component {
  constructor() {
    super()

    this.state = {
      providedEmail: null,
      record: null,
      addressChanged: false
    };

    this.handler = this.handler.bind(this);
    this.getEmailFromWindow = getEmailFromWindow;
  };

  handler = (value) => {
    this.setState(value);
  }

  componentDidMount() {
    this.getEmailFromWindow();
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" 
               render={(props) => (
                 <HomePage {...this.state} {...props} />
               )} />
        <Route path="/email_provided"
               render={(props) => (
                 <EmailProvidedPage {...this.state} {...props} />
               )} />
        <Route path="/email_not_provided"
               render={(props) => (
                 <EmailNotProvidedPage handler={this.handler} {...this.state} {...props} />
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
                 <ConfirmAddressPage {...this.state} {...props}  />
               )} />
        <Route path="/update_address"
               render={(props) => (
                 <UpdateAddressPage handler={this.handler} {...this.state} {...props}  />
               )} />
      </Switch>
    )
  }
};

export default Main
