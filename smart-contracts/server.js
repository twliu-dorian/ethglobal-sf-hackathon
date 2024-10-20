const express = require('express');
const cors = require('cors');
var deploy = require('./scripts/blockchain/deploy');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/info', (req, res) => {
    deploy.main()
  });

app.post('/api/process', (req, res) => {
  const result = exampleFunction(req.body.data);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});