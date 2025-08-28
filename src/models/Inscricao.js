'use strict';
const { Model } = require('sequelize');

// A estrutura correta é exportar uma função como esta:
module.exports = (sequelize, DataTypes) => {
  class Inscricao extends Model {
    static associate(models) {
      // Define a associação: uma inscrição pertence a um evento
      this.belongsTo(models.Evento, {
        foreignKey: 'evento_id',
        as: 'evento'
      });
    }
  }
  Inscricao.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    curso: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendente'
    }
  }, {
    sequelize,
    modelName: 'Inscricao',
    tableName: 'inscricoes',
    indexes: [{
      unique: true,
      fields: ['evento_id', 'email']
    }]
  });
  return Inscricao;
};