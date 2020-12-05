import queryString from 'query-string';

export async function getRecordFromAirtable() {
    if(this.state.providedEmail) {
        const data = await fetch('http://localhost:5000/find', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify({email: this.state.providedEmail})
        }
        ).then(res => res.json());
        this.setState({ record: data });
    }
};

export function getEmailFromWindow() {
    this.setState({
        providedEmail: queryString.parse(window.location.search).email
    }, getRecordFromAirtable);
};
