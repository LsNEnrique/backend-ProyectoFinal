export default class IUserRepository {
    /*
    Crear Usuario
    @param {Object} Usuario
    @returns {Promise<Object>} Usuario Creado
    */
    async create(user) {
      throw new Error('Método no implementado');
    }
    async update(id, user) {
      throw new Error('Método no implementado');
    }
    async delete(id) {
      throw new Error('Método no implementado');
    }
    async getAll() {
      throw new Error('Método no implementado');
    }
    async findByFullName(nombre) {
      throw new Error('Método no implementado');
    }
    async findByUser(username) {
      throw new Error('Método no implementado');
    }
  }