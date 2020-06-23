/* eslint-disable no-undef */
const mongoose = require('mongoose');

const Book = require('../models/bookModel');

exports.book_list = (req, res) => {
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

exports.book_detail = (req, res) => {
  const id = req.params.bookId;
  Book.findById(id)
    .select('name editor author')
    .exec()
    .then((book) => {
      if (book) {
        res.status(200).json({
          book: book,
        });
      } else {
        res.status(404)
          .json({ 
            message: 'Book is not found' 
          });
        } 
    })
    .catch(() => {
      res.status(500).json({ 
        error: "System Error" 
      });
    });
}

exports.book_create_post = (req, res) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    editor: req.body.editor,
    author: req.body.author,
  });
  book.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: 'Book is created successfully',
      createdBook: {
        name: result.name,
        editor: result.editor,
        author: result.author,
      },
    });
  })
    .catch(() => {
      res.status(500).json({
        error: "System Error",
      });
    });
}

exports.book_delete = (req, res) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Book is deleted',
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "System Error",
      });
    });
}