module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      unique: true,
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {type: Sequelize.STRING},
    lastName: {type: Sequelize.STRING},

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
