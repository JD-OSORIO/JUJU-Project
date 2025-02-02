const jwt = require('jsonwebtoken');

class TokenFactory {
    static createToken(user) {
        const payload = {
            user_id: user._id,
            role: user.role
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = TokenFactory;