const catchError = require("../middlewares/catchError.js");
const product = require("../models/product.js");
const productModel = require("../models/product.js");
const promoCodeModel = require("../models/PromoCode.js");


//get
const getAll = catchError(async (req, res) => {
    const allproudct = await productModel.find();
    allproudct.forEach(async (product) => {
        if (product.promoCode) {
            const promoCode = await promoCodeModel.findById(product.promoCode);
            if (promoCode && promoCode.isActive) {
                console.log("price after discount")
                product.priceAfterDiscount = product.price - (product.price * promoCode.discount / 100);
            } else {
                product.priceAfterDiscount = null;
                product.promoCode = null;
            }
            await product.save();
        }
    });
    res.status(200).json({ message: "Done", allproudct })
})
//post
const createProudct = catchError(async (req, res) => {
    let product = req.body;
    if (product.promoCode) {
        const promoCode = await promoCodeModel.findById(product.promoCode);
            if (promoCode && promoCode.isActive) {
                console.log("price after discount")
                product.priceAfterDiscount = product.price - (product.price * promoCode.discount / 100);
            } else {
                product.priceAfterDiscount = null;
                product.promoCode = null;
            }
    }
    const createdProudct = await productModel.insertOne(product);
    res.status(201).json(createdProudct);

})
//put
const updateProudct = catchError(async (req, res) => {
    const proudctId = req.params.id;
    const proudct = await productModel.findById(proudctId);

    if (!proudct) {
        return res.status(404).json({ message: "product not found" });
    }
    if (req.body.promoCode && !await promoCodeModel.findById(req.body.promoCode)) {
        return res.status(404).json({ message: "promo code not found" });
    }


    const updateProudct = await productModel.findByIdAndUpdate(proudctId, req.body, { new: true });
    if ((req.body.price && updateProudct.promoCode) || req.body.promoCode) {
        const promoCode = await promoCodeModel.findById(updateProudct.promoCode);
            if (promoCode && promoCode.isActive) {
                console.log("price after discount")
                updateProudct.priceAfterDiscount = updateProudct.price - (updateProudct.price * promoCode.discount / 100);
            } else {
                updateProudct.priceAfterDiscount = null;
                updateProudct.promoCode = null;
            }
            await updateProudct.save();
    }

    res.status(200).json({ message: "proudct updated successfully", updateProudct });
})
// delete one 
const deleteProudct = catchError(async (req, res) => {
    const proudctId = req.params.id;
    const proudct = await productModel.findById(proudctId);
    if (!proudct) {
        return res.status(404).json({ message: "proudct not found" });
    }

    await productModel.findByIdAndDelete(proudctId);
    res.status(200).json({ message: "proudct deleted successfully" });
})
// get proudct by id 
const getProudctbyId = catchError(async (req, res) => {
    const proudctId = req.params.id;
    const proudct = await productModel.findById(proudctId);
    if (!proudct) {
        return res.status(404).json({ message: "proudct not found" });
    }
    console.log(proudct.promoCode);
    if (product.promoCode) {
        const promoCode = await promoCodeModel.findById(product.promoCode);
        if (promoCode && promoCode.isActive) {
            console.log("price after discount")
            product.priceAfterDiscount = product.price - (product.price * promoCode.discount / 100);
        } else {
            product.priceAfterDiscount = null;
            product.promoCode = null;
        }
        await product.save();
    }
    res.status(200).json({ proudct });
})

// add promo code to proudct
const addProductPromoCode = catchError(async (req, res) => {
    const proudctId = req.params.id;
    const promoCodeId = req.body.promoCodeId;
    const proudct = await productModel
        .findById(proudctId)
        .populate("promoCode");
    if (!proudct) {
        return res.status(404).json({ message: "proudct not found" });
    }
    if (proudct.promoCode) {
        return res.status(400).json({ message: "proudct already has a promo code" });
    }
    const promoCode = await promoCodeModel.findById(promoCodeId);
    if (!promoCode) {
        return res.status(404).json({ message: "promo code not found" });
    }
    console.log(promoCodeId)
    proudct.promoCode = promoCodeId;
    proudct.priceAfterDiscount = proudct.price - (proudct.price * promoCode.discount / 100);
    console.log(product);
    await proudct.save();
    console.log("after save " + proudct);
    res.status(200).json({ message: "promo code added to proudct", user: product });
});
// remove promo code from proudct
const removeProductPromoCode = catchError(async (req, res) => {
    const proudctId = req.params.id;
    const proudct = await productModel
        .findById(proudctId)
        .populate("promoCode");
    if (!proudct) {
        return res.status(404).json({ message: "proudct not found" });
    }
    if (!proudct.promoCode) {
        return res.status(400).json({ message: "proudct does not have a promo code" });
    }
    proudct.promoCode = null;
    proudct.priceAfterDiscount = null;
    await proudct.save();
    res.status(200).json({ message: "promo code removed from proudct" });
});
// get all proudct with promo code
const getAllProudctWithPromoCode = catchError(async (req, res) => {
    const allproudct = await productModel.find({ promoCode: { $ne: null } });
    res.status(200).json({ message: "Done", allproudct });
});

module.exports = { getAll, createProudct, updateProudct, deleteProudct, getProudctbyId, addProductPromoCode, removeProductPromoCode, getAllProudctWithPromoCode };
