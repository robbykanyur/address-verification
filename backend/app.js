const express = require('express');
const Airtable = require('airtable');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

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

app.post('/record_lookup', [
    check('email').isEmail()
], async(req, res) => {
  let data = await fetch_record_by_email(req.body['email']);
  const errors = validationResult(req);
  console.log(errors);
  
  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array() });
  } else {
    if(data.id) {
      let record = {
        "id": data.id,
        "fields": data.fields
      };
      res.status(200).json(record);
    } else {
      res.status(400).json({error: 'Record not found'})
    }
  }
});

app.post('/confirm_address', async(req, res) => {
  let data = await update_record_by_id(req.body['id'], {Confirmed: true});

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

app.post('/update_address', async(req, res) => {
  let fields = req.body['fields']

  let submission = {
      "Address": fields.address,
      "City": fields.city,
      "State": fields.state,
      "Zip": fields.zip
  };

  let data = await update_record_by_id(req.body['id'], submission);

  if(data.id) {
    let record = {
      "id": data.id,
      "fields": data.fields
    };
    res.status(200).json(record);
  } else {
    res.status(400).json({ error: 'Record not found'});
  }
  
});

app.post('/create_record', async(req, res) => {
  let fields = req.body['fields'];
  let submission = {
    "First Name": fields.firstName,
    "Last Name": fields.lastName,
    Email: fields.email,
    Address: fields.address,
    City: fields.city,
    State: fields.state,
    Zip: fields.zip,
  };

  let data = await create_record(submission);

  if(data.id) {
    let record = {
      "id": data.id,
      "fields": data.fields,
    };
    res.status(200).json(record);
  } else {
    res.status(400).json({ error: 'Record could not be created' });
  };
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
