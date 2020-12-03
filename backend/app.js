const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    "text": "howdy"
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
