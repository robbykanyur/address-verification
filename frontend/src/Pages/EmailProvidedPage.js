import React, { Component } from 'react';

class EmailProvidedPage extends Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div>Email: {this.props.providedEmail}</div>
        );
    };
};

export default EmailProvidedPage;