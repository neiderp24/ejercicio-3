const express = require('express');

//Middlewares
const { protectToken, protectEmployee } = require('../middlewares/users.middlewares')
const { repairPending } = require('../middlewares/rerpairs.middlewares')
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

router.use(protectToken);

router.post('/', createRepairValidations, checkValidations, createDate);

router.get('/', protectEmployee, getAllRepairs);

router
  .route('/:id')
  .get(protectEmployee, repairPending, getRepairById)
  .patch(protectEmployee, repairPending, updateRepair)
  .delete(protectEmployee, repairPending, deleteRepair);

module.exports = { repairsRouter: router };
