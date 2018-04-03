'use strict';
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Board.associate = function(models) {
    Board.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
    });
    Board.hasMany(models.Task);
    Board.hasMany(models.Column);
  };
  return Board;
};