const { NotImplemented } = require('../../infra/utils/exceptions');

const defaultNotImplementedMessage =
  'Cant use that class directly, please extends that class';

class AbstractUserRepository {
  async createUser(userData) {
    throw new NotImplemented(defaultNotImplementedMessage);
  }

  async getUser(userId) {
    throw new NotImplemented(defaultNotImplementedMessage);
  }

  async updateUser(userId, userData) {
    throw new NotImplemented(defaultNotImplementedMessage);
  }

  async deleteUser(userId) {
    throw new NotImplemented(defaultNotImplementedMessage);
  }
}

module.exports = AbstractUserRepository;
