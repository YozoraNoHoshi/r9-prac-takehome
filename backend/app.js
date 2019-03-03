const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// const votesRoutes = require('./routes/votes');
const jokesRoutes = require('./routes/jokes');

// app.use('/votes', votesRoutes);
app.use('/jokes', jokesRoutes);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

app.use(function(err, req, res, next) {
  if (err.stack) console.log(err.stack);

  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;
