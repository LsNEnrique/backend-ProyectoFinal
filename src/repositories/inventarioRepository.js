import IinventarioRepository from "../interfaces/IinventarioRepository";
import { db } from '../config/firebase.js'

export default class inventarioRepository extends IinventarioRepository {
    constructor() {
    super();
    this.collection = db.collection('users-node');
  }

  async create(producto) {
    const newUser = await this.collection.add(producto);
    return {
      id: newUser.id,
      ...producto,
    }
  }

  async update(id, producto) {
    await this.collection.doc(id).update(producto);
    return {
      id,
      ...producto,
    }
  }

  async delete(id) {
    await this.collection.doc(id).delete();
    return { id, message: 'Producto eliminado' };
  }

  async getAll() {
    const producto = await this.collection.get();
    console.log('@@@ get all repository => ', producto)
    return producto.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findByProdcutName(nombre) {
    const nombre = await this.collection
      .where('nombre', '==', nombre)
      .get();
    return nombre.empty ? null : {
      id: nombre.docs[0].id,
      ...nombre.docs[0].data(),
    }
    }
    async findByType(tipo) {
    const tipo = await this.collection
      .where('tipo', '==', tipo)
      .get();
    return tipo.empty ? null : {
      id: tipo.docs[0].id,
      ...tipo.docs[0].data(),
    }
  }
  async updateSessionToken(id, sessionToken) {
    await this.collection.doc(id)
    return user.update({ currentSessionToken: sessionToken });
  }
  async getSessionToken(id) {
    const user = await this.collection.doc(id).get();
    return user.exists ? user.data().currentSessionToken : null;
  }
  async getById(id) {
    const user = await this.collection.doc(id).get();
    return user.exists ? { id, ...user.data() } : null;
  }
}