import IinventarioRepository from "../interfaces/IinventarioRepository.js";
import { db } from '../config/firebase.js'

export default class inventarioRepository extends IinventarioRepository {
    constructor() {
    super();
    this.collection = db.collection('users-node');
  }

  async create(producto) {
    const newProduct = await this.collection.add(producto);
    return {
      id: newProduct.id,
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

  async findByProductName(nombre) {
    const product = await this.collection
      .where('nombre', '==', nombre)
      .get();
    return product.empty ? null : {
      id: product.docs[0].id,
      ...product.docs[0].data(),
    }
    }
    async findByType(tipo) {
    const type = await this.collection
      .where('tipo', '==', tipo)
      .get();
    return type.empty ? null : {
      id: type.docs[0].id,
      ...type.docs[0].data(),
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
    const producto = await this.collection.doc(id).get();
    return producto.exists ? { id, ...producto.data() } : null;
  }
}