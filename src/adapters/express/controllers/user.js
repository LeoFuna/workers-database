const UserUseCase = require('../../../application/usecases/UserUseCase');
const LocalUserRepository = require('../../../domain/repositories/LocalUserRepository');
const LocalUserAccessRepository = require('../../../domain/repositories/LocalUserAcessRepository');

class UserController {
  async getUser(req, res, next) {
    const name = req.params.name;
    try {
      const userFound = await new UserUseCase(
        new LocalUserRepository(),
        new LocalUserAccessRepository()
      ).getUser(name);
      res.status(200).json(userFound);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(_req, res, next) {
    try {
      const users = await new UserUseCase(
        new LocalUserRepository(),
        new LocalUserAccessRepository()
      ).getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, job } = req.body;
      const userCreated = await new UserUseCase(
        new LocalUserRepository(),
        new LocalUserAccessRepository()
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
        new LocalUserRepository(),
        new LocalUserAccessRepository()
      ).deleteUser(name);

      res.status(200).send(deleteResponse);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const userData = req.body;

      const updateResponse = await new UserUseCase(
        new LocalUserRepository(),
        new LocalUserAccessRepository()
      ).updateUser(parseInt(id), userData);

      res.status(200).send(updateResponse);
    } catch (err) {
      next(err);
    }
  }

  async countUserAccess(req, res, next) {
    try {
      const name = req.params.name;

      const messageCounted = await new UserUseCase(
        new LocalUserRepository(),
        new LocalUserAccessRepository()
      ).countUserAccess(name);

      res.status(200).send(messageCounted);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
