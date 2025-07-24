const express = require('express');
const axios = require('axios');

const app = express();
const port = 8081;

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`http://business:8082/user-details/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.response?.data || 'Erro interno no Serviço A');
  }
});

app.listen(port, () => {
  console.log(`Serviço Frontend rodando na porta ${port}`);
});