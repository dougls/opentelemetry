const express = require('express');

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Olá, mundo do OpenTelemetry!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});