const { fakeData } = require('../../infra/database/LocalDB');
const AbstractUserRepository = require('./AbstractUserRepository');
// Apesar de nao ser async, estou simulando uma interaçao real com um BD

class LocalUserRepository extends AbstractUserRepository {
  async createUser(user) {
    fakeData.push(user);
    return user;
  }

  async getUser(uniqueKey, getBy = 'name') {
    const userFound = fakeData.find((user) => uniqueKey === user[getBy]);

    return userFound;
  }

  async getUsers() {
    const users = fakeData;

    return users;
  }

  async updateUser(id, userData) {
    const index = fakeData.findIndex((user) => user.id === id);

    fakeData[index] = userData;

    return userData;
  }

  async deleteUser(name) {
    const index = fakeData.findIndex((user) => user.name === name);
    const USER_WAS_FOUND = index !== -1;
    if (!USER_WAS_FOUND) return;

    fakeData.splice(index, 1);

    return 'Success';
  }
}

module.exports = LocalUserRepository;
