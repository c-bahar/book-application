const mongoose = require('mongoose');

const Note = require('../models/noteModel');
const Book = require('../models/bookModel');

exports.notes_get_all = (req, res, next) => {
    Note.find()
        .select('note book _id')
        .populate('book user')
        .exec()
        .then( (docs) => {
          const response = {
            counts: docs.length,
            notes: docs.map( (doc) => {
              return {
                note: doc.note,
                book: doc.book,
                user: doc.user,
                _id: doc.id,
              };
            }),
          };
          res.status(200).json(response);
        })
        .catch( (err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
  }

  exports.notes_get_id = (req, res, next) => {
    Note.findById(req.params.noteId)
        .exec()
        .then( (note) => {
          if (!note) {
            res.status(404).json({
              message: 'Not found',
            });
          } else {
            res.status(200).json({
              note: note,
            });
          }
        })
        .catch( (err) => {
          console.log(err);
          res.status(500).json({error: err});
        });
  }

  exports.notes_create = (req, res, next) => {
    Book.findById(req.body.bookId) // We check whether there is a book or not
        .then( (book) => {
          if (!book) {
            return res.status(404).json({
              message: 'Product not found',
            });
          }
          const note = new Note({
            _id: new mongoose.Types.ObjectId(),
            note: req.body.note,
            book: req.body.bookId,
            user: req.body.userId,
          });
          return note.save().then( (result) => {
            console.log(result);
            res.status(201).json({
              message: 'Created note successfully',
              createdObject: {
                _id: result._id,
                note: result.note,
                bookID: result.book,
                user: result.user,
              },
            });
          });
        })
        .catch( (err) => {
          res.status(500).json({
            message: 'Book not found',
            error: err,
          });
        });
  }

  exports.notes_delete = (req, res, next) => {

  }
  