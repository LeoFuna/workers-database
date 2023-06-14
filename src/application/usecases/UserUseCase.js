const { InvalidData } = require('../../infra/utils/exceptions');

class UserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    // Lógica para criar um usuário usando o repositório
  }

  async getUser(name) {
    if (!name.length) throw new InvalidData('Name is required');
    const userFound = await this.userRepository.getUser(name);
    return userFound;
  }

  async getUsers() {
    // Lógica para buscar um usuário usando o repositório
  }

  async updateUser(userId, userData) {
    // Lógica para atualizar um usuário usando o repositório
  }

  async deleteUser(userId) {
    // Lógica para excluir um usuário usando o repositório
  }
}

module.exports = UserUseCase;
