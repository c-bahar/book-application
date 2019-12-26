const mongoose = require("mongoose");

const List = require("../models/listModel");
const User = require("../models/userModel");

exports.list_get_all = (req, res, next) => {
  List.find()
    .exec()
    .then(result => {
      res.status(200).json({
        result
      });
    });
};

exports.list_get = (req, res, next) => {
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
              .then(result => {
                res.status(201).json({
                  message: "List is created"
                });
              })
              .catch(err => {
                res.status(500).json({
                  message: "List cannot be created"
                });
              });
          }
        })
        .catch(err => {
          res.status(500).json({
            message: "List is not"
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "Not found"
      });
    });
};

exports.list_add = (req, res, next) => {
  User.findOne({ email: req.userData.email })
    .exec()
    .then(user => {
      console.log("user mai", user.email);
      List.update(
        { user: user.email },
        { $push: { haveRead: req.body.bookId } }
      )
        .exec()
        .then(doc => {
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
