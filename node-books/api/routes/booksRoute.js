/* eslint-disable no-undef */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const BookController = require('../controllers/booksController');

router.get('/', checkAuth, BookController.book_list);

router.get('/:bookId', checkAuth, BookController.book_detail);

router.post('/', checkAuth, BookController.book_create_post);

router.delete('/:bookId', checkAuth, BookController.book_delete);

module.exports = router;
