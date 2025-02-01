const router = require('express').Router();

/*Decidi separar las rutas para evitar fallos a la hora de implementar mas endpoints en un futuro,
en este caso utilizo mejor la responsabilidad unica para un manejo mejor */

const {checkToken} = require('../middlewares/authorizationToken')

router.use('/books', checkToken, require('./api/books'))
router.use('/users', require('./api/users'))

module.exports = router;