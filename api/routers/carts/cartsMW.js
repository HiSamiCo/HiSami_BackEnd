
const cartSchema = require("../../schemas/cart")

const validateCartPayload = async (req, res, next) => {
    try {
        const { body } = req
        await cartSchema.validate(body)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateCartPayload
}