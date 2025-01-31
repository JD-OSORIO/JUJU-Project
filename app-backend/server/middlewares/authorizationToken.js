const jwt = require('jsonwebtoken');

class AuthMiddleware {
    static checkToken(req, res, next) {
        if (!req.headers['authorization']) {
            return res.status(401).json({ error: 'Debes incluir el token' });
        }

        const token = req.headers['authorization'].split(" ")[1];

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        } catch (error) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }
    }
}

module.exports = AuthMiddleware;