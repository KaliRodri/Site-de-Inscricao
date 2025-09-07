const express = require("express");
const cors = require("cors");
const eventosRoutes = require("./routes/eventosRoutes");
const inscricoesRoutes = require("./routes/inscricoesRoutes"); 
const usuariosRoutes = require("./routes/usuariosRoutes")
const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use(eventosRoutes);
app.use(inscricoesRoutes);
app.use(usuariosRoutes);

module.exports = app;
