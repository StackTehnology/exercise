const { check, validationResult } = require("express-validator");
module.exports.loginValidation = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("email is not valid")
    .bail(),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be more that 6 charecters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports.validateUser = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("email is not valid")
    .bail(),
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be more that 6 charecters")
    .bail(),
  check("type")
    .trim()
    .isIn(["admin", "blogger"])
    .withMessage("Undefined user type")
    .custom((value) => value !== "admin")
    .withMessage("You can not be admin")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports.validatePost = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("title can not be empty")
    .isLength({ min: 10 })
    .withMessage("title must be more that 10 charecters")
    .bail(),
  check("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("content can not be empty")
    .isLength({ min: 50 })
    .withMessage("content must be more that 50 charecters")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
