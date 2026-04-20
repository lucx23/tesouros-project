'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    foto: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    data_falecimento: DataTypes.DATE,
    dia_liturgico: DataTypes.STRING,
    biografia: DataTypes.TEXT,
  }, 
  {
    sequelize,
    modelName: 'Posts',
    tableName: 'Posts',
    freezeTableName: true,
  });
  return Posts;
};