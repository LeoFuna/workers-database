const { userAccess } = require('../../infra/database/LocalDB');
const AbstractUserAccessRepository = require('./AbstractUserAccessRepository');
// Apesar de nao ser async, estou simulando uma interaçao real com um BD

class LocalUserAccessRepository extends AbstractUserAccessRepository {
  async createNewAccess(name) {
    userAccess.push({ name });
    return 'Created';
  }

  async countUserAccess(name) {
    const timesThatUserWasAccessed = userAccess.filter(
      (user) => user.name === name
    ).length;
    return `Usuário ${name} foi lido ${timesThatUserWasAccessed} vezes.`;
  }
}

module.exports = LocalUserAccessRepository;
