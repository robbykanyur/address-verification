import React, { Component } from 'react';

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
            recordChangeType: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
        this.nextPage = this.nextPage.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        this.updateRecord();
    }

    async nextPage(data) {
        if(data.id) {
            this.setState({
                recordChangeType: 'updating'
            });
        }
        await this.props.handler(this.state);
        await this.props.history.push('/thank_you');
    }

    async updateRecord() {
        const data = await fetch('http://localhost:5000/update_address', {
            method: 'POST',
            headers: {'Content-Type': 'Application/JSON'},
            body: JSON.stringify({
                id: this.props.record.id,
                fields: this.state.provided
            })
        }).then(res => res.json());

        await this.nextPage(data);
    }

    render() {
        return (
            <div>
                Please enter your current address:
                <br /><br />
                <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Street Address" onChange={this.handleChange} name="address" /><br />
                <input type="text" placeholder="City" onChange={this.handleChange} name="city" /><br />
                <input type="text" placeholder="State" onChange={this.handleChange} name="state" /><br />
                <input type="text" placeholder="Zip" onChange={this.handleChange} name="zip" /><br />
                <input type="submit" value="Submit" />
                </form>
            </div>
        );
    };
};

export default UpdateAddressPage;