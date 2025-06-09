import jwt from 'jsonwebtoken'
import TokenService from '../services/tokenService.js'
import UserRepository from '../repositories/userRepository.js'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async (req, res, next) => {
  const authHeadear = req.headers['authorization']
  console.log("Authorization Header:", authHeadear)
  if (!authHeadear) {
    console.log('No se recibió header Authorization')
    return res.status(401).json({ message: 'No Autorizado' })
  }
  const token = authHeadear.split(' ')[1]
  if (!token) {
    console.log('No se recibió token en el header Authorization')
    return res.status(401).json({ message: 'Token no proporcionado' })
  }
  const userRepository = new UserRepository()
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Token decodificado:', decoded)
    const sessionToken = await userRepository.getSessionToken(decoded.id)
    console.log('Token guardado en sesión:', sessionToken)
    if (!sessionToken) {
      console.log('No hay token guardado en sesión para este usuario')
      return res.status(403).json({ message: 'No hay sesión activa' })
    }
    if (sessionToken != token || await TokenService.isTokenRevoked(token)) {
      console.log('El token enviado no coincide con el token guardado en sesión')
      return res.status(403).json({ message: 'Token Inválido o Expirado' })
    }
    const isRevoked = await TokenService.isTokenRevoked(token)
    console.log('¿Token revocado?:', isRevoked)
    if (isRevoked) {
      return res.status(403).json({ message: 'Token Inválido o Expirado' })
    }
    req.user = decoded
    next()
  } catch (error) {
    console.error('Error en authMiddleware:', error.message)
    return res.status(403).json({ message: 'Token Inválido' })
  }
}

export default authMiddleware