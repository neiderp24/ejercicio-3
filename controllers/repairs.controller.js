const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync');



const getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    include: [{ model: User }],
  });

  res.status(200).json({
    repairs,
  });
});

const createDate = catchAsync(async (req, res, next) => {
  const { date, computerNumber, comment } = req.body;
  const { sessionUser } = req
  const newDate = await Repair.create({
    userId: sessionUser.id,
    date,
    computerNumber,
    comment,
  });

  res.status(201).json({ newDate });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    repair,
  });
});

const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'completed' });

  res.status(200).json({ status: 'sucess' });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' }),
    res.status(200).json({
      status: 'succes',
    });
});

module.exports = {
  getAllRepairs,
  createDate,
  getRepairById,
  updateRepair,
  deleteRepair,
};
