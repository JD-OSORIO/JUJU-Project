const roleMiddleware = (rolesPermitidos) => (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.user_role)) {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
};

module.exports = roleMiddleware;