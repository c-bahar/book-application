/* eslint-disable no-undef */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const User = require('../models/userModel');

const UserController = require('../controllers/userController');

router.get('/', (req, res) => { // this request for test
  User.find()
    .exec()
    .then((docs) => {
      const response = {
        user: docs,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

module.exports = router;
