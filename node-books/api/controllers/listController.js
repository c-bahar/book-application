/* eslint-disable no-undef */
const mongoose = require("mongoose");

const List = require("../models/listModel");
const User = require("../models/userModel");

exports.bookList_list = (req, res) => {
  List.find()
    .exec()
    .then(result => {
      res.status(200).json({
        result
      });
    });
};

// eslint-disable-next-line no-undef
exports.bookList_detail = (req, res) => {
  List.findOne({ user: req.userData.userId })
    .populate("haveRead willRead")
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
          user: req.userData.userId
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
        message: "System Error"
      });
    });
};

exports.bookList_addBook = (req, res) => {
  User.findById(req.userData.userId)
    .exec()
    .then(user => {
        List.update(
        { user: user._id },
        { $addToSet: { haveRead: req.body.bookId } }
      )
        .exec()
        .then(() => {
          res.status(200).json({
            message: "Book is added"
          });
        })
        .catch(() => {
          res.status(500).json({
            message: "System Error"
          });
        });
    });
};
