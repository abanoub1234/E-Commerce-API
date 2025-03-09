const PromoCode = require("../models/PromoCode");
const product = require("../models/product.js");
const ProductModel = require("../models/product.js");

// @desc Create a new promo code
// @route POST /api/promos
// @access Admin Only
exports.createPromoCode = async (req, res) => {
    try {
        const { code, discount, expirationDate, usageLimit } = req.body;

        const existingCode = await PromoCode.findOne({ code });
        if (existingCode) {
            return res.status(400).json({ message: "Promo code already exists" });
        }

        const promoCode = new PromoCode({ code, discount, expirationDate, usageLimit });
        await promoCode.save();
        res.status(201).json({ message: "Promo code created successfully", promoCode });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc Get all promo codes
// @route GET /api/promos
// @access Admin Only
exports.getAllPromoCodes = async (req, res) => {
    try {
        const promoCodes = await PromoCode.find();
        res.status(200).json(promoCodes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc Get a single promo code
// @route GET /api/promos/:id
// @access Admin Only
exports.getPromoCode = async (req, res) => {
    try {
        const promoCode = await PromoCode.findById(req.params.id);
        if (!promoCode) {
            return res.status(404).json({ message: "Promo code not found" });
        }
        res.status(200).json(promoCode);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc Update a promo code
// @route PUT /api/promos/:id
// @access Admin Only
exports.updatePromoCode = async (req, res) => {
    try {
        const { code, discount, expirationDate, isActive, usageLimit } = req.body;

        const promoCode = await PromoCode.findByIdAndUpdate(
            req.params.id,
            { code, discount, expirationDate, isActive, usageLimit },
            { new: true, runValidators: true }
        );

        if (!promoCode) {
            return res.status(404).json({ message: "Promo code not found" });
        }

        res.status(200).json({ message: "Promo code updated", promoCode });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc Delete a promo code
// @route DELETE /api/promos/:id
// @access Admin Only
exports.deletePromoCode = async (req, res) => {
    try {
        const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
        if (!promoCode) {
            return res.status(404).json({ message: "Promo code not found" });
        }
        // Delete promo code from all products
        await ProductModel.updateMany({ promoCode: promoCode._id }, { promoCode: null, priceAfterDiscount: null });
        res.status(200).json({ message: "Promo code deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


