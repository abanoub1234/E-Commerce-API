const express = require("express");
const { authenticateUser } = require("../middlewares/authMiddleware.js");
const reviewController = require("../controllers/reviewController.js");

const router = express.Router();

router.post("/add", authenticateUser, reviewController.addReview);
router.get("/:productId", reviewController.getProductReviews);
router.delete("/:reviewId", authenticateUser, reviewController.deleteReview);

module.exports = router;
