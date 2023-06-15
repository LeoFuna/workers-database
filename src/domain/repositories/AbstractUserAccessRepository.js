const { NotImplemented } = require('../../infra/utils/exceptions');

const defaultNotImplementedMessage =
  'Cant use that class directly, please extends that class';

class AbstractUserAccessRepository {
  async createNewAccess(_name) {
    throw new NotImplemented(defaultNotImplementedMessage);
  }

  async countUserAccess(_name) {
    throw new NotImplemented(defaultNotImplementedMessage);
  }
}

module.exports = AbstractUserAccessRepository;
