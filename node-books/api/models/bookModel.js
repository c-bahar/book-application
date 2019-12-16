const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const booksSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  editor: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', booksSchema);
