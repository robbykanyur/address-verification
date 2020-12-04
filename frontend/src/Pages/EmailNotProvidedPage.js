import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

class EmailNotProvidedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSuppliedEmail: ""
        };
        this.onInputChange = this.onInputChange.bind(this);
    };

    onInputChange(event) {
        this.setState({
            userSuppliedEmail: event.target.value
        });
    };

    render() {
        function submitAndNavigate() {
            const history = useHistory();
            this.props.handler(this.state);
            history.push('/thank_you');
        };

        return(
            <div>
                <p>Please enter your email address:</p>
                <input type="text" onChange={this.onInputChange} />
                <button onClick={submitAndNavigate}>Submit</button>
            </div>
        )
    };
}

export default EmailNotProvidedPage;