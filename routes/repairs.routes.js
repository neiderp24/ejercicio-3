const express = require('express');

//Middlewares
const {
  protectEmployee,
  repairPending,
  protectToken,
} = require('../middlewares/rerpairs.middlewares');
const {
  createRepairValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const {
  getAllRepairs,
  createDate,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = express.Router();

router.post('/', createRepairValidations, checkValidations, createDate);

router.use(protectToken, protectEmployee);

router.get('/', getAllRepairs);

router
  .route('/:id')
  .get(repairPending, getRepairById)
  .patch(repairPending, updateRepair)
  .delete(repairPending, deleteRepair);

module.exports = { repairsRouter: router };
