const express = require('express');
const app = express();

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('Falta la variable de entorno API_KEY');
  process.exit(1);
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Insegura funcionando');
});


app.get('/secure-data', (req, res) => {
  const key = req.headers['x-api-key'];
  if (key !== API_KEY) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  res.json({ secret: '12345' });
});

module.exports = app;

