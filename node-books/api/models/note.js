const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const notesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  note: {
    type: String,
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
});

module.exports = mongoose.model('Note', notesSchema);
