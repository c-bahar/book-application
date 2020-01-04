/* eslint-disable no-undef */
const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const listsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  haveRead: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  willRead: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('List', listsSchema);

