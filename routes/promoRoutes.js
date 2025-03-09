const promoController = require("../controllers/promoCodeController.js");
const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware.js");

router.post("/", authenticateUser, authorizeRoles("admin"), promoController.createPromoCode);
router.get("/", authenticateUser, authorizeRoles("admin"), promoController.getAllPromoCodes);
router.get("/:id", authenticateUser, authorizeRoles("admin"), promoController.getPromoCode);
router.put("/:id", authenticateUser, authorizeRoles("admin"), promoController.updatePromoCode);
router.delete("/:id", authenticateUser, authorizeRoles("admin"), promoController.deletePromoCode);

module.exports = router;
