const { InvalidData, NotFound } = require('../../infra/utils/exceptions');
const User = require('./../../domain/models/User');

class UserUseCase {
  constructor(userRepository, userAccessRepository) {
    this.userRepository = userRepository;
    this.userAccessRepository = userAccessRepository;
  }
  // O _ é uma maneira de informar que o método seria privado, ou seja, somente para ser usado dentro da class UserUseCase
  async _checkIfUserAlreadyExists(name) {
    const userFound = await this.userRepository.getUser(name, 'name');
    if (userFound) {
      throw new InvalidData('Cant create this user, name already exists!');
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

  async getUser(uniqueKey, getBy = 'name') {
    if (typeof uniqueKey === 'string' && !uniqueKey.length) {
      throw new InvalidData('Unique Key is required');
    }
    const userFound = await this.userRepository.getUser(uniqueKey, getBy);
    if (!userFound) throw new NotFound();

    await this._createNewAccess([userFound]);

    return userFound;
  }

  async getUsers() {
    const users = await this.userRepository.getUsers();

    await this._createNewAccess(users);

    return users;
  }

  async updateUser(userId, userData) {
    if (!userData?.name.length || !userData?.job.length) {
      throw new InvalidData('Name and Job are required!');
    }

    await this.userRepository.getUser(userId, 'id');

    const userFound = await this.userRepository.getUser(userData.name, 'name');
    if (userFound) throw new InvalidData('Name has to be unique!');

    const updatedUser = await this.userRepository.updateUser(userId, userData);

    return updatedUser;
  }

  async deleteUser(name) {
    const HAS_VALID_DATA = name && !!name.length;
    if (!HAS_VALID_DATA) {
      throw new InvalidData('Name is required!');
    }
    const deleteResponse = await this.userRepository.deleteUser(name);
    if (!deleteResponse) throw new NotFound();

    return deleteResponse;
  }

  async countUserAccess(name) {
    await this.userRepository.getUser(name, 'name');
    const messageCounted = await this.userAccessRepository.countUserAccess(
      name
    );

    return messageCounted;
  }

  async _createNewAccess(users) {
    if (!users.length) throw new InvalidData('No user to handle acccess!');

    const invalidUser = users.find((user) => !user?.name || !user?.name.length);
    if (invalidUser) {
      throw new InvalidData('Name is required on all users to be registered!');
    }

    const accessPromises = users.map(async (user) =>
      this.userAccessRepository.createNewAccess(user.name)
    );

    await Promise.all(accessPromises);
  }
}

module.exports = UserUseCase;
