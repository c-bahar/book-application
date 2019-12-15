const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const booksSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  editor: String,
  author: String,
});

module.exports = mongoose.model('Book', booksSchema);
