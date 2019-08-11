const {serviceResponses} = require('../consts/serviceResponses');

const {User} = require('../models');


class UserService {
  async getAll() {
    return serviceResponses.SUCCESS(await User.findAll({
      attributes:
        [
          'id',
          'username',
          'firstName',
          'lastName',
          'createdAt',
          'updatedAt',
        ],
      order: [['createdAt', 'DESC']],
    }));
  }

  async create(user) {
    const newUser = new User();

    newUser.username = user.username;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;

    await newUser.save();

    return serviceResponses.SUCCESS(newUser);
  }

  async update(userId, {username, firstName, lastName}) {
    const dbUser = await this.findById(userId);

    if (!dbUser) {
      return serviceResponses.USER_NOT_FOUND();
    }

    dbUser.username = username;
    dbUser.firstName = firstName;
    dbUser.lastName = lastName;

    dbUser.save();

    return serviceResponses.SUCCESS(dbUser);
  }

  findById(id) {
    return User
      .findOne({
        where: {
          id,
        },
      });
  }

  async deleteById(id) {
    await User.destroy({
      where: {
        id,
      },
    });

    return serviceResponses.SUCCESS();
  }
}

module.exports = new UserService();
