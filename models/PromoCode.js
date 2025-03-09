const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Promo code is required"],
        unique: true,
        trim: true,
        uppercase: true,
    },
    discount: {
        type: Number,
        required: [true, "Discount amount is required"],
        min: [1, "Discount must be at least 1%"],
        max: [100, "Discount cannot exceed 100%"],
    },
    expirationDate: {
        type: Date,
        required: [true, "Expiration date is required"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Expiration date must be in the future",
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    usageLimit: {
        type: Number,
        required: [true, "Usage limit is required"],
        min: [1, "Usage limit must be at least 1"],
    },
    usedCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);
module.exports = PromoCode;
