const {
  internalError,
  getHttpCode,
} = require('./../utils/responseHelper');

const weatherService = require('./../services/weatherService');


class WeatherController {
  /**
   * @api {get} /api/weather/current Get current weather
   * @apiName Weather
   * @apiGroup Weather
   *
   * @apiSuccess {String} code 'success'.
   *
   * @apiError (Error 400) {String} code 'error'.
   * @apiError (Error 400) {String} details Details object with error.
   *
   * @apiError (Error 500) {String} code 'error'.
   * @apiError (Error 500) {String} message Error message.
   */
  async current(req, res, next) {
    try {
      const result = await weatherService.current();

      res.status(getHttpCode(result.code)).json(result);
    } catch (err) {
      res.status(500).send(internalError());
      next(err);
    }
  }
}

module.exports = new WeatherController();
