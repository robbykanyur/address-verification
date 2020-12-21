import React, { Component } from 'react';

class EmailNotProvidedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            providedEmail: "",
            record: null
        };

        this.onInputChange = this.onInputChange.bind(this);
    };

    onInputChange(event) {
        this.setState({
            providedEmail: event.target.value
        });
    };

    submitAndNavigate = (e) => {
        e.preventDefault();
        this.props.handler(this.state);
        this.props.history.push('/record_lookup')
    };

    render() {
        return(
            <div>
                <p className="uk-text-large">Please enter your email address:</p>
                <form onSubmit={this.submitAndNavigate}>
                    <input className="uk-input" type="text" onChange={this.onInputChange} /><br /><br />
                    <input className="uk-button uk-button-primary uk-button-large" type="submit" value="Submit" />
                </form>
            </div>
        )
    };
}

export default EmailNotProvidedPage;