import React, { Component } from 'react';

class RecordLookupPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: null
        }
    };

    async nextPage() {
        this.props.handler(this.state);

        if(this.state.record.fields) {
            this.props.history.push('/confirm_address');
        } else {
            this.props.history.push('/email_not_found')
        };
    };

    async request() {
        const data = await fetch('http://localhost:5000/record_lookup',
        {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify({email: this.props.providedEmail})
        }).then(res => {
            if(res.status == 400) {
                return { record: null }
            } else {
                return res.json();
            }
        });
        
        return data;
    }
    
    async componentDidMount() {
        await this.request().then(res => this.setState({record: res}));
        await this.nextPage();
    }

    render() {
        return (
            <div></div>
        );
    };
};

export default RecordLookupPage;