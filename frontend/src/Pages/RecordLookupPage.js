import React, { Component } from 'react';

import { getRecordFromAirtable } from '../helpers.js'

class RecordLookupPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            record: null
        }

        this.getRecordFromAirtable = getRecordFromAirtable.bind(this);
    };

    async getRecord() {
        return this.getRecordFromAirtable(this.props.providedEmail);
    };

    nextPage() {
        this.props.handler(this.state);
        this.props.history.push('/confirm_address');
    }
    
    componentDidMount() {
        this.getRecord().then(res => this.setState({record: res.record}, this.nextPage));
    }

    render() {
        return (
            <div></div>
        );
    };
};

export default RecordLookupPage;