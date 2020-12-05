import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';

import HomePage from './Pages/HomePage';
import EmailProvidedPage from'./Pages/EmailProvidedPage';
import EmailNotProvidedPage from './Pages/EmailNotProvidedPage';
import EmailNotFoundPage from './Pages/EmailNotFoundPage';
import ConfirmAddressPage from './Pages/ConfirmAddressPage';
import UpdateAddressPage from './Pages/UpdateAddressPage'
import ThankYouPage from './Pages/ThankYouPage';

class Main extends Component {
  constructor() {
    super()

    this.state = {
      providedEmail: null,
      record: null,
    };

    this.handler = this.handler.bind(this);
  };

  handler = (value) => {
    this.setState(value);
  }

  getEmailFromWindow() {
    this.setState({
      providedEmail: queryString.parse(window.location.search).email
    }, this.getRecordFromAirtable);
  };

  async getRecordFromAirtable() {
    if(this.state.providedEmail) {
      const data = await fetch('http://localhost:5000/find', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'Application/JSON' },
          body: JSON.stringify({email: this.state.providedEmail})
        }
      ).then(res => res.json());
      console.log(data);
      this.setState({ record: data });
    }
  };

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
                 <UpdateAddressPage {...this.state} {...props}  />
               )} />
      </Switch>
    )
  }
};

export default Main
