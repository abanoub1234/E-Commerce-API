const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { type } = require("../Utilites/proudctValidation");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    address: [
        {
            country: String,
            city: String,
            street: String,
            building: Number,
            floor: Number,
            apartment: Number,
            postal_code: Number,
        },
    ],
    paymentDetails: { type: String, default: null },
    socialMedia: { gmail: { type: String, default: null } },
    isConfirmed: { type: Boolean, default: false },
    restrictByAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "seller", "admin"], default: "user" }, 
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orderHistory: [
        {
            orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
            orderDetails: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: Number }],
            paymentDetails: String,
        },
    ],
    cart: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: Number }],
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
