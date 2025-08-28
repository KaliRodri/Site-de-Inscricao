'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    static associate(models) {
      // Um Evento pode ter muitas Inscrições.
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
      autoIncrement: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Evento',
    tableName: 'eventos',
    timestamps: false 
  });
  return Evento;
};