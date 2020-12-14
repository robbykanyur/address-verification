import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';

class RecordLookupPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: null,
            errors: null,
        }
    };

    async nextPage(status) {
        console.log(status);

        this.props.handler(this.state);

        if(this.state.record.fields) {
            this.props.history.push('/confirm_address');
        } else {
            this.props.history.push('/email_not_found')
        };
    };

    async request() {
        const data = await trackPromise (fetch('http://localhost:5000/record_lookup',
        {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify({email: this.props.providedEmail})
        }).then(res => {
            return res.json();
        }));
        
        return data;
    }

    handleErrors() {
        this.props.handler(this.state);
    }
    
    async componentDidMount() {
        await this.request().then(res => {
            if(res.errors) {
                this.setState({
                    errors: res.errors
                }, () => this.handleErrors());
            }
        });
    }

    render() {
        return (
            <div></div>
        );
    };
};

export default RecordLookupPage;