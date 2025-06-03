import UserRepository from '../repositories/userRepository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import TokenService from './tokenService.js'
import { User } from '../models/User.js'

export default class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }
  async getAll () {
    return await this.userRepository.getAll()
  }
  async findByUser (username) {
    const user = await this.userRepository.findByUser(username)
    if (!user) {
      throw new Error('Usuario no encontrado')
    }
    return user
  }
  async findByRol (rol) {
    return await this.userRepository.findByRol(rol)
  }
  async create (user) {
    const userExists = await this.userRepository.findByUser(user.usuario)

    if (userExists) {
      throw { statusCode: 400, message: 'Usuario ya existe' }
    }
    const fullNameExists = await this.userRepository.findByFullName(user.nombre, user.apaterno, user.amaterno)

    if (fullNameExists) {
      throw { statusCode: 400, message: 'Nombre completo ya existe' }
    }

    user.password = await bcrypt.hash(user.password, 10)

    const newUser = new User({ ...user })
    return await this.userRepository.create({ ...newUser })
  }
  async update (id, user) {
    const userExists = await this.userRepository.getById(id)

    if (!userExists) {
      throw { message: 'Usuario no encontrado ', statusCode: 404 } 
    }

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10)
    }
    const newUser = new User({ ...user })
    return await this.userRepository.update(id, { ...newUser })
  }
  async delete (id) {
    const existUser = await this.userRepository.getById(id)
    if (!existUser) {
      throw { statusCode: 404, message: 'Usuario no encontrado' }
    }
    return await this.userRepository.delete(id)
  }

  async login (usuario, password) {
    const user = await this.findByUser(usuario)
    console.log('@@@ user => ', user)
    if (!user) {
      throw { message: 'Usuario no encontrado', statusCode: 404 }
    }
    
    if (user.bloqueado) {
      throw { message: 'Usuario Bloqueado, contacta al administrador', statusCode: 403 }
    }

    const validPassword = await bcrypt.compare(password, user.password)
    console.log('@@@ password => ', validPassword)
    if (!validPassword) {
      await this.handleFailedLogin(user.id)
      throw { message: 'Contraseña Incorrecta', statusCode: 401 }
    }

    const existingToken = await this.userRepository.getSessionToken(user.id)
    if (existingToken) {
      throw { message: 'Ya esta loggeado en otro lugar', statusCode: 403 }
    }

    const token = jwt.sign({
      id: user.id, usuario: user.usuario, rol: user.rol
    }, process.env.JWT_SECRET, { expiresIn: '1h'})
    
    await this.userRepository.updateSessionToken(user.id, token)
    
    return token
  }

  async logout (userId, token) {
    const sessionToken = await this.userRepository.getSessionToken(userId)
    if (sessionToken !== token) {
      throw { message: 'Token Invalido', statusCode: 400 }
    }
    await this.userRepository.updateSessionToken(userId, null)
    await TokenService.revokeToken(token)
  }

  async unlockUser (id) {
    const user = await this.userRepository.getById(id)
    if (!user) {
      throw { message: 'Usuario no Existe', statusCode: 404 }
    }
    await this.userRepository.update(id, { bloqueado: false, intentos: 0 })
  }

  async handleFailedLogin (id) {
    const user = await this.userRepository.getById(id)
    const intentos = user.intentos + 1
    if (intentos >= 5) {
      await this.userRepository.update(id, { bloqueado: true })
      throw { message: 'Usuario bloqueado despues de 5 intentos', statusCode: 404 }
    }
    await this.userRepository.update(id, { intento })
  }

  async getByUser (usuario) {
    const user = this.userRepository.findByUser(usuario)
    if (!user) {
      throw { message: 'Usuario no encontrado', statusCode: 404 }
    }
    return user
  }
}