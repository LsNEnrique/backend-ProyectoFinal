import UserService from "../services/userService.js"

export default class UserController {
  constructor () {
    this.userService = new UserService()
  }

  async register(req, res, next) {
  try {
    const { nombre, correo, password, username, Name, Address } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ message: 'Nombre completo, email y password son obligatorios' });
    }

    const newUser = await this.userService.create({
      nombre,
      correo,
      username,
      password,
      Name,
      Address
    });

    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    next(error);
  }
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
      const { username } = req.params
      const user = this.userService.getByUser(username)
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

   async login(req, res) {
    try {
      const { usuario, password } = req.body;

      // Log de los datos recibidos
      console.log('Datos recibidos en login:', req.body);

      // Validación básica
      if (!usuario || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
      }

      // Autenticación y generación de token
      const token = await this.userService.login(usuario, password);

      // Busca el usuario autenticado usando el campo "correo"
      const user = await this.userService.findByUser('correo', usuario);

      // Elimina la contraseña del objeto antes de enviarlo
      delete user.password;

      console.log("Usuario encontrado:", user)

      console.log('Respuesta login:', {
        token,
        user
      });

      return res.status(200).json({
        token,
        user
      });
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(error.statusCode || 500).json({ message: error.message });
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

  async getByName(req, res) {
  try {
      const usuario = req.user;

      let campo;
      let valor;

      if (usuario?.correo) {
        campo = 'correo';
        valor = usuario.correo;
      } else if (usuario?.id) {
        campo = 'id';
        valor = usuario.id;
      } else {
        return res.status(400).json({ message: 'No se pudo identificar el usuario autenticado' });
      }

      console.log(`Buscando usuario por campo: "${campo}" con valor: "${valor}"`);

      const user = await this.userService.findByUser(campo, valor);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error en getByName:', error);
      return res.status(error.statusCode || 500).json({ message: error.message || 'Error interno del servidor' });
    }
  }

}