const { validationResult } = require('express-validator');

// Middleware reutilizable para manejar errores de validación de `express-validator`.
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};