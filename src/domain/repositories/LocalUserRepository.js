const localData = require('../../infra/database/LocalDBUserRepository');
const { NotFound } = require('../../infra/utils/exceptions');
const AbstractUserRepository = require('./AbstractUserRepository');
// Apesar de nao ser async, estou simulando uma interaçao real com um BD

class LocalUserRepository extends AbstractUserRepository {
  async createUser(user) {
    localData.push(user);
    return user;
  }

  async getUser(uniqueKey, getBy = 'name') {
    const userFound = localData.find((user) => uniqueKey === user[getBy]);

    return userFound;
  }

  async getUsers() {
    const users = localData;

    return users;
  }

  async updateUser(id, userData) {
    const index = localData.findIndex((user) => user.id === id);

    localData[index] = userData;

    return userData;
  }

  async deleteUser(name) {
    const index = localData.findIndex((user) => user.name === name);
    const USER_WAS_FOUND = index !== -1;
    if (!USER_WAS_FOUND) {
      throw new NotFound();
    }
    localData.splice(index, 1);
    return 'Success';
  }
}

module.exports = LocalUserRepository;
