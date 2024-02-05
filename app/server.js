const express = require('express');
const app = express();

const port = 3001;

app.get('/', (req, res) => {
  res.send("Hello World")
});

// Starten Sie den Server
app.listen(port, () => {
  console.log(`Der Server läuft auf http://localhost:${port}`);
});