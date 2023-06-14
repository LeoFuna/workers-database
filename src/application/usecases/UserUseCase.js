const { InvalidData } = require('../../infra/utils/exceptions');
const User = require('./../../domain/models/User');

class UserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async _checkIfUserAlreadyExists(name) {
    try {
      const userFound = await this.userRepository.getUser(name);
      if (userFound) {
        throw new InvalidData('Cant create this user, name already exists!');
      }
    } catch (err) {
      if (err.statusCode === 404) return;
      throw new Error();
    }
  }

  async _generateNewUserId() {
    const users = await this.userRepository.getUsers();
    const newUserId = users[users.length - 1].id + 1;
    return newUserId;
  }

  async createUser({ name, job }) {
    const HAS_VALID_DATA = name && job && !!job.length && !!name.length;
    if (!HAS_VALID_DATA) {
      throw new InvalidData('Job and Name are required!');
    }

    await this._checkIfUserAlreadyExists(name);

    const user = new User({
      id: await this._generateNewUserId(),
      name,
      job,
    });
    const createdUser = await this.userRepository.createUser(user);

    return createdUser;
  }

  async getUser(name) {
    if (!name.length) throw new InvalidData('Name is required');
    const userFound = await this.userRepository.getUser(name);
    return userFound;
  }

  async getUsers() {
    const users = await this.userRepository.getUsers();
    return users;
  }

  async updateUser(userId, userData) {
    // Lógica para atualizar um usuário usando o repositório
  }

  async deleteUser(name) {
    const HAS_VALID_DATA = name && !!name.length;
    if (!HAS_VALID_DATA) {
      throw new InvalidData('Name is required!');
    }
    const deleteResponse = await this.userRepository.deleteUser(name);

    return deleteResponse;
  }
}

module.exports = UserUseCase;
