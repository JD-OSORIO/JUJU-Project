const TokenFactory = require('../utils/tokenFactory');

class TokenService {
    static generateToken(user) {
        return TokenFactory.createToken(user);
    }

    static verifyToken(token) {
        return TokenFactory.verifyToken(token);
    }
}

module.exports = TokenService;