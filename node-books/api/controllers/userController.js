/* eslint-disable no-undef */
require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

exports.user_signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        res.status(409).json({
          message: 'Mail Exist',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else { // if password hashed successfully, we create user.
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            user.save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: 'User is created successfully',
                });
              })
              .catch(() => {
                res.status(500).json({
                  message: "System Error",
                });
              });
          }
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "System Error",
      });
    });
}

exports.user_login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign({
            userId: user._id,
          },
            process.env.secret_key,
            {
              expiresIn: '1h',
            },
          );
          return res.status(200).json({
            message: 'Auth Successful',
            token: token,
          });
        }
        return res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch(() => {
      console.log(err);
      res.status(500).json({
        message: "System Error",
      });
    });
}