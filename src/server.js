require('dotenv').config()

const express = require('express')
const app = express();
const db = require('./models');
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use(express.json())

app.get('/', (req, res) => {
    res.send(`Servidor rodando na porta ${process.env.PORT}`)
});

app.use('/usuarios', usuariosRoutes );

app.listen(process.env.PORT, async () => {
  console.log ("Servidor Iniciado")
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});