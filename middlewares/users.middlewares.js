const jwt = require('jsonwebtoken');

//Model

const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const protectToken = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Invalid session', 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is no longer avaliable', 403)
    );
  }
  req.sessionUser = user;
  next();
});
const protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  if (sessionUser.id !== +id) {
    return next(new AppError('You do not own account', 403));
  }
  next();
});

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return next(new AppError('User not found given that id', 404));
  }
  req.sessionUser = user;
  next();
});

const protectEmployee = catchAsync(async (req, res, next) => {
  const { sessionUser } = req
  if (sessionUser.role !== 'employee')
    return next(new AppError('Access denied', 403))
})

module.exports = { userExists, protectToken, protectAccountOwner, protectEmployee };
