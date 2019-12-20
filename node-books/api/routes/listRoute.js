const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ListController =  require('../controllers/listController');

router.get('/', checkAuth, ListController.list_get);

router.patch('/', checkAuth, ListController.list_add);


module.exports = router;
