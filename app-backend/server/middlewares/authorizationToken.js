const jwt = require('jsonwebtoken');

class AuthMiddleware {

     /*
     Middleware para verificar la autenticidad del token JWT
    - Si no se envía un token, se retorna un error 401 (No autorizado).
    - Si el token es inválido o ha expirado, se retorna un error 403 (Prohibido).
    - Si el token es válido, se adjunta la información del usuario en `req.user` y se pasa al siguiente middleware.
     Implementando esta logica me permite manejar de una forma facil el middleware de JWT
     */

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