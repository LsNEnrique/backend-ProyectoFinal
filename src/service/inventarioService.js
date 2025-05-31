import inventarioRepository from '../repositories/inventarioRepository.js'
import { Inventario } from './../models/inventarioModel.js'

export default class InventarioService {
  constructor() {
    this.InventarioRepository = new inventarioRepository()
  }
  async getAll () {
    return await this.InventarioRepository.getAll()
  }
  async findProductName (nombre) {
    const producto = await this.InventarioRepository.findProductName(nombre)
    if (!producto) {
      throw new Error('Producto no encontrado')
    }
    return nombre
  }
  async findByType (tipo) {
    return await this.InventarioRepository.findByType(tipo)
  }
  async create (producto) {
    const inventarioExists = await this.InventarioRepository.findByProductName(producto.producto)

    if (inventarioExists) {
      throw { statusCode: 400, message: 'Producto ya existe' }
    }
    const fullNameExists = await this.InventarioRepository.findByProductName(producto.nombre)

    if (fullNameExists) {
      throw { statusCode: 400, message: 'Nombre del producto ya existe' }
    }

    const newProducto = new Inventario({ ...producto })
    return await this.InventarioRepository.create({ ...newProducto })
  }
  async update (id, producto) {
    const InventarioExists = await this.InventarioRepository.getById(id)

    if (!InventarioExists) {
      throw { message: 'Producto no encontrado ', statusCode: 404 } 
    }
    const newProducto = new Inventario({ ...producto })
    return await this.InventarioRepository.update(id, { ...newProducto })
  }
  async delete (id) {
    const existProducto = await this.InventarioRepository.getById(id)
    if (!existProducto) {
      throw { statusCode: 404, message: 'Producto no encontrado' }
    }
    return await this.InventarioRepository.delete(id)
  }
}