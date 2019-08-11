const logger = require('../logger');

function logError(error) {
  let errText;

  try {
    errText = error.stack || JSON.stringify(error);
  } catch (e) {
    errText = error.toString();
  }

  logger.error(error);

  // eslint-disable-next-line no-console
  console.log(errText);
  // TODO: Configure Sentry or Bugsnag and post errors there
}

process.on('unhandledRejection', error => logError(error));

module.exports = () => (err, req, res, next) => {
  if (err) {
    logError(err);
  }

  next();
};
