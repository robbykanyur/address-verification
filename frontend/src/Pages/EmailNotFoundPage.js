import React, { Component } from 'react';
import { createRecordInAirtable } from '../helpers'

class EmailNotFoundPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provided: {
                firstName: null,
                lastName: null,
                email: null,
                address: null,
                city: null,
                state: null,
                zip: null
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createRecord = this.updateRecord.bind(this);
        this.createRecordInAirtable = createRecordInAirtable.bind(this);
    };

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

    handleSubmit(e) {
        this.createRecord();
    }

    createRecord() {
        this.props.handler(this.state);
        this.createRecordInAirtable(this.state.provided);
        this.props.history.push('/thank_you');
    };

    render() {
        return (
            <div>
                Please enter your contact information:
                <br /><br />
                <input type="text" placeholder="First Name" name="firstName" onChange={this.handleChange} /><br />
                <input type="text" placeholder="Last Name" name="lastName" onChange={this.handleChange} /><br />
                <input type="email" placeholder="Email Address" name="email" onchange={this.handleChange} /><br />
                <input type="text" placeholder="Street Address" onChange={this.handleChange} name="address" /><br />
                <input type="text" placeholder="City" onChange={this.handleChange} name="city" /><br />
                <input type="text" placeholder="State" onChange={this.handleChange} name="state" /><br />
                <input type="text" placeholder="Zip" onChange={this.handleChange} name="zip" /><br />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    };
};

export default EmailNotFoundPage;