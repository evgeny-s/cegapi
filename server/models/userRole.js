module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {});

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {as: 'user', foreignKey: 'userId'});
    UserRole.belongsTo(models.Role, {as: 'role', foreignKey: 'roleId'});
  };

  return UserRole;
};
