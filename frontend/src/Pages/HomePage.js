import React, { Component } from 'react';
import queryString from 'query-string';

class HomePage extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    let providedEmail = queryString.parse(this.props.location.search).email;
    this.props.handler({providedEmail: providedEmail})
  };

  render() {
    return (
      <div>
        howdy
      </div>
    );
  };
};

export default HomePage;