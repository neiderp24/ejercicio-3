//Models
const { Repair } = require('../models/repair.model');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const repairPending = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id, status: 'pending' } });
  if (!repair) {
    return next(new AppError('Repair not found given that id', 404));
  }
  req.repair = repair;
  next();
});

module.exports = { repairPending};
