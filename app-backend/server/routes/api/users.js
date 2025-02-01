const router = require('express').Router();
const AuthController = require('../../controllers/auth_controller')
const validateLogin = require('../../middlewares/auth_middleware');
const { checkToken } = require('../../middlewares/authorizationToken');
const roleMiddleware = require('../../middlewares/roleMiddleware')

router.post('/register', AuthController.register);
router.post('/login', validateLogin, AuthController.login)

router.get('/', checkToken, roleMiddleware('admin'), AuthController.getAllUsers);
router.get('/:id', checkToken, roleMiddleware('admin'), AuthController.getUserById);
router.put('/:id', checkToken, roleMiddleware('admin'), AuthController.updateUser);
router.delete('/:id', checkToken,roleMiddleware('admin'), AuthController.deleteUser);

module.exports = router;