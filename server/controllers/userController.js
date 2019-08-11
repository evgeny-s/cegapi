const {
  internalError,
  getHttpCode,
  errorResponseWithDetails,
} = require('./../utils/responseHelper');

const userService = require('../services/userService');
const userRoleService = require('../services/userRoleService');

class UserController {
  /**
   * @api {get} /api/users Get list of the users
   * @apiName Users
   * @apiGroup Users
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
      const result = await userService.getAll();

      res.status(getHttpCode(result.code)).json(result);
    } catch (err) {
      res.status(500).send(internalError());
      next(err);
    }
  }

  /**
   * @api {post} /api/users Add new User.
   * @apiName Users
   * @apiGroup Users
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
    ['username', 'firstName', 'lastName']
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
        const {username, firstName, lastName} = req.body;

        const result = await userService.create({
          username,
          firstName,
          lastName,
        });

        res.status(getHttpCode(result.code)).json(result);
      } catch (err) {
        res.status(500).json(internalError());
        next(err);
      }
    }
  }

  /**
   * @api {put} /api/users/:id Updates User by id
   * @apiName Users
   * @apiGroup Users
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
    ['username', 'firstName', 'lastName']
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
        const {username, firstName, lastName} = req.body;

        const result = await userService.update(
          req.params.id,
          {
            username,
            firstName,
            lastName,
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
   * @api {delete} /api/users/:id Removes User by id.
   * @apiName Users
   * @apiGroup Users
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
      const result = await userService.deleteById(req.params.id);

      res.status(getHttpCode(result.code)).json(result);
    } catch (err) {
      res.status(500).send(internalError());
      next(err);
    }
  }

  /**
   * @api {post} /api/users/:id/assignRole/:roleId Assign User to the specific Role
   * @apiName Users
   * @apiGroup Users
   *
   * @apiSuccess {String} code 'success'.
   *
   * @apiError (Error 400) {String} code 'error'.
   * @apiError (Error 400) {String} details Details object with validation errors.
   *
   * @apiError (Error 500) {String} code 'error'.
   * @apiError (Error 500) {String} message Error message.
   */
  async assign(req, res, next) {
    try {
      const {id, roleId} = req.params;

      const result = await userRoleService.assignRole(id, roleId);

      res.status(getHttpCode(result.code)).json(result);
    } catch (err) {
      res.status(500).json(internalError());
      next(err);
    }
  }
}

module.exports = new UserController();
