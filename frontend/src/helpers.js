export async function getRecordFromAirtable(providedEmail) {
    const data = await fetch('http://localhost:5000/find', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify({email: providedEmail})
    }).then((res) => {
        if(res.status === 204) {
            return {record: null}
        } else {
            return res.json();
        }
    });
    return data;
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
                Zip: fields.zip,
                Confirmed: true,
                Modified: true
            }
        })
    }).then(res => res.json());
}
