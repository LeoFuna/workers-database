const User = require('../../domain/models/User');
const AbstractUserAccessRepository = require('../../domain/repositories/AbstractUserAccessRepository');
const AbstractUserRepository = require('../../domain/repositories/AbstractUserRepository');
const UserUseCase = require('./UserUseCase');

jest.mock('../../domain/repositories/AbstractUserRepository');
jest.mock('../../domain/repositories/AbstractUserAccessRepository');

describe('Tests UserUseCase class', () => {
  describe('getUser method when', () => {
    const mockedUser = new User({
      id: 1,
      name: 'MockedName',
      job: 'MockedJob',
    });
    let userRepositoryInstance;
    let userAccessRepositoryInstance;

    beforeEach(() => {
      userRepositoryInstance = new AbstractUserRepository();
      userAccessRepositoryInstance = new AbstractUserAccessRepository();
      userRepositoryInstance.getUser.mockReturnValue(mockedUser);
      userAccessRepositoryInstance.createNewAccess.mockReturnValue('Created');
    });

    it('has user with valid data', async () => {
      const userFound = await new UserUseCase(
        userRepositoryInstance,
        userAccessRepositoryInstance
      ).getUser(mockedUser.name, 'name');

      expect(userFound).toEqual(mockedUser);
    });
    it('has valid data but no user', async () => {
      userRepositoryInstance.getUser.mockReturnValue(null);

      await expect(
        new UserUseCase(
          userRepositoryInstance,
          userAccessRepositoryInstance
        ).getUser('MockedName', 'name')
      ).rejects.toThrow('Not Found Error');
    });
    it('has invalid name', async () => {
      await expect(
        new UserUseCase(
          userRepositoryInstance,
          userAccessRepositoryInstance
        ).getUser('', 'name')
      ).rejects.toThrow('Unique Key is required');
    });
  });
});
