import React, { Component } from 'react';
import { updateRecordInAirtable } from '../helpers'

class UpdateAddressPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provided: {
                address: null,
                city: null,
                state: null,
                zip: null,
            },
            addressChanged: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
        this.updateRecordInAirtable = updateRecordInAirtable.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            provided: {
                ...this.state.provided,
                [e.target.name]: value
            }
        });
    };

    updateRecord() {
        this.props.handler(this.state);
        this.updateRecordInAirtable(this.props.record.id, this.state.provided);
        this.props.history.push('/thank_you');
    }

    handleSubmit(e) {
        this.setState({
            addressChanged: true
        }, this.updateRecord)
    }

    render() {
        return (
            <div>
                Please enter your current address:
                <br /><br />
                <input type="text" placeholder="Street Address" onChange={this.handleChange} name="address" /><br />
                <input type="text" placeholder="City" onChange={this.handleChange} name="city" /><br />
                <input type="text" placeholder="State" onChange={this.handleChange} name="state" /><br />
                <input type="text" placeholder="Zip" onChange={this.handleChange} name="zip" /><br />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    };
};

export default UpdateAddressPage;