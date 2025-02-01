
//Manejo de permisos y roles
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ error: 'Acceso denegado. No se encontró un rol válido.' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Acceso denegado. No tienes permisos para esta acción.' });
        }

        next();
    };
};

module.exports = roleMiddleware;