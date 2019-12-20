const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const BookController = require('../controllers/booksController');

router.get('/',checkAuth, BookController.book_get_all);

router.get('/:bookId', BookController.book_get_id);

router.post('/', checkAuth, BookController.book_create);

router.delete('/:bookId', BookController.book_delete);

module.exports = router;
