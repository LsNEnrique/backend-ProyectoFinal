import InventarioService from "../services/inventarioService.js"

export default class InventarioController {
  constructor () {
    this.inventarioService = new InventarioService()
  }

  async getAll (req, res, next) {
    try {
      const producto = await this.inventarioService.getAll()
      console.log('@@@ producto => ', producto)
      res.json(producto)
    } catch (error) {
      next(error)
    }
  }

  async getByRol (req, res, next) {
    try {
      const { rol } = req.params
      const product = this.inventarioService.getByRol(rol)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }

  async getByType (req, res, next) {
    try {
      const { tipo } = req.params
      const producto = this.inventarioService.getByType(tipo)
      res.json(producto)
    } catch (error) {
      next(error)
    }
  }

  async create (req, res, next) {
    try {
      const newProducto = await this.inventarioService.create(req.body)
      res.json(newProducto)
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      const updatedProducto = await this.inventarioService.update(id, req.body)
      res.json(updatedProducto)
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params
      await this.inventarioService.delete(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async getUserByProductName (req, res, next) {
    try {
      const { producto } = req.user
      const product = await this.inventarioService.getById(producto)
      if (!product) {
        return res.status(400).json({ message: 'Producto no encontrad' })
      }
      return res.status(200).json({ user })
    } catch (error) {
      next(error)
    }
  }
}