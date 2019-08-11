require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  use_env_variable: 'DATABASE_URL',
};
