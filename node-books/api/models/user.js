const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  haveRead: {
    type: [Book],
    ref: 'Book',
  },
  willRead: {
    type: [Book],
    ref: 'Book',
  },
});

module.exports = mongoose.model('User', userSchema);
