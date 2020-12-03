import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
      </Switch>
    </div>
  </Router>, document.getElementById('root')
);
