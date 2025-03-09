const productValidationSchema =  require("../Utilites/proudctValidation.js");
const validateProudct = (req, res, next) => {
    const validation = productValidationSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details.map((err) => err.message)
        })
    }
    next()
}

module.exports = validateProudct;
