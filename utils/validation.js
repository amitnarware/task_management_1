const { body, validationResult } = require('express-validator');

// Registration validation
const validateRegistration = [
  body('email').isEmail().withMessage('Please provide a valid email.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/\d/)
    .withMessage('Password must contain a number.'),
  body('username').notEmpty().withMessage('Username is required.'),
];

// Login validation
const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

// Validation result handler
const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validationHandler,
};
