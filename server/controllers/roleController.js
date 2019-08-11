const {
  internalError,
  getHttpCode,
  errorResponseWithDetails,
} = require('./../utils/responseHelper');

const roleService = require('../services/roleService');

class RoleController {
  /**
   * @api {get} /api/roles Get list of the roles
   * @apiName Roles
   * @apiGroup Roles
   *
   * @apiSuccess {String} code 'success'.
   *
   * @apiError (Error 400) {String} code 'error'.
   * @apiError (Error 400) {String} details Details object with error.
   *
   * @apiError (Error 500) {String} code 'error'.
   * @apiError (Error 500) {String} message Error message.
   */
  async get(req, res, next) {
    try {
      const result = await roleService.getAll();

      res.status(getHttpCode(result.code)).json(result);
    } catch (err) {
      res.status(500).send(internalError());
      next(err);
    }
  }

  /**
   * @api {post} /api/roles Add new Role.
   * @apiName Roles
   * @apiGroup Roles
   *
   * @apiSuccess {String} code 'success'.
   *
   * @apiError (Error 400) {String} code 'error'.
   * @apiError (Error 400) {String} details Details object with validation errors.
   *
   * @apiError (Error 500) {String} code 'error'.
   * @apiError (Error 500) {String} message Error message.
   */
  async create(req, res, next) {
    ['type', 'description']
      .forEach((param) => {
        req
          .checkBody(param, 'should_not_be_empty')
          .notEmpty();
      });

    const errors = req.validationErrors();

    if (errors) {
      res.status(400).send(errorResponseWithDetails(errors));
    } else {
      try {
        const {type, description} = req.body;

        const result = await roleService.create({
          type,
          description,
        });

        res.status(getHttpCode(result.code)).json(result);
      } catch (err) {
        res.status(500).json(internalError());
        next(err);
      }
    }
  }

  /**
   * @api {put} /api/roles/:id Updates Role by id
   * @apiName Roles
   * @apiGroup Roles
   *
   * @apiSuccess {String} code 'success'.
   *
   * @apiError (Error 400) {String} code 'error'.
   * @apiError (Error 400) {String} details Details object with validation errors.
   *
   * @apiError (Error 500) {String} code 'error'.
   * @apiError (Error 500) {String} message Error message.
   */
  async update(req, res, next) {
    ['type', 'description']
      .forEach((param) => {
        req
          .checkBody(param, 'should_not_be_empty')
          .notEmpty();
      });

    const errors = req.validationErrors();

    if (errors) {
      res.status(400).send(errorResponseWithDetails(errors));
    } else {
      try {
        const {type, description} = req.body;

        const result = await roleService.update(
          req.params.id,
          {
            type,
            description,
          },
        );

        res.status(getHttpCode(result.code)).json(result);
      } catch (err) {
        res.status(500).send(internalError());
        next(err);
      }
    }
  }

  /**
   * @api {delete} /api/roles/:id Removes Role by id.
   * @apiName Roles
   * @apiGroup Roles
   *
   * @apiSuccess {String} code 'success'.
   *
   * @apiError (Error 400) {String} code 'error'.
   * @apiError (Error 400) {String} details Details object with validation errors.
   *
   * @apiError (Error 500) {String} code 'error'.
   * @apiError (Error 500) {String} message Error message.
   */
  async delete(req, res, next) {
    try {
      const result = await roleService.deleteById(req.params.id);

      res.status(getHttpCode(result.code)).json(result);
    } catch (err) {
      res.status(500).send(internalError());
      next(err);
    }
  }
}

module.exports = new RoleController();
