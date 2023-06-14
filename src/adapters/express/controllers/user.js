const UserUseCase = require('../../../application/usecases/UserUseCase');
const LocalUserRepository = require('../../../domain/repositories/LocalUserRepository');

class UserController {
  async getUser(req, res, next) {
    const name = req.params.name;
    try {
      const userFound = await new UserUseCase(
        new LocalUserRepository()
      ).getUser(name);
      res.status(200).json(userFound);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(_req, res, next) {
    try {
      const users = await new UserUseCase(new LocalUserRepository()).getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, job } = req.body;
      const userCreated = await new UserUseCase(
        new LocalUserRepository()
      ).createUser({ name, job });

      res.status(201).json(userCreated);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const name = req.params.name;
      const deleteResponse = await new UserUseCase(
        new LocalUserRepository()
      ).deleteUser(name);

      res.status(200).send(deleteResponse);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
