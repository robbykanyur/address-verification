import React, { Component } from 'react';

class ThankYouPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    let message = this.props.recordChangeType;

    return (
      <div>
        Thanks for {message} your address!
      </div>
    );
  };
};

export default ThankYouPage;