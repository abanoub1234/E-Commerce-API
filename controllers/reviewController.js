const Review = require("../models/Review");

// Add a new review
exports.addReview = async (req, res) => {
    try {
        const { productId, review, rating, photos } = req.body;

        // Check if user has already reviewed the product
        const existingReview = await Review.findOne({ productId, userId: req.user.id });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }

        const newReview = new Review({
            productId,
            userId: req.user.id,
            review,
            rating,
            photos
        });

        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews for a product
exports.getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId }).populate("userId", "firstName lastName");

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review (Only the user who posted it can delete it)
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);

        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this review" });
        }

        await review.deleteOne();
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
