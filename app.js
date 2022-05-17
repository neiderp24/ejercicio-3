const express = require('express');
const rateLimit = require('express-rate-limit');

const { globalErrorHandler } = require('./controllers/errors.controllers');

const { reset } = require('nodemon');
const { repairsRouter } = require('./routes/repairs.routes');

const { usersRouter } = require('./routes/users.routes');

const app = express();

app.use(express.json());

const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000,
  message: 'Too many request from this IP',
});

app.use(limiter);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

app.use('*', globalErrorHandler);

module.exports = { app };
