const jwt = require('jsonwebtoken');
//Models

const { Repair } = require('../models/repair.model');
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

  const repair = await Repair.findOne({
    where: { id: decoded.id, status: 'pending' },
  });

  if (!repair) {
    return next(
      new AppError('The owner of this token is no longer avaliable', 403)
    );
  }

  req.sessionRepair = repair;
  next();
});
const protectEmployee = catchAsync(async (req, res, next) => {
  if (req.sessionRepair.role !== 'employee')
    return next(new AppError('Access not granted', 403));
  next();
});

const repairPending = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id, status: 'pending' } });
  if (!repair) {
    return next(new AppError('Repair not found given that id', 404));
  }
  req.repair = repair;
  next();
});

module.exports = { repairPending, protectToken, protectEmployee };
