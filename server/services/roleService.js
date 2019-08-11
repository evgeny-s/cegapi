const {serviceResponses} = require('../consts/serviceResponses');

const {Role} = require('../models');

class RoleService {
  async getAll() {
    return serviceResponses.SUCCESS(await Role.findAll({
      attributes:
        [
          'id',
          'type',
          'description',
          'createdAt',
          'updatedAt',
        ],
      order: [['createdAt', 'DESC']],
    }));
  }

  async create({type, description}) {
    const newRole = new Role();

    newRole.type = type;
    newRole.description = description;

    await newRole.save();

    return serviceResponses.SUCCESS(newRole);
  }

  async update(roleId, {type, description}) {
    const dbRole = await this.findById(roleId);

    if (!dbRole) {
      return serviceResponses.ITEM_NOT_FOUND();
    }

    dbRole.type = type;
    dbRole.description = description;

    dbRole.save();

    return serviceResponses.SUCCESS(dbRole);
  }

  findById(id) {
    return Role
      .findOne({
        where: {
          id,
        },
      });
  }

  async deleteById(id) {
    await Role.destroy({
      where: {
        id,
      },
    });

    return serviceResponses.SUCCESS();
  }
}

module.exports = new RoleService();
