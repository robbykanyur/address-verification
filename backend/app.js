const express = require('express');
const Airtable = require('airtable');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());
const port = 5000;

app.use(express.json());
require('dotenv').config();

const connect_to_airtable = () => {
  const base = Airtable.base('appy0AvTNsgCfdL7U');
  return base;
};

const fetch_record_by_email = (email) => {
  return new Promise((resolve, reject) => {
    base('Addresses').select({filterByFormula: `{Email} = "${email}"`})
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

const update_record_by_id = (id_, fields) => {
  return new Promise((resolve, reject) => {
    base('Addresses').update([
      {
        "id": id_,
        "fields": fields
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        resolve(record);
      });
    });
  });
};

const base = connect_to_airtable();

app.post('/find', async(req, res) => {
  let data = await fetch_record_by_email(req.body['email']);
  let record = {
    "id": data.id,
    "fields": data.fields
  };
  console.log("Returning record with id " + data.id);
  res.status(200).json(record);
});

app.post('/update', async(req, res) => {
  let data = await update_record_by_id(req.body['id'], req.body['fields']);
  let record = {
    "id": data.id,
    "fields": data.fields
  };
  res.status(200).json(record);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
