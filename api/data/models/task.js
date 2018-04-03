'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
    },
    boardId: {
      field: 'board_id',
      type: DataTypes.INTEGER,
    },
    columnId: {
      field: 'column_id',
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    completedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.Column, {
      onDelete: 'CASCADE',
      foreignKey: 'column_id',
    });
    Task.belongsTo(models.Board, {
    	onDelete: 'CASCADE',
      foreignKey: 'board_id',
    });
    Task.belongsTo(models.User, {
    	onDelete: 'CASCADE',
      foreignKey: 'user_id',
    });
  };
  return Task;
};