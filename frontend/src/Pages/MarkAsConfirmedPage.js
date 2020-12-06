import React, { Component } from 'react';

class MarkAsConfirmedPage extends Component {
    constructor(props) {
        super(props)
    };

    async markConfirmedInAirtable() {
        await fetch ('http://localhost:5000/update',
        {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify({
                id: this.props.record.id,
                fields: {
                    Confirmed: true
                }
            })
        }).then(res => res.json());
    };

    handleResponse(res) {
        const data = res;
        console.log(data);
        this.props.history.push('/thank_you');
    }

    componentDidMount() {
        this.markConfirmedInAirtable().then(res => this.handleResponse(res));
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default MarkAsConfirmedPage;