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
}

module.exports = UserController;
