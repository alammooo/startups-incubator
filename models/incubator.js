'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incubator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Incubator.hasMany(models.Startup)
    }

    static levelList = ["International", "National", "Province"]

  }
  Incubator.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    location: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        const date = new Date()
        const time = date.getTime()
        instance.code = ""
        if (instance.level === "International") instance.code = `1992-A-${time}`
        if (instance.level === "National") instance.code = `1994-B-${time}`
        if (instance.level === "Province") instance.code = `1996-C-${time}`

      }
    },
    sequelize,
    modelName: 'Incubator',
  });
  return Incubator;
};