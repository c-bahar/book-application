/* eslint-disable no-undef */
const mongoose = require("mongoose");

const Note = require("../models/noteModel");
const Book = require("../models/bookModel");

exports.get_note_book = (req, res) => {
  Note.find({ user: req.userData.userId, book: req.query.book_id })
    .select("_id note book user")
    .populate({ path: "book", select: "name editor author" })
    .populate({ path: "user", select: "name" })
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        const response = {
          counts: docs.length,
          notes: docs.map(doc => {
            return {
              _id: doc._id,
              note: doc.note,
              book: doc.book,
              user: doc.user
            };
          })
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "There is not note"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "No valid information",
        error: err
      });
    });
};

exports.get_note_id = (req, res) => {
  Note.findById(req.params.noteId)
    .exec()
    .then(note => {
      if (!note) {
        res.status(404).json({
          message: "Not found"
        });
      } else {
        res.status(200).json({
          note: note
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.note_delete = (req, res) => {
  Note.deleteOne({ _id: req.params.noteId })
    .exec()
    .then(note => {
      if (!note) {
        res.status(404).json({
          message: "Not found"
        });
      } else {
        res.status(200).json({
          message: "Deleted"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.create_note = (req, res) => {
  Book.findById(req.body.bookId) // We check whether there is a book or not
    .then(book => {
      if (!book) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        note: req.body.note,
        book: req.body.bookId,
        user: req.userData.userId
      });
      return note.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created note successfully",
          createdObject: {
            _id: result._id,
            note: result.note,
            bookID: result.book,
            user: result.user
          }
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Book not found",
        error: err
      });
    });
};
