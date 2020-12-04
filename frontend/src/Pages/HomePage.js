import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    let emailWasProvided = "false";
    if(this.props.providedEmail) {
      emailWasProvided = "true";
    }

    return (
      <div>
        Email: {this.props.providedEmail}<br />
        Email was provided: {emailWasProvided}<br />
        <Link to="/email_provided">Page: email was provided</Link><br />
        <Link to="/email_not_provided">Page: email was not provided</Link><br />
      </div>
    );
  };
};

export default HomePage;