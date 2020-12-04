import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';

import HomePage from './Pages/HomePage';
import EmailProvidedPage from'./Pages/EmailProvidedPage';

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
                 <EmailProvidedPage handler={this.handler} providedEmail={this.state.providedEmail} {...props} />
               )} />
      </Switch>
    )
  }
};

export default Main
