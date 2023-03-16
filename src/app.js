const express = require('express');

const app = express();

app.use(express.json());
app.get('/', (_, res) => {
  res.send('Express test');
});

module.exports = { app };
