import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConfirmAddressPage extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    async markConfirmed() {
        await fetch('http://localhost:5000/confirm_address',
        {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify({
                id: this.props.record.id
            })
        }).then(res => res.json());
    }

    async handleClick(e) {
        e.preventDefault();
        let option = e.currentTarget.dataset.option;

        if(option == 'yes') {
            await this.markConfirmed();
        } else {
            console.log('NO');
        }
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
                <Link to="#" data-option="yes" onClick={this.handleClick}>Yes</Link><br />
                <Link to="#" data-option="no" onClick={this.handleClick}>No</Link>
            </div>
        );
    };
};

export default ConfirmAddressPage;