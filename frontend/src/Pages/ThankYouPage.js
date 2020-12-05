import React, { Component } from 'react';

class ThankYouPage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    let message;
    if(this.props.addressChanged) {
      message = "updating";
    } else {
      message = "confirming";
    }

    return (
      <div>
        Thanks for {message} your address!
      </div>
    );
  };
};

export default ThankYouPage;