const router = require('express').Router();
const bookController = require('../../controllers/book_controller');
const { checkToken } = require('../../middlewares/authorizationToken');

router.get('/', checkToken, bookController.getAll);
router.get('/:bookID', checkToken, bookController.getById);
router.post('/', checkToken, bookController.create);
router.put('/:bookID', checkToken, bookController.update);
router.delete('/:bookID', checkToken, bookController.delete);

module.exports = router;