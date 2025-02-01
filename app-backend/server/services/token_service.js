const TokenFactory = require('../utils/tokenFactory');

class TokenService {
    // Delego la generación del token a una fábrica para mantener la separación de responsabilidades
    // y permitir cambios futuros sin modificar este servicio.
    static generateToken(user) {
        return TokenFactory.createToken(user);
    }
    // Abstraigo la verificación del token en un servicio separado para mejorar la modularidad y reutilización del código.
    static verifyToken(token) {
        return TokenFactory.verifyToken(token);
    }
}

module.exports = TokenService;