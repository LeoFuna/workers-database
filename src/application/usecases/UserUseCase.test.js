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
    let userUseCaseInstance;
    beforeEach(() => {
      userRepositoryInstance = new AbstractUserRepository();
      userAccessRepositoryInstance = new AbstractUserAccessRepository();
      userUseCaseInstance = new UserUseCase(
        userRepositoryInstance,
        userAccessRepositoryInstance
      );
      userRepositoryInstance.getUser.mockReturnValue(mockedUser);
      userAccessRepositoryInstance.createNewAccess.mockReturnValue('Created');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('has user with valid data', async () => {
      const userFound = await userUseCaseInstance.getUser(
        mockedUser.name,
        'name'
      );

      expect(userFound).toEqual(mockedUser);
    });
    it('has valid data but no user', async () => {
      userRepositoryInstance.getUser.mockReturnValue(null);

      await expect(
        userUseCaseInstance.getUser('MockedName', 'name')
      ).rejects.toThrow('Not Found Error');
    });
    it('has invalid name', async () => {
      await expect(userUseCaseInstance.getUser('', 'name')).rejects.toThrow(
        'Unique Key is required'
      );
    });
  });

  describe('createUser method when', () => {
    const mockedUser = new User({
      id: 1,
      name: 'MockedName',
      job: 'MockedJob',
    });
    let userRepositoryInstance;
    let userAccessRepositoryInstance;
    let userUseCaseInstance;

    beforeEach(() => {
      userRepositoryInstance = new AbstractUserRepository();
      userAccessRepositoryInstance = new AbstractUserAccessRepository();
      userUseCaseInstance = new UserUseCase(
        userRepositoryInstance,
        userAccessRepositoryInstance
      );
      userRepositoryInstance.createUser.mockImplementation((user) => user);
      jest
        .spyOn(userUseCaseInstance, '_checkIfUserAlreadyExists')
        .mockReturnValue(undefined);
      jest.spyOn(userUseCaseInstance, '_generateNewUserId').mockReturnValue(1);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('has valid data, create a User', async () => {
      const createdUser = await userUseCaseInstance.createUser({
        name: 'MockedName',
        job: 'MockedJob',
      });

      expect(createdUser).toEqual(mockedUser);
    });
    it('has no name, throws error', async () => {
      await expect(
        userUseCaseInstance.createUser({ job: 'MockedJob' })
      ).rejects.toThrow('Job and Name are required!');
    });
    it('has valid data but name already exists, throws error', async () => {
      jest
        .spyOn(userUseCaseInstance, '_checkIfUserAlreadyExists')
        .mockImplementation(() => {
          throw new Error('Cant create this user, name already exists!');
        });

      await expect(
        userUseCaseInstance.createUser({
          name: 'MockedName',
          job: 'MockedJob',
        })
      ).rejects.toThrow('Cant create this user, name already exists!');
    });
  });

  describe('_checkIfUserAlreadyExists method when', () => {
    let userRepositoryInstance;
    let userAccessRepositoryInstance;
    let userUseCaseInstance;
    beforeEach(() => {
      userRepositoryInstance = new AbstractUserRepository();
      userAccessRepositoryInstance = new AbstractUserAccessRepository();
      userUseCaseInstance = new UserUseCase(
        userRepositoryInstance,
        userAccessRepositoryInstance
      );
      userRepositoryInstance.getUser.mockReturnValue(null);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('has valid unique name, resolves', async () => {
      const uniqueUserName = 'John Doe';

      await expect(
        userUseCaseInstance._checkIfUserAlreadyExists(uniqueUserName)
      ).resolves.toBe(undefined);
    });
    it('has valid non-unique name, throws error', async () => {
      const nonUniqueName = 'John Doe';

      userRepositoryInstance.getUser.mockReturnValue(
        new User({ id: 1, name: nonUniqueName, job: 'fakeJob' })
      );

      await expect(
        userUseCaseInstance._checkIfUserAlreadyExists(nonUniqueName)
      ).rejects.toThrow('Cant create this user, name already exists!');
    });
  });
});
