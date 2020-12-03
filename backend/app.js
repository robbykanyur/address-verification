const express = require('express');
const Airtable = require('airtable');

const app = express();
const port = 5000;

require('dotenv').config();

const connect_to_airtable = () => {
  const base = require('airtable').base('appy0AvTNsgCfdL7U');
  return base;
};

const fetch_record_by_email = (email) => {
  return new Promise((resolve, reject) => {
    base('Addresses').select({filterByFormula: `{Borr Email} = "${email}"`})
    .firstPage(function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(r){
        resolve(r.fields);
      });
    });
  });
};

const base = connect_to_airtable();

app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let record = await fetch_record_by_email(req.query['email']);
  console.log(record);
  res.json({'status':200});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
