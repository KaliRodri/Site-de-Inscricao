require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./models');

// Importando as rotas
const inscricoesRoutes = require('./routes/inscricoesRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const testesInscricaoRoutes = require('../test/testesInscricaoRoutes');

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send(`Servidor rodando na porta ${process.env.PORT}`);
});

// Registrando as rotas
app.use('/inscricoes', inscricoesRoutes);
app.use('/eventos', testesInscricaoRoutes);
app.use('/usuarios', usuariosRoutes);

// Inicializando o servidor e conectando ao banco
app.listen(process.env.PORT, async () => {
  console.log("Servidor Iniciado");
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});