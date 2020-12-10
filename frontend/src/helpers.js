export async function createRecordInAirtable(fields) {
    const data = await fetch('http://localhost:5000/create',
    {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify({
            fields: {
                "First Name": fields.firstName,
                "Last Name": fields.lastName,
                Email: fields.email,
                Address: fields.address,
                City: fields.city,
                State: fields.state,
                Zip: fields.zip,
            }
        })
    }).then(res => res.json());
}
