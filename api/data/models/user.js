module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING,
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING,
    },
    createdAt: {
    	field: 'created_at',
    	type: DataTypes.DATE,
    },
    updatedAt: {
    	field: 'updated_at',
    	type: DataTypes.DATE,
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Board, { foreignKey: 'user_id' });
	  User.hasMany(models.Column, { foreignKey: 'user_id' });
    User.hasMany(models.Task, { foreignKey: 'user_id' });
	};
  return User;
};