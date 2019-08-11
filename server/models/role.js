module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    type: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
  }, {});

  return Role;
};
