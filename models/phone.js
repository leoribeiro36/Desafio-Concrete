'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    number: DataTypes.STRING,
    ddd: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  return Phone;
};