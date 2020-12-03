import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Pages/HomePage';

class Main extends Component {
  constructor() {
    super()

    this.state = {
      providedEmail: null
    };

    this.handler = this.handler.bind(this);
  };

  handler = (value) => {
    this.setState(value)
  }

  render() {
    console.log(this.state.providedEmail);

    return (
      <Switch>
        <Route path="/" 
               render={(props) => (
                 <HomePage handler={this.handler} {...props} />
               )} />
      </Switch>
    )
  }
};

export default Main
