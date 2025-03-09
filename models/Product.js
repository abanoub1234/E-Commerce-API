const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Too short"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [15, "Too short product description"]
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        max: [200000, "Too high product price"]
    },
    priceAfterDiscount: {
        type: Number,
        default: null
    },
    imageCover: {
        type: String,
        required: [true, "Product image cover is required"]
    },
    images: [String],
    category: {
        type: String,
        required: [true, "Product category is required"]
    },
    promoCode: { type: mongoose.Schema.ObjectId, ref: "PromoCode", default: null }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema); 
