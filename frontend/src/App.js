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
import './styles.css';

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
        <div id="nav">
          <div id="nav-wrapper">
            <div id="logo">
              <img src="/fairway-logo.png" width="100%" alt="" />
            </div>
            <div id="contact">
              <div id="profile">
                <img src="/profile-keilen-rj.png" width="100%" alt="" />
              </div>
              <div id="text">
                <strong>RJ Keilen</strong><br />
                SVP / Area Manager<br />
                NMLS #204420<br />
                Cell: 480-703-3131
              </div>
            </div>
          </div>
        </div>

        <div id="errors">
          {this.state.errors && this.state.errors.map((error, index) => {
            <p key={index}>{error.msg}</p>
          })}
        </div>

        <div id="container">
          <div id="wrapper">
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
        </div>
        <div id="footer">
          <div id="disclaimer">
          Fairway Independent Mortgage Corporation | NMLS Entity ID #2289 | 4750 S. Biltmore Lane | Madison, WI 53718
          </div>
          <div id="eho">
            <img src="/eho-logo.png" width="100%" alt="" />
          </div>
        </div>
      </div>
    );
  };
};

export default Main
