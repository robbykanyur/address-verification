import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                <br /><br />
                <Link to="/mark_as_confirmed">Yes</Link><br />
                <Link to="/update_address">No</Link>
            </div>
        );
    };
};

export default ConfirmAddressPage;