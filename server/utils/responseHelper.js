const {
  ERROR,
  SUCCESS,
  USER_NOT_FOUND,
} = require('./../consts/responseCodes');

const errorResponseWithDetails = errors => ({code: ERROR, details: errors});
const errorResponseWithMessage = message => ({code: ERROR, message});
const successResponse = data => ({code: SUCCESS, data});
const internalError = () => (errorResponseWithMessage('internal_server_error'));

const getHttpCode = (responseCode) => {
  switch (responseCode) {
    case SUCCESS:
      return 200;

    case USER_NOT_FOUND:
      return 404;

    default:
      return 400;
  }
};

module.exports = {
  internalError,
  getHttpCode,
  errorResponseWithDetails,
  successResponse,
};
