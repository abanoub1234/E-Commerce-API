const Joi  = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

const productValidationSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters long",
    }),

    description: Joi.string().min(15).max(500).required().messages({
        "string.empty": "Description cannot be empty",
        "string.min": "Description must be at least 15 characters long",
    }),

    quantity: Joi.number().integer().min(1).required().messages({
        "number.min": "Quantity must be at least 1",
    }),

    price: Joi.number().max(200000).required().messages({
        "number.max": "Price cannot exceed 200,000",
    }),

    imageCover: Joi.string().uri().required().messages({
        "string.uri": "ImageCover must be a valid URL",
    }),

    images: Joi.array().items(Joi.string().uri()).messages({
        "string.uri": "Each image must be a valid URL",
    }),

    category: Joi.string().required().messages({
        "string.empty": "Category cannot be empty",
    }),
    promoCode: JoiObjectId().allow(null)
});

module.exports = productValidationSchema;
