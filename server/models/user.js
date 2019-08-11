module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {});

  User.associate = (models) => {
    User.hasMany(models.UserRole, {as: 'roles', foreignKey: 'userId'});
  };

  return User;
};
