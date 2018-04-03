module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdAt: {
    	field: 'created_at',
    	type: DataTypes.DATE
    },
    updatedAt: {
    	field: 'updated_at',
    	type: DataTypes.DATE,
    }
  });
  Board.associate = function(models) {
    Board.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'user_id'
    });
    Board.hasMany(models.Task, { foreignKey: 'board_id' });
    Board.hasMany(models.Column, { foreignKey: 'board_id' });
  };
  return Board;
};