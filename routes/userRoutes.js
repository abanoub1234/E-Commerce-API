const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware.js");
const { validate } = require("../middlewares/validateMiddleware.js");
const { userValidationRules } = require("../validators/userValidator.js");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", validate(userValidationRules), userController.createUser);
router.post("/login", userController.loginUser);

// Admin Routes
router.get("/users", authenticateUser, authorizeRoles("admin"), userController.getAllUsers);
router.delete("/:id", authenticateUser, authorizeRoles("admin"), userController.deleteUser);

module.exports = router;
