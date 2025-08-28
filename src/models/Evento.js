const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Usuario = require("./usuario");

const Evento = sequelize.define("Evento", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  link_slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  closing_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("ativo", "encerrado", "rascunho"),
    defaultValue: "rascunho"
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "eventos",
  timestamps: false
});


Evento.belongsTo(Usuario, { foreignKey: "created_by" });

module.exports = Evento;
