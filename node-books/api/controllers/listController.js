/* eslint-disable no-undef */
const mongoose = require("mongoose");

const List = require("../models/listModel");
const User = require("../models/userModel");

exports.list_get_all = (req, res) => {
  List.find()
    .exec()
    .then(result => {
      res.status(200).json({
        result
      });
    });
};

// eslint-disable-next-line no-undef
exports.list_get = (req, res) => {
  User.findOne({ email: req.userData.email })
    .exec()
    .then(user => {
      List.findOne({ user: user.email })
        .populate("haveRead")
        .exec()
        .then(list => {
          if (list) {
            const response = {
              haveReadList: list.haveRead.map(haveRead => {
                return haveRead;
              }),
              willReadList: list.willRead.map(willRead => {
                return willRead;
              })
            };
            res.status(200).json(response);
          } else {
            const list = new List({
              _id: new mongoose.Types.ObjectId(),
              user: req.userData.email
            });
            list
              .save()
              .then(() => {
                res.status(201).json({
                  message: "List is created"
                });
              })
              .catch(() => {
                res.status(500).json({
                  message: "List cannot be created"
                });
              });
          }
        })
        .catch(() => {
          res.status(500).json({
            message: "List is not"
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        message: "Not found"
      });
    });
};

exports.list_add = (req, res) => {
  User.findOne({ email: req.userData.email })
    .exec()
    .then(user => {
      console.log("user mai", user.email);
      List.update(
        { user: user.email },
        { $push: { haveRead: req.body.bookId } }
      )
        .exec()
        .then(() => {
          res.status(200).json({
            message: "okay"
          });
        })
        .catch(err => {
          res.status(500).json({
            message: err
          });
        });
    });
};
