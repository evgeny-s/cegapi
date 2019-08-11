const userService = require('./userService');
const roleService = require('./roleService');

const {serviceResponses} = require('../consts/serviceResponses');

const {UserRole} = require('../models');

class UserRoleService {
  async assignRole(userId, roleId) {
    const role = await roleService.findById(roleId);

    if (!role) {
      return serviceResponses.ITEM_NOT_FOUND('role_not_found');
    }

    const user = await userService.findById(userId);

    if (!user) {
      return serviceResponses.USER_NOT_FOUND();
    }

    const userRole = await this.findByUserAndRole(userId, roleId);

    if (userRole !== null) {
      return serviceResponses.ROLE_EXISTS();
    }

    const newUserRole = new UserRole();
    newUserRole.userId = userId;
    newUserRole.roleId = roleId;

    return newUserRole.save();
  }

  findByUserAndRole(userId, roleId) {
    return UserRole
      .findOne({
        where: {
          userId,
          roleId,
        },
      });
  }
}

module.exports = new UserRoleService();
