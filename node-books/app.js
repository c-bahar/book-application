const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./api/routes/booksRoute');
const noteRoutes = require('./api/routes/notesRoute');
const userRoutes = require('./api/routes/userRoute');
const listRoutes = require('./api/routes/listRoute');

mongoose.connect(
    'mongodb+srv://adminovski:bookproject@node-books-bj7w3.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

app.use(morgan('dev')); // see request on the terminal
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // eslint-disable-next-line max-len
  res.header('Access-Control-Allow-Headers', 'Origin X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// installed nodemon, we dont need to restart server when we changed something

// Routes which should handle request
app.use('/books', bookRoutes);
app.use('/notes', noteRoutes);
app.use('/user', userRoutes);
app.use('/list', listRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
