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
        resolve(r);
      });
    });
  });
};

const update_record_by_id = (id_) => {
  return new Promise((resolve, reject) => {
    base('Addresses').update([
      {
        "id": id_,
        "fields": {
          "Borrower First Name": "Robby"
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        resolve(record.get('Borrower First Name'));
      });
    });
  });
};

const base = connect_to_airtable();

app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // let record = await fetch_record_by_email(req.query['email']);
  let record = await update_record_by_id("recpDZtipWMCL8YW9");
  console.log(record);
  res.json({'status':200});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
