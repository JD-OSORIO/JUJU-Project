const router = require('express').Router();

const {checkToken} = require('../middlewares/authorizationToken')

router.use('/books', checkToken, require('./api/books'))
router.use('/users', require('./api/users'))

module.exports = router;