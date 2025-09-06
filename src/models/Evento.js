
//adaptei o codigo para o formato correto de modelo do sequelize do  jeito que use index.js

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    static associate(models) {
      this.hasMany(models.Inscricao, {
        foreignKey: 'evento_id',
        as: 'inscricoes'
      });
    }
  }
Evento.init({
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
  }}, {
    sequelize,
    modelName: "Evento",
    tableName: "eventos",
    timestamps: true
  });
  return Evento;
};