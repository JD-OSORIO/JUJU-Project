const { body } = require('express-validator');
const validateFields = require('./validateFields'); 

/*Implemento express-validator para brindarme una sanidad mejor en el codigo
permitiendome manejar las apis de mejor manera y implementar errores y seguridad del mismo */

const validateLogin = [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    validateFields // Utilizo los middleware para manejar errores.
];

module.exports = validateLogin;