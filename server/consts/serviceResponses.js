const {
  SUCCESS,
  USER_NOT_FOUND,
  ITEM_NOT_FOUND,
  ROLE_EXISTS,
} = require('./responseCodes');

const serviceResponses = {
  SUCCESS: data => ({
    code: SUCCESS,
    data,
  }),

  USER_NOT_FOUND: message => ({
    code: USER_NOT_FOUND,
    message: message || 'user_not_exists',
  }),

  ITEM_NOT_FOUND: message => ({
    code: ITEM_NOT_FOUND,
    message: message || 'item_not_exists',
  }),

  ROLE_EXISTS: message => ({
    code: ROLE_EXISTS,
    message: message || 'role_exists',
  }),
};

module.exports = {
  serviceResponses,
};
