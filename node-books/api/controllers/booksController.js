/* eslint-disable no-undef */
const mongoose = require('mongoose');

const Book = require('../models/bookModel');

exports.book_get_all = (req, res) => {
  console.log(req.userData.email);
  Book.find()
    .select('name editor author _id')
    .exec()
    .then((books) => {
      const response = {
        counts: books.length,
        books: books.map((book) => {
          return {
            name: book.name,
            editor: book.editor,
            author: book.author,
            _id: book.id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}

exports.book_get_id = (req, res) => {
  const id = req.params.bookId;

  Book.findById(id)
    .select('name editor author')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          book: doc,
        });
      } else {
        res.status(404)
          .json({ message: 'There is not boook you are looking for' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.book_create = (req, res) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    editor: req.body.editor,
    author: req.body.author,
  });
  book.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: 'Created book successfully',
      createdBook: {
        name: result.name,
        editor: result.editor,
        author: result.author,
      },
    });
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}

exports.book_delete = (req, res) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Book deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}