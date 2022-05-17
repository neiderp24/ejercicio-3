const { body, validationResult } = require('express-validator');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name is not defined'),
  body('email')
    .notEmpty()
    .withMessage('Email is not defined')
    .isEmail()
    .withMessage('The email is not valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is not defined')
    .isLength({ min: 8 })
    .withMessage('The password must have a minimum of 8 charaters'),
    body('role')
    .notEmpty()
    .withMessage('Role cannot be empty'),
];

const createRepairValidations = [
  body('date')
    .notEmpty()
    .withMessage('Date is not defined')
    .isDate()
    .withMessage('The date is not valid. Valid date format: YYYY-MM-DD'),
  body('computerNumber')
    .notEmpty()
    .withMessage('CumputerNumber is not defined'),
  body('comment').notEmpty().withMessage('Comment is not definet'),
];
const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorMsg = messages.join('. ');
    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }
  next();
};

module.exports = {
  createUserValidations,
  createRepairValidations,
  checkValidations,
};
