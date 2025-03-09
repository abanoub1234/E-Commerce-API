const express = require("express");
const { createProudct, deleteProudct, getAll, getProudctbyId, updateProudct, addProductPromoCode, removeProductPromoCode, getAllProudctWithPromoCode } = require("../controllers/productController.js");
const validateProudct  = require("../middlewares/validateProudct.js");
const { authenticateUser , authorizeRoles } = require("../middlewares/authMiddleware.js");
const proudctRoute = express.Router();


proudctRoute.post("/",validateProudct , authenticateUser ,  authorizeRoles("admin"), createProudct);
proudctRoute.get("/", getAll);
proudctRoute.get("/:id", getProudctbyId);
proudctRoute.patch("/:id",validateProudct , authenticateUser , authorizeRoles("admin"), updateProudct);
proudctRoute.delete("/:id", authenticateUser, authorizeRoles("admin"), deleteProudct);
proudctRoute.post("/promocode/:id", authenticateUser, authorizeRoles("admin"), addProductPromoCode);
proudctRoute.delete("/promocode/:id", authenticateUser, authorizeRoles("admin"), removeProductPromoCode);
// proudctRoute.get("/promocode", getAllProudctWithPromoCode);

module.exports = proudctRoute;
