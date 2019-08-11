module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserRoles', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {model: 'Users', key: 'id'},
    },
    roleId: {
      type: Sequelize.INTEGER,
      references: {model: 'Roles', key: 'id'},
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('UserRoles'),
};
