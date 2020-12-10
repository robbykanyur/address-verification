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

const base = connect_to_airtable();

const fetch_record_by_email = (email) => {
  return new Promise((resolve, reject) => {
    base('Addresses').select({filterByFormula: `{Email} = "${email}"`})
    .firstPage(function(err, records) {
      if (err) {
        return;
      }
      if(records.length > 0) {
        records.forEach(function(r){
          resolve(r);
        });
      } else {
        resolve({})
      }
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
        resolve({});
      }
      if(records) {
        records.forEach(function(r) {
          resolve(r);
        });
      } else {
        resolve({});
      };
    });
  });
};

const create_record = (fields) => {
  raw_fields = fields;
  fields['Loan Officer'] = process.env.LOAN_OFFICER;

  return new Promise((resolve, reject) => {
    base('Submissions').create([
      { "fields": fields }
    ], function(err, records) {
      if (err) {
        resolve({});
      }
      if (records) {
        records.forEach(function(r) {
          resolve(r)
        })
      } else {
        resolve({});
      };
    })
  });
}

app.post('/create', async(req, res) => {
  let data = await create_record(req.body['fields']);
  if (data.id) {
    let record = {
      "id": data.id,
      "fields": data.fields
    };
    res.status(200).json(record);
  } else {
    res.status(204).json({error: 'Record could not be created'});
  };
});

app.post('/record_lookup', async(req, res) => {
  let data = await fetch_record_by_email(req.body['email']);

  if(data.id) {
    let record = {
      "id": data.id,
      "fields": data.fields
    };
    res.status(200).json(record);
  } else {
    res.status(400).json({error: 'Record not found'})
  }
});

app.post('/confirm_address', async(req, res) => {
  let data = await update_record_by_id(req.body['id'], {Confirmed: true});

  console.log(data.id);
  if(data) {
    let record = {
      "id": data.id,
      "fields": data.fields
    };
    res.status(200).json(record);
    } else {
      res.status(400).json({ error: 'Record not found' });
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
