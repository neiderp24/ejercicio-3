const express = require('express');

//Middlewares
const {
  protectAccountOwner,
  userExists,
  protectToken,
} = require('../middlewares/users.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//controllers
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/users.controller');

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUserValidations, checkValidations, createUser);

router.post('/login', login);

router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(protectAccountOwner, protectToken, userExists, updateUser)
  .delete(protectAccountOwner, protectToken, userExists, deleteUser);

module.exports = { usersRouter: router };
