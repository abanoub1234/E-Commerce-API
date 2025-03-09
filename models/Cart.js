const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    orderStatus: { type: String, enum: ["confirmed", "pending", "canceled"], default: "pending" },
    promoCode: { type: mongoose.Schema.ObjectId, ref: "PromoCode", default: null }
} , { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
