import IUserRepository from '../interfaces/IUserRepository.js'
import { db } from '../config/firebase.js'

export default class UserRepository extends IUserRepository {
  constructor() {
    super();
    this.collection = db.collection('users-node');
  }

  async create(user) {
    const newUser = await this.collection.add(user);
    return {
      id: newUser.id,
      ...user,
    }
  }

  async update(id, user) {
    if (!id) throw new Error('ID inválido para update');
    await this.collection.doc(id).update(user);
    return {
      id,
      ...user,
    }
  }

  async delete(id) {
    if (!id) throw new Error('ID inválido para delete');
    await this.collection.doc(id).delete();
    return { id, message: 'Usuario eliminado' };
  }

  async getAll() {
    const users = await this.collection.get();
    return users.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findByName(nombre) {
    if (!nombre) return null;
    const users = await this.collection.where('nombre', '==', nombre).get();
    return users.empty ? null : {
      id: users.docs[0].id,
      ...users.docs[0].data(),
    }
  }

  async findByUser(campo, valor) {
  try {
    if (!campo || typeof campo !== 'string') {
      throw new Error('Campo de consulta inválido');
    }
    if (!valor) {
      throw new Error('Valor indefinido para consulta en Firestore');
    }
    const snapshot = await this.collection.where(campo, '==', valor).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,       
      ...doc.data()
    };
  } catch (error) {
    console.error('Error en findByUser:', error.message);
    throw new Error('Error consultando usuario en la base de datos');
  }
}

  async updateSessionToken(id, sessionToken) {
    if (!id) throw new Error('ID inválido para updateSessionToken');
    await this.collection.doc(id).update({ currentSessionToken: sessionToken });
  }

  async getSessionToken(id) {
    if (!id) throw new Error('ID inválido para getSessionToken');
    const user = await this.collection.doc(id).get();
    return user.exists ? user.data().currentSessionToken : null;
  }

  async getById(id) {
    if (!id) throw new Error('ID inválido para getById');
    const user = await this.collection.doc(id).get();
    return user.exists ? { id, ...user.data() } : null;
  }

  async findByCorreo(correo) {
    if (!correo) {
      return null;
    }
    const users = await this.collection.where('correo', '==', correo).get();
    return users.empty ? null : {
      id: users.docs[0].id,
      ...users.docs[0].data(),
    };
  }
}
