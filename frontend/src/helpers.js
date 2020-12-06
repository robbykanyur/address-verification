export async function getRecordFromAirtable() {
    if(this.state.providedEmail) {
        const data = await fetch('http://localhost:5000/find', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify({email: this.state.providedEmail})
        }).then(res => res.json());
        this.setState({ record: data });
    }
};

export async function updateRecordInAirtable(id_, fields) {
    const data = await fetch('http://localhost:5000/update',
    {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify({
            id: id_,
            fields: {
                Address: fields.address,
                City: fields.city,
                State: fields.state,
                Zip: fields.zip
            }
        })
    }).then(res => res.json());
}
