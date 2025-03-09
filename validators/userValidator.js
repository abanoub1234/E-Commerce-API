const { body } = require("express-validator");

exports.userValidationRules = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("phone").isLength({ min: 10, max: 15 }).withMessage("Phone number must be between 10-15 digits"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
