import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { getRecordFromAirtable } from '../helpers.js'

class EmailNotProvidedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            providedEmail: "",
            record: null
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.getRecordFromAirtable = getRecordFromAirtable;
    };

    onInputChange(event) {
        this.setState({
            providedEmail: event.target.value
        });
    };

    submitAndNavigate = () => {
        this.getRecordFromAirtable();
        this.props.handler(this.state);
        if(this.state.record) {
            this.props.history.push('/confirm_address')
        }
    };

    render() {
        return(
            <div>
                <p>Please enter your email address:</p>
                <input type="text" onChange={this.onInputChange} />
                <button onClick={this.submitAndNavigate}>Submit</button>
            </div>
        )
    };
}

export default withRouter(EmailNotProvidedPage);