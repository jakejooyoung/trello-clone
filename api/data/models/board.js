'use strict';
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdAt: {
    	field: 'create_at',
    	type: DataTypes.DATE,
    	defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
    	field: 'updated_at',
    	type: DataTypes.DATE,
    	defaultValue: sequelize.literal('NOW()'),
    }
  },{
  	timestamps:true
  });
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