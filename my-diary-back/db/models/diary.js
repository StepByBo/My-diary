'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Diary.init({
    time: DataTypes.STRING,
    context: DataTypes.TEXT,
    classId: DataTypes.INTEGER,
    privacy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Diary',
    timestamps:false
  });
  return Diary;
};