const router = require('express').Router();
const UserController = require('../../controllers/user_controller')
const { checkToken } = require('../../middlewares/authorizationToken');
const roleMiddleware = require('../../middlewares/roleMiddleware')

router.get('/', checkToken, roleMiddleware('admin'), UserController.getAllUsers);
router.get('/:id', checkToken, roleMiddleware('admin'), UserController.getUserById);
router.put('/:id', checkToken, roleMiddleware('admin'), UserController.updateUser);
router.delete('/:id', checkToken,roleMiddleware('admin'), UserController.deleteUser);

module.exports = router;