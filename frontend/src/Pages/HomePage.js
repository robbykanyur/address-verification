import React, { Component } from 'react';
import queryString from 'query-string';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providedEmail: null
    }
  };

  componentDidMount() {
    let providedEmail = queryString.parse(window.location.search).email;
      if(providedEmail) {
      this.setState({
        providedEmail: providedEmail
      }, this.updateParentState);
      } else {
        this.nextPage();
      }
  }

  updateParentState() {
    this.props.handler(this.state);
    this.nextPage();
  }

  nextPage() {
    if(this.state.providedEmail) {
      this.props.history.push('/email_provided')
    } else {
      this.props.history.push('/email_not_provided')
    }
  }

  render() {
    return (
      <div></div>
    );
  };
};

export default HomePage;