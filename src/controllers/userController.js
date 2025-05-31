import UserService from "../services/userService.js"

export default class UserController {
  constructor () {
    this.userService = new UserService()
  }

  async getAll (req, res, next) {
    try {
      const users = await this.userService.getAll()
      console.log('@@@ users => ', users)
      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  async getByUser (req, res, next) {
    try {
      const { usuario } = req.params
      const user = this.userService.getByUser(usuario)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  async getByRol (req, res, next) {
    try {
      const { rol } = req.params
      const users = this.userService.getByRol(rol)
      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  async create (req, res, next) {
    try {
      const newUser = await this.userService.create(req.body)
      res.json(newUser)
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      const updatedUser = await this.userService.update(id, req.body)
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params
      await this.userService.delete(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async login (req, res, next) {
    const { usuario, password } = req.body
    console.log('@@@ user => ', usuario, password)
    try {
      const token = await this.userService.login(usuario, password)
      res.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  }

  async logout (req, res, next) {
    try {
      const authHeadear = req.headers['authorization']
      const token = authHeadear.split(' ')[1]
      const userId = req.user.id

      await this.userService.logout(userId, token)
      res.status(200).json({ message: 'Sesion Cerrada'})
    } catch (error) {
      next(error)
    }
  }

  async unlockUser (req, res, next) {
    try {
      const { id } = req.params
      await this.userService.unlockUser(id)
      res.json({ message: 'Usuario Desbloquead' })
    } catch (error) {
      next(error)
    }
  }

  async getUserByUsername (req, res, next) {
    try {
      const { usuario } = req.user
      const user = await this.userService.getByUser(usuario)
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrad' })
      }
      return res.status(200).json({ user })
    } catch (error) {
      next(error)
    }
  }
}