const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 8082;

const pool = new Pool({
  user: 'user',
  host: 'database', // Usamos o nome do serviço do Docker Compose
  database: 'userdb',
  password: 'password',
  port: 5432,
});

app.get('/user-details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

app.listen(port, () => {
  console.log(`Serviço Business rodando na porta ${port}`);
});