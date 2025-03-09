const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware.js");
const cartController = require("../controllers/cartController.js");

const router = express.Router();

router.post("/add", authenticateUser, cartController.addToCart);
router.get("/", authenticateUser, cartController.getUserCart);
router.delete("/remove", authenticateUser, cartController.removeFromCart);
router.put("/:cartId/status", authenticateUser, authorizeRoles("admin"), cartController.updateOrderStatus);

module.exports = router;
