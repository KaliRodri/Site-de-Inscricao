require('dotenv').config();

// Exporta as configurações para os diferentes ambientes (desenvolvimento, produção, etc.)
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, // No Docker, será 'db'. Localmente, 'localhost'.
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "site_inscricao",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  production: {
  }
};