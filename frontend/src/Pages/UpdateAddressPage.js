import React, { Component } from 'react';

class UpdateAddressPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            providedAddress: null,
            providedCity: null,
            providedState: null,
            providedZip: null,
            addressChanged: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setParentState = this.setParentState.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    };

    setParentState() {
        console.log(this.state);
        this.props.handler(this.state);
        this.props.history.push('/thank_you');
    }

    handleSubmit(e) {
        this.setState({
            addressChanged: true
        }, this.setParentState)
    }

    render() {
        return (
            <div>
                Please enter your current address:
                <br /><br />
                <input type="text" placeholder="Street Address" onChange={this.handleChange} name="providedAddress" /><br />
                <input type="text" placeholder="City" onChange={this.handleChange} name="providedCity" /><br />
                <input type="text" placeholder="State" onChange={this.handleChange} name="providedState" /><br />
                <input type="text" placeholder="Zip" onChange={this.handleChange} name="providedZip" /><br />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    };
};

export default UpdateAddressPage;