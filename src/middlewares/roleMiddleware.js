export function roleMiddleware(...allowedRoles) {
    return (req, res, next) => {
      const { rol } = req.user
      if (!allowedRoles.includes(rol)) {
        return res.status(400).json({
          message: 'No tienes permisos para realizar la operación'
        })
      }
      next()
    }
  }