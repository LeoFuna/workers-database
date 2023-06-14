const localData = require('../../infra/database/LocalDBUserRepository');
const { NotFound } = require('../../infra/utils/exceptions');
const AbstractUserRepository = require('./AbstractUserRepository');
// Apesar de nao ser async, estou simulando uma interaçao real com um BD

class LocalUserRepository extends AbstractUserRepository {
  async createUser(user) {
    localData.push(user);
    return user;
  }

  async getUser(name) {
    const userFound = localData.find((user) => name === user.name);
    if (!userFound) throw new NotFound();
    return userFound;
  }

  async getUsers() {
    const users = localData;

    return users;
  }

  async updateUser(userId, userData) {
    // Lógica para atualizar um usuário no banco de dados
  }

  async deleteUser(userId) {
    // Lógica para excluir um usuário do banco de dados
  }
}

module.exports = LocalUserRepository;
