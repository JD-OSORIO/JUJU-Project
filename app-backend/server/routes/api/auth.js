const router = require('express').Router();
const AuthController = require('../../controllers/auth_controller')
const validateLogin = require('../../middlewares/auth_middleware');

router.post('/register', AuthController.register);
router.post('/login', validateLogin, AuthController.login)


module.exports = router;