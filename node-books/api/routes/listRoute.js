/* eslint-disable no-undef */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ListController = require('../controllers/listController');

router.get('/', checkAuth, ListController.bookList_detail);

router.patch('/', checkAuth, ListController.bookList_addBook);


module.exports = router;
