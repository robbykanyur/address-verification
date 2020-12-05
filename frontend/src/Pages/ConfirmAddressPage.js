import React, { Component } from 'react';

class ConfirmAddressPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Is this address correct?
                <br /><br />
                {this.props.record.fields.Address}<br />
                {this.props.record.fields.City},&nbsp;
                {this.props.record.fields.State}&nbsp;
                {this.props.record.fields.Zip}
            </div>
        );
    };
};

export default ConfirmAddressPage;