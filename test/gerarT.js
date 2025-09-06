const jwt = require('jsonwebtoken');
require('dotenv').config();

// Gera um token para um usuário com ID 1, válido por 1 dia
const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
  expiresIn: '1d'
});
console.log(token);