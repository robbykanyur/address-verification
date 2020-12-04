import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';

import HomePage from './Pages/HomePage';
import EmailProvidedPage from'./Pages/EmailProvidedPage';
import EmailNotProvidedPage from './Pages/EmailNotProvidedPage';
import ThankYouPage from './Pages/ThankYouPage';

class Main extends Component {
  constructor() {
    super()

    this.state = {
      emailWasProvided: false,
      providedEmail: null
    };

    this.handler = this.handler.bind(this);
  };

  handler = (value) => {
    this.setState(value);
  }

  componentDidMount() {
    this.setState({
      providedEmail: queryString.parse(window.location.search).email
    });
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
                 <EmailNotProvidedPage {...this.state} {...props} />
               )} />
        <Route path="/thank_you"
               render={(props) => (
                 <ThankYouPage {...this.state} {...props}  />
               )} />
      </Switch>
    )
  }
};

export default Main
