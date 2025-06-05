const revokedTokens = new Set()

class TokenService {
  static async revokeToken(token) {
    try {
      revokedTokens.add(token)
    } catch (error) {
      throw new Error('Error al revocar el token' + error.message)
    }
  }
  static async isTokenRevoked(token) {
    try {
      return revokedTokens.has(token)
    } catch (error) {
      throw new Error('Error al verificar el token' + error.message)
    }
  }
}

export default TokenService