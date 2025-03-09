const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    review: { type: String, required: true, minlength: 5, maxlength: 500 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    photos: [{ type: String }] // Array of image URLs (optional)
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
